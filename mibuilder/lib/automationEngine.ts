import { AutomationModel, IAutomation, IAutomationAction } from '@/models/Automation'
import { BoardModel } from '@/models/Board'
import { WorkspaceModel } from '@/models/Workspace'

export interface AutomationEvent {
  type: 'record_created' | 'record_updated' | 'record_deleted' | 'field_changed'
  boardId: string
  workspaceId: string
  rowId: string
  rowData: Record<string, any>
  field?: string
  oldValue?: any
  newValue?: any
  userId: string
}

export class AutomationEngine {
  private executionQueue: Map<string, Promise<void>> = new Map()
  private maxConcurrentExecutions = 10
  private executionHistory: Set<string> = new Set()
  private maxHistorySize = 1000

  /**
   * Trigger automations based on an event
   */
  async triggerAutomations(event: AutomationEvent): Promise<void> {
    try {
      // Find all active automations for this board
      const automations = await AutomationModel.findActiveByBoard(event.boardId)
      
      // Filter automations that match the trigger
      const matchingAutomations = automations.filter(automation => {
        return this.matchesTrigger(automation, event)
      })

      // Execute matching automations
      for (const automation of matchingAutomations) {
        await this.executeAutomation(automation, event)
      }
    } catch (error) {
      console.error('Error triggering automations:', error)
    }
  }

  /**
   * Check if an automation matches the trigger event
   */
  private matchesTrigger(automation: IAutomation, event: AutomationEvent): boolean {
    const trigger = automation.trigger

    // Check trigger type
    if (trigger.type !== event.type) {
      return false
    }

    // Check if specific field is required
    if (trigger.field && event.field && trigger.field !== event.field) {
      return false
    }

    // Check if specific value is required
    if (trigger.value !== undefined && trigger.value !== event.newValue) {
      return false
    }

    return true
  }

  /**
   * Execute a single automation
   */
  async executeAutomation(automation: IAutomation, event: AutomationEvent): Promise<void> {
    const executionKey = `${automation.id}_${event.rowId}_${Date.now()}`

    // Prevent infinite loops by checking execution history
    const historyKey = `${automation.id}_${event.rowId}`
    if (this.executionHistory.has(historyKey)) {
      console.log(`Skipping automation ${automation.id} to prevent infinite loop`)
      return
    }

    // Add to execution history
    this.executionHistory.add(historyKey)
    if (this.executionHistory.size > this.maxHistorySize) {
      const firstKey = this.executionHistory.values().next().value
      if (firstKey) {
        this.executionHistory.delete(firstKey)
      }
    }

    // Queue the execution
    if (this.executionQueue.size >= this.maxConcurrentExecutions) {
      await Promise.race(this.executionQueue.values())
    }

    const executionPromise = this.executeAutomationInternal(automation, event)
    this.executionQueue.set(executionKey, executionPromise)

    try {
      await executionPromise
    } finally {
      this.executionQueue.delete(executionKey)
      // Remove from history after execution
      setTimeout(() => {
        this.executionHistory.delete(historyKey)
      }, 5000) // 5 second cooldown
    }
  }

  /**
   * Internal execution logic
   */
  private async executeAutomationInternal(automation: IAutomation, event: AutomationEvent): Promise<void> {
    try {
      // Evaluate conditions
      const conditionsMet = await AutomationModel.evaluateConditions(automation, event.rowData)
      
      if (!conditionsMet) {
        console.log(`Automation ${automation.id} conditions not met`)
        return
      }

      // Execute actions
      for (const action of automation.actions) {
        await this.executeAction(action, event, automation)
      }

      // Increment run count
      await AutomationModel.incrementRunCount(automation.id)
      
      console.log(`Automation ${automation.name} executed successfully`)
    } catch (error) {
      console.error(`Error executing automation ${automation.id}:`, error)
    }
  }

