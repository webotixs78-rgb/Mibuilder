"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, X, Zap, ArrowRight, Play, Save, Clock, Mail, User, FileText, Link2, Bell, ChevronDown, ChevronUp } from "lucide-react"
import { IAutomation, IAutomationCondition, IAutomationAction, IAutomationTrigger } from "@/models/Automation"

interface AutomationBuilderProps {
  boardId: string
  workspaceId: string
  boards: any[]
  onSave: (automation: IAutomation) => void
  onCancel: () => void
  existingAutomation?: IAutomation
}

export function AutomationBuilder({ boardId, workspaceId, boards, onSave, onCancel, existingAutomation }: AutomationBuilderProps) {
  const [name, setName] = useState(existingAutomation?.name || "")
  const [description, setDescription] = useState(existingAutomation?.description || "")
  const [trigger, setTrigger] = useState<IAutomationTrigger>(existingAutomation?.trigger || {
    type: 'record_created',
    boardId,
  })
  const [conditions, setConditions] = useState<IAutomationCondition[]>(existingAutomation?.conditions || [])
  const [actions, setActions] = useState<IAutomationAction[]>(existingAutomation?.actions || [])
  const [showConditionBuilder, setShowConditionBuilder] = useState(false)
  const [showActionBuilder, setShowActionBuilder] = useState(false)

  const triggerTypes = [
    { value: 'record_created', label: 'Record Created', icon: FileText },
    { value: 'record_updated', label: 'Record Updated', icon: FileText },
    { value: 'record_deleted', label: 'Record Deleted', icon: Trash2 },
    { value: 'field_changed', label: 'Field Changed', icon: FileText },
    { value: 'scheduled', label: 'Scheduled', icon: Clock },
  ]

  const actionTypes = [
    { value: 'update_field', label: 'Update Field', icon: FileText },
    { value: 'create_record', label: 'Create Record', icon: Plus },
    { value: 'delete_record', label: 'Delete Record', icon: Trash2 },
    { value: 'move_row', label: 'Move Row', icon: ArrowRight },
    { value: 'duplicate_row', label: 'Duplicate Row', icon: FileText },
    { value: 'connect_row', label: 'Connect Row', icon: Link2 },
    { value: 'notify_user', label: 'Notify User', icon: Bell },
    { value: 'send_email', label: 'Send Email', icon: Mail },
    { value: 'webhook', label: 'Webhook', icon: Link2 },
  ]

  const operators = [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Not Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'not_contains', label: 'Not Contains' },
    { value: 'starts_with', label: 'Starts With' },
    { value: 'ends_with', label: 'Ends With' },
    { value: 'greater_than', label: 'Greater Than' },
    { value: 'less_than', label: 'Less Than' },
    { value: 'is_empty', label: 'Is Empty' },
    { value: 'is_not_empty', label: 'Is Not Empty' },
  ]

  const logicalOperators = [
    { value: 'and', label: 'AND' },
    { value: 'or', label: 'OR' },
  ]

  const addCondition = () => {
    const newCondition: IAutomationCondition = {
      id: `condition_${Date.now()}`,
      field: '',
      operator: 'equals',
      value: '',
      logicalOperator: 'and',
    }
    setConditions([...conditions, newCondition])
  }

  const updateCondition = (id: string, updates: Partial<IAutomationCondition>) => {
    setConditions(conditions.map(c => c.id === id ? { ...c, ...updates } : c))
  }

  const removeCondition = (id: string) => {
    setConditions(conditions.filter(c => c.id !== id))
  }

  const addAction = () => {
    const newAction: IAutomationAction = {
      id: `action_${Date.now()}`,
      type: 'update_field',
      config: {},
    }
    setActions([...actions, newAction])
  }

  const updateAction = (id: string, updates: Partial<IAutomationAction>) => {
    setActions(actions.map(a => a.id === id ? { ...a, ...updates } : a))
  }

  const removeAction = (id: string) => {
    setActions(actions.filter(a => a.id !== id))
  }

  const handleSave = () => {
    const automation: Partial<IAutomation> = {
      name,
      description,
      workspaceId,
      boardId,
      trigger,
      conditions,
      actions,
      isActive: true,
      runCount: existingAutomation?.runCount || 0,
      lastRun: existingAutomation?.lastRun,
      createdBy: 'current_user',
      createdAt: existingAutomation?.createdAt || new Date(),
      updatedAt: new Date(),
    }
    onSave(automation as IAutomation)
  }

  const getBoardColumns = (boardId: string) => {
    const board = boards.find((b: any) => b.id === boardId)
    return board?.columns || []
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 border border-white/20 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/10 bg-white/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Zap className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Automation Builder</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onCancel} className="text-purple-300 hover:text-white">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-purple-200 text-sm">Automation Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Auto-assign leads"
              className="mt-1 bg-white/10 border-white/20 text-white placeholder-purple-400"
            />
          </div>
          <div>
            <Label className="text-purple-200 text-sm">Description (Optional)</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this automation does"
              className="mt-1 bg-white/10 border-white/20 text-white placeholder-purple-400"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Trigger Section */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
            <Zap className="w-4 h-4 text-purple-400" />
            <span>Trigger</span>
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-purple-200 text-sm">When</Label>
              <Select value={trigger.type} onValueChange={(value) => setTrigger({ ...trigger, type: value as any })}>
                <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/20">
                  {triggerTypes.map(type => (
                    <SelectItem key={type.value} value={type.value} className="text-white">
                      <div className="flex items-center space-x-2">
                        <type.icon className="w-4 h-4" />
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {trigger.type === 'field_changed' && (
              <div>
                <Label className="text-purple-200 text-sm">Field</Label>
                <Select value={trigger.field} onValueChange={(value) => setTrigger({ ...trigger, field: value })}>
                  <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/20">
                    {getBoardColumns(boardId).map((col: any) => (
                      <SelectItem key={col.id} value={col.id} className="text-white">
                        {col.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        {/* Conditions Section */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold flex items-center space-x-2">
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Conditions</span>
            </h3>
            <Button variant="ghost" size="sm" onClick={addCondition} className="text-purple-300 hover:text-white">
              <Plus className="w-4 h-4 mr-1" />
              Add Condition
            </Button>
          </div>

          {conditions.length === 0 ? (
            <p className="text-purple-300/60 text-sm italic">No conditions. This automation will run for all records.</p>
          ) : (
            <div className="space-y-3">
              {conditions.map((condition, index) => (
                <div key={condition.id} className="flex items-center space-x-2 bg-white/5 rounded-lg p-3">
                  <Select value={condition.field} onValueChange={(value) => updateCondition(condition.id, { field: value })}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white w-40">
                      <SelectValue placeholder="Field" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/20">
                      {getBoardColumns(boardId).map((col: any) => (
                        <SelectItem key={col.id} value={col.id} className="text-white">
                          {col.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={condition.operator} onValueChange={(value) => updateCondition(condition.id, { operator: value as any })}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/20">
                      {operators.map(op => (
                        <SelectItem key={op.value} value={op.value} className="text-white">
                          {op.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {!['is_empty', 'is_not_empty'].includes(condition.operator) && (
                    <Input
                      value={condition.value}
                      onChange={(e) => updateCondition(condition.id, { value: e.target.value })}
                      placeholder="Value"
                      className="flex-1 bg-white/10 border-white/20 text-white placeholder-purple-400"
                    />
                  )}

                  {index < conditions.length - 1 && (
                    <Select value={condition.logicalOperator} onValueChange={(value) => updateCondition(condition.id, { logicalOperator: value as any })}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/20">
                        {logicalOperators.map(op => (
                          <SelectItem key={op.value} value={op.value} className="text-white">
                            {op.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  <Button variant="ghost" size="sm" onClick={() => removeCondition(condition.id)} className="text-red-400 hover:text-red-300 h-8 w-8 p-0">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions Section */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold flex items-center space-x-2">
              <Play className="w-4 h-4 text-purple-400" />
              <span>Actions</span>
            </h3>
            <Button variant="ghost" size="sm" onClick={addAction} className="text-purple-300 hover:text-white">
              <Plus className="w-4 h-4 mr-1" />
              Add Action
            </Button>
          </div>

          {actions.length === 0 ? (
            <p className="text-purple-300/60 text-sm italic">No actions added. Add at least one action.</p>
          ) : (
            <div className="space-y-3">
              {actions.map((action, index) => (
                <div key={action.id} className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Select value={action.type} onValueChange={(value) => updateAction(action.id, { type: value as any })}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/20">
                        {actionTypes.map(type => (
                          <SelectItem key={type.value} value={type.value} className="text-white">
                            <div className="flex items-center space-x-2">
                              <type.icon className="w-4 h-4" />
                              <span>{type.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button variant="ghost" size="sm" onClick={() => removeAction(action.id)} className="text-red-400 hover:text-red-300 h-8 w-8 p-0">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>

                  {/* Action-specific configuration */}
                  {action.type === 'update_field' && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <Select value={action.config.field} onValueChange={(value) => updateAction(action.id, { config: { ...action.config, field: value } })}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Field to update" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-white/20">
                          {getBoardColumns(boardId).map((col: any) => (
                            <SelectItem key={col.id} value={col.id} className="text-white">
                              {col.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        value={action.config.value || ''}
                        onChange={(e) => updateAction(action.id, { config: { ...action.config, value: e.target.value } })}
                        placeholder="New value"
                        className="bg-white/10 border-white/20 text-white placeholder-purple-400"
                      />
                    </div>
                  )}

                  {action.type === 'create_record' && (
                    <div className="mt-2">
                      <Select value={action.targetBoardId} onValueChange={(value) => updateAction(action.id, { targetBoardId: value })}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Target board" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-white/20">
                          {boards.map(board => (
                            <SelectItem key={board.id} value={board.id} className="text-white">
                              {board.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {action.type === 'move_row' && (
                    <div className="mt-2">
                      <Select value={action.targetBoardId} onValueChange={(value) => updateAction(action.id, { targetBoardId: value })}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Target board" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-white/20">
                          {boards.filter(b => b.id !== boardId).map(board => (
                            <SelectItem key={board.id} value={board.id} className="text-white">
                              {board.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {action.type === 'webhook' && (
                    <div className="mt-2">
                      <Input
                        value={action.config.url || ''}
                        onChange={(e) => updateAction(action.id, { config: { ...action.config, url: e.target.value } })}
                        placeholder="Webhook URL"
                        className="bg-white/10 border-white/20 text-white placeholder-purple-400"
                      />
                    </div>
                  )}

                  {action.type === 'send_email' && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <Input
                        value={action.config.to || ''}
                        onChange={(e) => updateAction(action.id, { config: { ...action.config, to: e.target.value } })}
                        placeholder="To"
                        className="bg-white/10 border-white/20 text-white placeholder-purple-400"
                      />
                      <Input
                        value={action.config.subject || ''}
                        onChange={(e) => updateAction(action.id, { config: { ...action.config, subject: e.target.value } })}
                        placeholder="Subject"
                        className="bg-white/10 border-white/20 text-white placeholder-purple-400"
                      />
                    </div>
                  )}

                  <div className="mt-2">
                    <Label className="text-purple-200 text-xs">Delay (seconds)</Label>
                    <Input
                      type="number"
                      value={action.delay || 0}
                      onChange={(e) => updateAction(action.id, { delay: parseInt(e.target.value) || 0 })}
                      placeholder="0"
                      className="mt-1 bg-white/10 border-white/20 text-white placeholder-purple-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-white/10 bg-white/5 flex justify-between">
        <Button variant="ghost" onClick={onCancel} className="text-purple-300 hover:text-white">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={!name || actions.length === 0}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Automation
        </Button>
      </div>
    </div>
  )
}