  /**
   * Execute a single action
   */
  private async executeAction(
    action: IAutomationAction,
    event: AutomationEvent,
    automation: IAutomation
  ): Promise<void> {
    // Apply delay if specified
    if (action.delay && action.delay > 0) {
      await new Promise(resolve => setTimeout(resolve, action.delay))
    }

    switch (action.type) {
      case 'update_field':
        await this.executeUpdateField(action, event)
        break
      case 'create_record':
        await this.executeCreateRecord(action, event, automation)
        break
      case 'delete_record':
        await this.executeDeleteRecord(event)
        break
      case 'move_row':
        await this.executeMoveRow(action, event)
        break
      case 'duplicate_row':
        await this.executeDuplicateRow(event)
        break
      case 'connect_row':
        await this.executeConnectRow(action, event)
        break
      case 'notify_user':
        await this.executeNotifyUser(action, event)
        break
      case 'assign_user':
        await this.executeAssignUser(action, event)
        break
      case 'send_email':
        await this.executeSendEmail(action, event)
        break
      case 'webhook':
        await this.executeWebhook(action, event)
        break
      default:
        console.warn(`Unknown action type: ${action.type}`)
    }
  }

  /**
   * Execute update field action
   */
  private async executeUpdateField(action: IAutomationAction, event: AutomationEvent): Promise<void> {
    const { field, value } = action.config
    
    if (!field) {
      console.warn('Update field action missing field')
      return
    }

    const board = await BoardModel.findById(event.boardId)
    if (!board) return

    const updatedRows = board.rows.map(row =>
      row.id === event.rowId
        ? { ...row, data: { ...row.data, [field]: value } }
        : row
    )

    await BoardModel.update(event.boardId, { rows: updatedRows })
  }

  /**
   * Execute create record action
   */
  private async executeCreateRecord(
    action: IAutomationAction,
    event: AutomationEvent,
    automation: IAutomation
  ): Promise<void> {
    const targetBoardId = action.targetBoardId || automation.boardId
    const { data, mapping } = action.config

    const targetBoard = await BoardModel.findById(targetBoardId)
    if (!targetBoard) return

    // Map data from source row if mapping is provided
    const rowData: Record<string, any> = {}
    if (mapping) {
      for (const [targetField, sourceField] of Object.entries(mapping)) {
        rowData[targetField] = event.rowData[sourceField as string]
      }
    } else if (data) {
      Object.assign(rowData, data)
    }

    const newRow = {
      id: `row_${Date.now()}`,
      data: rowData
    }

    await BoardModel.addRow(targetBoardId, newRow)
  }

  /**
   * Execute delete record action
   */
  private async executeDeleteRecord(event: AutomationEvent): Promise<void> {
    await BoardModel.removeRow(event.boardId, event.rowId)
  }

  /**
   * Execute move row action (move to another board)
   */
  private async executeMoveRow(action: IAutomationAction, event: AutomationEvent): Promise<void> {
    const targetBoardId = action.targetBoardId
    if (!targetBoardId) return

    const sourceBoard = await BoardModel.findById(event.boardId)
    const targetBoard = await BoardModel.findById(targetBoardId)
    
    if (!sourceBoard || !targetBoard) return

    const row = sourceBoard.rows.find(r => r.id === event.rowId)
    if (!row) return

    // Add row to target board
    await BoardModel.addRow(targetBoardId, row)
    
    // Remove row from source board
    await BoardModel.removeRow(event.boardId, event.rowId)
  }

  /**
   * Execute duplicate row action
   */
  private async executeDuplicateRow(event: AutomationEvent): Promise<void> {
    const board = await BoardModel.findById(event.boardId)
    if (!board) return

    const row = board.rows.find(r => r.id === event.rowId)
    if (!row) return

    const duplicatedRow = {
      ...row,
      id: `row_${Date.now()}`,
      data: { ...row.data }
    }

    await BoardModel.addRow(event.boardId, duplicatedRow)
  }

  /**
   * Execute connect row action
   */
  private async executeConnectRow(action: IAutomationAction, event: AutomationEvent): Promise<void> {
    const { targetBoardId, targetRowId, relationField } = action.config
    
    if (!targetBoardId || !targetRowId || !relationField) {
      console.warn('Connect row action missing required fields')
      return
    }

    const board = await BoardModel.findById(event.boardId)
    if (!board) return

    // Update the row to include the relation
    const updatedRows = board.rows.map(row =>
      row.id === event.rowId
        ? { 
            ...row, 
            data: { 
              ...row.data, 
              [relationField]: Array.isArray(row.data[relationField])
                ? [...row.data[relationField], targetRowId]
                : targetRowId
            } 
          }
        : row
    )

    await BoardModel.update(event.boardId, { rows: updatedRows })
  }

  /**
   * Execute notify user action
   */
  private async executeNotifyUser(action: IAutomationAction, event: AutomationEvent): Promise<void> {
    const { userId, message } = action.config
    
    if (!userId || !message) {
      console.warn('Notify user action missing required fields')
      return
    }

    // This would integrate with your notification system
    console.log(`Notifying user ${userId}: ${message}`)
    // TODO: Implement actual notification logic
  }

  /**
   * Execute assign user action
   */
  private async executeAssignUser(action: IAutomationAction, event: AutomationEvent): Promise<void> {
    const { userId, assignField } = action.config
    
    if (!userId || !assignField) {
      console.warn('Assign user action missing required fields')
      return
    }

    const board = await BoardModel.findById(event.boardId)
    if (!board) return

    const updatedRows = board.rows.map(row =>
      row.id === event.rowId
        ? { ...row, data: { ...row.data, [assignField]: userId } }
        : row
    )

    await BoardModel.update(event.boardId, { rows: updatedRows })
  }

  /**
   * Execute send email action
   */
  private async executeSendEmail(action: IAutomationAction, event: AutomationEvent): Promise<void> {
    const { to, subject, body } = action.config
    
    if (!to || !subject || !body) {
      console.warn('Send email action missing required fields')
      return
    }

    // This would integrate with your email service
    console.log(`Sending email to ${to}: ${subject}`)
    // TODO: Implement actual email sending logic
  }

  /**
   * Execute webhook action
   */
  private async executeWebhook(action: IAutomationAction, event: AutomationEvent): Promise<void> {
    const { url, method, headers, body } = action.config
    
    if (!url) {
      console.warn('Webhook action missing URL')
      return
    }

    try {
      const response = await fetch(url, {
        method: method || 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify({
          event,
          automation: action.config,
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        console.error(`Webhook failed with status ${response.status}`)
      }
    } catch (error) {
      console.error('Error executing webhook:', error)
    }
  }

  /**
   * Validate automation configuration
   */
  validateAutomation(automation: IAutomation): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    // Validate trigger
    if (!automation.trigger || !automation.trigger.type) {
      errors.push('Automation must have a valid trigger')
    }

    // Validate actions
    if (!automation.actions || automation.actions.length === 0) {
      errors.push('Automation must have at least one action')
    }

    // Validate each action
    automation.actions.forEach((action, index) => {
      if (!action.type) {
        errors.push(`Action ${index + 1} must have a type`)
      }

      // Validate action-specific requirements
      switch (action.type) {
        case 'update_field':
          if (!action.config?.field) {
            errors.push(`Update field action ${index + 1} must specify a field`)
          }
          break
        case 'create_record':
          if (!action.config?.data && !action.config?.mapping) {
            errors.push(`Create record action ${index + 1} must specify data or mapping`)
          }
          break
        case 'move_row':
          if (!action.targetBoardId) {
            errors.push(`Move row action ${index + 1} must specify target board`)
          }
          break
        case 'webhook':
          if (!action.config?.url) {
            errors.push(`Webhook action ${index + 1} must specify a URL`)
          }
          break
      }
    })

    return {
      valid: errors.length === 0,
      errors,
    }
  }
}

// Singleton instance
export const automationEngine = new AutomationEngine()
