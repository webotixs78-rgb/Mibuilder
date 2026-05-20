"use client"

import React, { useState, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus, Settings, Search, Filter, Download, Upload, Undo, Redo, Save, Grid, List, Table, Eye, EyeOff, Lock, Unlock, Copy, Trash2, X, MoreHorizontal, Edit2, LayoutDashboard, Calendar, KanbanSquare, Zap } from "lucide-react"
import { ColumnManager, Column, ColumnType } from "./ColumnManager"
import { RowManager, Row } from "./RowManager"
import { DynamicField } from "./DynamicField"
import { KanbanView } from "./KanbanView"
import { CalendarView } from "./CalendarView"
import { DashboardView } from "./DashboardView"
import { AutomationBuilder } from "./AutomationBuilder"
import { AIAssistantPanel } from "./AIAssistantPanel"
import { MI_AI_PENDING_APPLY_KEY } from "@/lib/ai/pendingApply"

export interface Board {
  id: string
  name: string
  description?: string
  icon?: string
  color?: string
  columns: Column[]
  rows: Row[]
  automations: any[]
  relations: any[]
  views: any[]
  settings: {
    defaultView: "table" | "kanban" | "calendar" | "dashboard"
    autoSave: boolean
    pageSize: number
  }
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Workspace {
  id: string
  name: string
  description: string
  boards: Board[]
  settings: {
    viewMode: "table" | "grid" | "cards"
    frozenColumns: number
    pageSize: number
    autoSave: boolean
  }
  createdAt: string
  updatedAt: string
}

interface WorkspaceBuilderProps {
  workspace: Workspace
  onWorkspaceChange: (workspace: Workspace) => void
  onSave: () => void
  onBack: () => void
}

export function WorkspaceBuilder({ workspace, onWorkspaceChange, onSave, onBack }: WorkspaceBuilderProps) {
  const [editingCell, setEditingCell] = useState<{ rowId: string; columnId: string } | null>(null)
  const [showColumnManager, setShowColumnManager] = useState(false)
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"table" | "kanban" | "calendar" | "dashboard">("table")
  const [history, setHistory] = useState<Workspace[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  
  // Board state
  const [activeBoardId, setActiveBoardId] = useState<string>(() => {
    if (!workspace.boards || workspace.boards.length === 0) return ""
    const activeBoard = workspace.boards.find(b => b.isActive)
    return activeBoard?.id || workspace.boards[0]?.id || ""
  })
  const [showBoardMenu, setShowBoardMenu] = useState<string | null>(null)
  const [showNewBoardModal, setShowNewBoardModal] = useState(false)
  const [newBoardName, setNewBoardName] = useState("")
  
  // Filter state
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const [activeFilters, setActiveFilters] = useState<{columnId: string, operator: string, value: string}[]>([])
  
  // Automation state
  const [showAutomationModal, setShowAutomationModal] = useState(false)
  const [showAIAssistant, setShowAIAssistant] = useState(false)

  const columnTypesById: Record<string, ColumnType> = {
    text: { id: "text", name: "Text Input", type: "text", category: "basic", icon: "T", description: "Single line text input" },
    number: { id: "number", name: "Number", type: "number", category: "basic", icon: "#", description: "Numeric values" },
    email: { id: "email", name: "Email", type: "email", category: "basic", icon: "@", description: "Email address" },
    phone: { id: "phone", name: "Phone", type: "phone", category: "basic", icon: "📞", description: "Phone number" },
    url: { id: "url", name: "URL", type: "url", category: "basic", icon: "🔗", description: "Web link" },
    password: { id: "password", name: "Password", type: "password", category: "basic", icon: "🔒", description: "Password field" },
    textarea: { id: "textarea", name: "Textarea", type: "textarea", category: "basic", icon: "📝", description: "Multi-line text" },
    richtext: { id: "richtext", name: "Rich Text", type: "richtext", category: "basic", icon: "📄", description: "Formatted text editor" },
    dropdown: { id: "dropdown", name: "Dropdown", type: "dropdown", category: "selection", icon: "▼", description: "Single select dropdown" },
    multiselect: { id: "multiselect", name: "Multi Select", type: "multiselect", category: "selection", icon: "☑", description: "Multiple selection" },
    checkbox: { id: "checkbox", name: "Checkbox", type: "checkbox", category: "selection", icon: "☐", description: "True/False checkbox" },
    radio: { id: "radio", name: "Radio", type: "radio", category: "selection", icon: "○", description: "Radio button group" },
    toggle: { id: "toggle", name: "Toggle", type: "toggle", category: "selection", icon: "🔄", description: "On/Off switch" },
    date: { id: "date", name: "Date", type: "date", category: "datetime", icon: "📅", description: "Date picker" },
    time: { id: "time", name: "Time", type: "time", category: "datetime", icon: "🕐", description: "Time picker" },
    datetime: { id: "datetime", name: "DateTime", type: "datetime", category: "datetime", icon: "📆", description: "Date and time" },
    file: { id: "file", name: "File Upload", type: "file", category: "media", icon: "📎", description: "File attachment" },
    image: { id: "image", name: "Image Upload", type: "image", category: "media", icon: "🖼", description: "Image upload" },
    signature: { id: "signature", name: "Signature", type: "signature", category: "media", icon: "✍", description: "Digital signature" },
    currency: { id: "currency", name: "Currency", type: "currency", category: "advanced", icon: "💰", description: "Currency values" },
    percentage: { id: "percentage", name: "Percentage", type: "percentage", category: "advanced", icon: "%", description: "Percentage values" },
    rating: { id: "rating", name: "Rating", type: "rating", category: "advanced", icon: "⭐", description: "Star rating" },
    progress: { id: "progress", name: "Progress", type: "progress", category: "advanced", icon: "📊", description: "Progress bar" },
    tags: { id: "tags", name: "Tags", type: "tags", category: "advanced", icon: "🏷", description: "Tag system" },
    color: { id: "color", name: "Color Picker", type: "color", category: "advanced", icon: "🎨", description: "Color selection" },
    json: { id: "json", name: "JSON", type: "json", category: "advanced", icon: "{}", description: "JSON data" },
    formula: { id: "formula", name: "Formula", type: "formula", category: "advanced", icon: "ƒ", description: "Calculated field" },
    autoid: { id: "autoid", name: "Auto ID", type: "autoid", category: "advanced", icon: "🆔", description: "Auto increment ID" },
    user: { id: "user", name: "User Reference", type: "user", category: "relationship", icon: "👤", description: "User assignment" },
    contact: { id: "contact", name: "CRM Contact", type: "contact", category: "relationship", icon: "👥", description: "Contact reference" },
    company: { id: "company", name: "Company", type: "company", category: "relationship", icon: "🏢", description: "Company reference" },
    linked: { id: "linked", name: "Linked Record", type: "linked", category: "relationship", icon: "🔗", description: "Related records" },
    relation: { id: "relation", name: "Board Relation", type: "relation", category: "relationship", icon: "🔗", description: "Connect to another board" },
    status: { id: "status", name: "Status", type: "status", category: "automation", icon: "📊", description: "Status workflow" },
    priority: { id: "priority", name: "Priority", type: "priority", category: "automation", icon: "🔥", description: "Priority levels" },
    workflow: { id: "workflow", name: "Workflow", type: "workflow", category: "automation", icon: "⚡", description: "Workflow stages" },
    approval: { id: "approval", name: "Approval", type: "approval", category: "automation", icon: "✅", description: "Approval state" }
  }

  const normalizeColumn = (column: any, index: number): Column => {
    const typeId = column?.type?.type || column?.type?.id || "text"
    const fallbackType = columnTypesById[typeId] || columnTypesById.text

    return {
      id: column?.id || `col_${Date.now()}_${index}`,
      name: column?.name || `Field ${index + 1}`,
      type: {
        ...fallbackType,
        ...(column?.type || {})
      },
      width: column?.width || 200,
      visible: column?.visible ?? true,
      frozen: column?.frozen ?? false,
      order: column?.order ?? index,
      settings: column?.settings || {}
    }
  }

  const normalizeAutomation = (automation: any, boardId: string) => {
    const actionList = Array.isArray(automation?.actions) ? automation.actions : []
    return {
      id: automation?.id || `automation_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      name: automation?.name || "AI Generated Automation",
      description: automation?.description || "",
      workspaceId: workspace.id,
      boardId,
      trigger: {
        type: automation?.trigger?.type || "record_created",
        boardId,
        field: automation?.trigger?.field || automation?.trigger?.fieldId
      },
      conditions: (automation?.conditions || []).map((condition: any, index: number) => ({
        id: condition?.id || `condition_${Date.now()}_${index}`,
        field: condition?.field || condition?.fieldId || "",
        operator: condition?.operator || "equals",
        value: condition?.value ?? "",
        logicalOperator: (condition?.logicalOperator || "and").toLowerCase() === "or" ? "or" : "and"
      })),
      actions: actionList.map((action: any, index: number) => ({
        id: action?.id || `action_${Date.now()}_${index}`,
        type: action?.type || "update_field",
        targetBoardId: action?.targetBoardId,
        delay: action?.delay || 0,
        config: action?.config || {
          field: action?.fieldId,
          value: action?.value
        }
      })),
      isActive: automation?.isActive ?? automation?.enabled ?? true,
      runCount: 0,
      createdBy: "ai_assistant",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }

  const handleApplyAIAssistant = (payload: any, mode: "crm" | "automation" | "insights") => {
    if (!activeBoard && mode !== "crm") return

    const generatedBoards = Array.isArray(payload?.boards) ? payload.boards : []
    const generatedFields = Array.isArray(payload?.fields) ? payload.fields : []
    const generatedAutomations = Array.isArray(payload?.automations) ? payload.automations : []

    if (mode === "insights") {
      const insightsText =
        payload?.insights?.usageSummary ||
        payload?.insights?.analyticsExplanation ||
        "Insights generated successfully. Review JSON preview for details."
      alert(insightsText)
      return
    }

    if (mode === "crm") {
      if (!generatedBoards.length && !generatedFields.length && !generatedAutomations.length) {
        alert("No valid CRM configuration found in AI output.")
        return
      }

      if (workspace.boards.length > 0) {
        const shouldMerge = confirm(
          "This will add AI-generated boards, fields, or automations to your current workspace. Existing data will not be overwritten. Continue?"
        )
        if (!shouldMerge) return
      }

      let nextBoards = [...workspace.boards]

      if (generatedBoards.length) {
        const aiBoards: Board[] = generatedBoards.map((board: any, index: number) => {
          const columns = (board?.columns || []).map((column: any, colIndex: number) => normalizeColumn(column, colIndex))
          return {
            id: board?.id || `board_${Date.now()}_${index}`,
            name: board?.name || `AI Board ${index + 1}`,
            description: board?.description || "",
            icon: board?.icon || "📋",
            color: board?.color || "#8B5CF6",
            columns,
            rows: Array.isArray(board?.rows) ? board.rows : [],
            automations: Array.isArray(board?.automations) ? board.automations : [],
            relations: Array.isArray(board?.relations) ? board.relations : [],
            views: Array.isArray(board?.views) ? board.views : [],
            settings: {
              defaultView: board?.settings?.defaultView || "table",
              autoSave: board?.settings?.autoSave ?? true,
              pageSize: board?.settings?.pageSize || 50
            },
            order: nextBoards.length + index,
            isActive: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        })
        nextBoards = [...nextBoards, ...aiBoards]
      } else if (generatedFields.length && activeBoard) {
        const extraColumns = generatedFields.map((column: any, index: number) => normalizeColumn(column, activeBoard.columns.length + index))
        nextBoards = workspace.boards.map((board) =>
          board.id === activeBoard.id
            ? {
                ...board,
                columns: [...board.columns, ...extraColumns],
                updatedAt: new Date().toISOString()
              }
            : board
        )
      }

      if (generatedAutomations.length) {
        const fallbackBoardId = nextBoards.find((b) => b.isActive)?.id || nextBoards[0]?.id || activeBoard?.id
        nextBoards = nextBoards.map((board) =>
          board.id === fallbackBoardId
            ? {
                ...board,
                automations: [...(board.automations || []), ...generatedAutomations.map((a: any) => normalizeAutomation(a, board.id))],
                updatedAt: new Date().toISOString()
              }
            : board
        )
      }

      const newWorkspace = {
        ...workspace,
        boards: nextBoards,
        updatedAt: new Date().toISOString()
      }
      onWorkspaceChange(newWorkspace)
      addToHistory(newWorkspace)
      return
    }

    if (mode === "automation" && activeBoard) {
      if (!generatedAutomations.length) {
        alert("No valid automations found in AI output.")
        return
      }

      const shouldApply = confirm(
        `Apply ${generatedAutomations.length} AI automation(s) to "${activeBoard.name}"? Existing automations will be kept.`
      )
      if (!shouldApply) return

      const prepared = generatedAutomations.map((automation: any) => normalizeAutomation(automation, activeBoard.id))

      const newBoards = workspace.boards.map((board) =>
        board.id === activeBoard.id
          ? {
              ...board,
              automations: [...(board.automations || []), ...prepared],
              updatedAt: new Date().toISOString()
            }
          : board
      )

      const newWorkspace = {
        ...workspace,
        boards: newBoards,
        updatedAt: new Date().toISOString()
      }
      onWorkspaceChange(newWorkspace)
      addToHistory(newWorkspace)
    }
  }

  const applyAiAssistantRef = useRef(handleApplyAIAssistant)
  applyAiAssistantRef.current = handleApplyAIAssistant

  const handleSaveAutomation = (automation: any) => {
    if (!activeBoard) return
    
    const newBoards = workspace.boards.map(board =>
      board.id === activeBoard.id
        ? { ...board, automations: [...(board.automations || []), automation], updatedAt: new Date().toISOString() }
        : board
    )
    
    const newWorkspace = {
      ...workspace,
      boards: newBoards,
      updatedAt: new Date().toISOString()
    }
    
    onWorkspaceChange(newWorkspace)
    addToHistory(newWorkspace)
    setShowAutomationModal(false)
  }

  // Get active board
  const activeBoard = workspace.boards?.find(b => b.id === activeBoardId) || workspace.boards?.[0] || null

  const searchParams = useSearchParams()
  const router = useRouter()
  const pendingApplyConsumedRef = useRef(false)

  useEffect(() => {
    const ai = searchParams.get("ai")
    if (ai === "1" || ai === "true") {
      setShowAIAssistant(true)
    }
  }, [searchParams])

  useEffect(() => {
    if (searchParams.get("apply") !== "1") {
      pendingApplyConsumedRef.current = false
      return
    }
    if (!workspace?.id || pendingApplyConsumedRef.current) return

    const raw =
      typeof window !== "undefined" ? sessionStorage.getItem(MI_AI_PENDING_APPLY_KEY) : null

    const cleanupUrl = () => {
      router.replace(`/workspaces/${workspace.id}?ai=1`, { scroll: false })
    }

    if (!raw) {
      cleanupUrl()
      return
    }

    pendingApplyConsumedRef.current = true

    try {
      const parsed = JSON.parse(raw) as { payload: unknown; mode: "crm" | "automation" | "insights" }
      applyAiAssistantRef.current(parsed.payload, parsed.mode)
    } catch (e) {
      console.error("Pending AI apply failed:", e)
    } finally {
      sessionStorage.removeItem(MI_AI_PENDING_APPLY_KEY)
      cleanupUrl()
    }
  }, [workspace?.id, searchParams, router])

  // Initialize history
  useEffect(() => {
    setHistory([workspace])
    setHistoryIndex(0)
  }, [])

  // Auto-save functionality
  useEffect(() => {
    if (workspace.settings?.autoSave) {
      const timeout = setTimeout(() => {
        onSave()
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [workspace, onSave])

  const addToHistory = (newWorkspace: Workspace) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newWorkspace)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      onWorkspaceChange(history[newIndex])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      onWorkspaceChange(history[newIndex])
    }
  }

  const handleColumnsChange = (columns: Column[]) => {
    if (!activeBoard) return
    
    const newBoards = workspace.boards.map(board =>
      board.id === activeBoard.id
        ? { ...board, columns, updatedAt: new Date().toISOString() }
        : board
    )
    
    const newWorkspace = {
      ...workspace,
      boards: newBoards,
      updatedAt: new Date().toISOString()
    }
    onWorkspaceChange(newWorkspace)
    addToHistory(newWorkspace)
  }

  const handleRowsChange = (rows: Row[]) => {
    if (!activeBoard) return
    
    const newBoards = workspace.boards.map(board =>
      board.id === activeBoard.id
        ? { ...board, rows, updatedAt: new Date().toISOString() }
        : board
    )
    
    const newWorkspace = {
      ...workspace,
      boards: newBoards,
      updatedAt: new Date().toISOString()
    }
    onWorkspaceChange(newWorkspace)
    addToHistory(newWorkspace)
  }

  // Board management functions
  const handleCreateBoard = () => {
    if (!newBoardName.trim()) return
    
    const newBoard: Board = {
      id: `board_${Date.now()}`,
      name: newBoardName,
      icon: '📋',
      color: '#8B5CF6',
      columns: [],
      rows: [],
      automations: [],
      relations: [],
      views: [],
      settings: {
        defaultView: 'table',
        autoSave: true,
        pageSize: 50
      },
      order: workspace.boards.length,
      isActive: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    const newWorkspace = {
      ...workspace,
      boards: [...workspace.boards, newBoard],
      updatedAt: new Date().toISOString()
    }
    
    onWorkspaceChange(newWorkspace)
    setActiveBoardId(newBoard.id)
    setNewBoardName("")
    setShowNewBoardModal(false)
    addToHistory(newWorkspace)
  }

  const handleSwitchBoard = (boardId: string) => {
    setActiveBoardId(boardId)
    
    const newBoards = workspace.boards.map(board =>
      board.id === boardId
        ? { ...board, isActive: true }
        : { ...board, isActive: false }
    )
    
    const newWorkspace = {
      ...workspace,
      boards: newBoards,
      updatedAt: new Date().toISOString()
    }
    
    onWorkspaceChange(newWorkspace)
    addToHistory(newWorkspace)
  }

  const handleRenameBoard = (boardId: string, newName: string) => {
    const newBoards = workspace.boards.map(board =>
      board.id === boardId
        ? { ...board, name: newName, updatedAt: new Date().toISOString() }
        : board
    )
    
    const newWorkspace = {
      ...workspace,
      boards: newBoards,
      updatedAt: new Date().toISOString()
    }
    
    onWorkspaceChange(newWorkspace)
    addToHistory(newWorkspace)
    setShowBoardMenu(null)
  }

  const handleDeleteBoard = (boardId: string) => {
    if (workspace.boards.length <= 1) {
      alert("Cannot delete the last board")
      return
    }
    
    if (!confirm("Are you sure you want to delete this board?")) return
    
    const newBoards = workspace.boards.filter(board => board.id !== boardId)
    
    // If deleting active board, switch to first available board
    let newActiveBoardId = activeBoardId
    if (boardId === activeBoardId) {
      newActiveBoardId = newBoards[0]?.id || ""
      setActiveBoardId(newActiveBoardId)
      newBoards[0] = { ...newBoards[0], isActive: true }
    }
    
    const newWorkspace = {
      ...workspace,
      boards: newBoards,
      updatedAt: new Date().toISOString()
    }
    
    onWorkspaceChange(newWorkspace)
    addToHistory(newWorkspace)
    setShowBoardMenu(null)
  }

  const handleDuplicateBoard = (boardId: string) => {
    const boardToDuplicate = workspace.boards.find(b => b.id === boardId)
    if (!boardToDuplicate) return
    
    const duplicatedBoard: Board = {
      ...boardToDuplicate,
      id: `board_${Date.now()}`,
      name: `${boardToDuplicate.name} (Copy)`,
      order: workspace.boards.length,
      isActive: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    const newWorkspace = {
      ...workspace,
      boards: [...workspace.boards, duplicatedBoard],
      updatedAt: new Date().toISOString()
    }
    
    onWorkspaceChange(newWorkspace)
    addToHistory(newWorkspace)
    setShowBoardMenu(null)
  }

  const handleAddColumn = (columnType: ColumnType) => {
    if (!activeBoard) return
    
    const columnName = prompt(`Enter name for new ${columnType.name} column:`)
    if (!columnName) return

    const newColumn: Column = {
      id: `col_${Date.now()}`,
      name: columnName,
      type: columnType,
      width: 200,
      visible: true,
      frozen: false,
      order: activeBoard.columns.length,
      settings: getDefaultSettings(columnType.type)
    }

    const newColumns = [...activeBoard.columns, newColumn]
    handleColumnsChange(newColumns)
  }

  const getDefaultSettings = (type: string): Record<string, any> => {
    switch (type) {
      case "dropdown":
      case "multiselect":
        return {
          options: ["Option 1", "Option 2", "Option 3"],
          allowCustom: false,
          colorLabels: true
        }
      case "number":
      case "currency":
        return {
          min: 0,
          max: 1000000,
          decimals: type === "currency" ? 2 : 0,
          currency: type === "currency" ? "$" : ""
        }
      case "text":
      case "textarea":
        return {
          placeholder: "",
          maxLength: type === "textarea" ? 1000 : 255,
          required: false
        }
      case "date":
      case "datetime":
        return {
          format: "MM/DD/YYYY",
          defaultToday: false,
          showTime: type === "datetime"
        }
      case "file":
      case "image":
        return {
          allowedTypes: type === "image" ? ["image/*"] : ["*"],
          maxFileSize: 10485760, // 10MB
          multiple: false
        }
      case "status":
      case "priority":
        return {
          options: type === "status" 
            ? ["Not Started", "In Progress", "Completed", "On Hold"]
            : ["Low", "Medium", "High", "Critical"],
          colorLabels: true
        }
      default:
        return {}
    }
  }

  const handleAddRow = () => {
    if (!activeBoard) return
    
    const newRow: Row = {
      id: `row_${Date.now()}`,
      data: {}
    }

    // Initialize default values for each column
    activeBoard.columns.forEach(column => {
      switch (column.type.type) {
        case "number":
        case "currency":
        case "percentage":
          newRow.data[column.id] = 0
          break
        case "checkbox":
        case "toggle":
          newRow.data[column.id] = false
          break
        case "status":
        case "dropdown":
          newRow.data[column.id] = column.settings.options?.[0] || ""
          break
        case "multiselect":
        case "tags":
          newRow.data[column.id] = []
          break
        case "date":
          if (column.settings.defaultToday) {
            newRow.data[column.id] = new Date().toISOString().split('T')[0]
          } else {
            newRow.data[column.id] = ""
          }
          break
        default:
          newRow.data[column.id] = ""
      }
    })

    const newRows = [...activeBoard.rows, newRow]
    handleRowsChange(newRows)
  }

  const handleBulkDelete = (rowIds: string[]) => {
    if (!activeBoard) return
    
    const newRows = activeBoard.rows.filter(row => !rowIds.includes(row.id))
    handleRowsChange(newRows)
    setSelectedRows(new Set())
  }

  const handleBulkDuplicate = (rowIds: string[]) => {
    if (!activeBoard) return
    
    const duplicatedRows = rowIds.map(rowId => {
      const originalRow = activeBoard.rows.find(row => row.id === rowId)
      if (!originalRow) return null
      
      return {
        ...originalRow,
        id: `${rowId}_copy_${Date.now()}`,
        data: { ...originalRow.data }
      }
    }).filter(Boolean) as Row[]

    const newRows = [...activeBoard.rows, ...duplicatedRows]
    handleRowsChange(newRows)
  }

  const handleCellEdit = (rowId: string, columnId: string, value: any) => {
    if (!activeBoard) return
    
    const newRows = activeBoard.rows.map(row =>
      row.id === rowId
        ? { ...row, data: { ...row.data, [columnId]: value } }
        : row
    )
    handleRowsChange(newRows)
    setEditingCell(null)
  }

  const handleColumnVisibility = (columnId: string, visible: boolean) => {
    if (!activeBoard) return
    
    const newColumns = activeBoard.columns.map(col =>
      col.id === columnId ? { ...col, visible } : col
    )
    handleColumnsChange(newColumns)
  }

  const handleColumnFreeze = (columnId: string, frozen: boolean) => {
    if (!activeBoard) return
    
    const newColumns = activeBoard.columns.map(col =>
      col.id === columnId ? { ...col, frozen } : col
    )
    handleColumnsChange(newColumns)
  }

  const handleColumnResize = (columnId: string, newWidth: number) => {
    if (!activeBoard) return
    
    const newColumns = activeBoard.columns.map(col =>
      col.id === columnId ? { ...col, width: newWidth } : col
    )
    handleColumnsChange(newColumns)
  }

  const exportCSV = () => {
    if (!activeBoard) return
    
    const visibleColumns = activeBoard.columns.filter(col => col.visible)
    const headers = visibleColumns.map(col => col.name).join(",")
    
    const rows = activeBoard.rows.map(row => {
      return visibleColumns.map(col => {
        const value = row.data[col.id] || ""
        return `"${String(value).replace(/"/g, '""')}"`
      }).join(",")
    }).join("\n")
    
    const csv = `${headers}\n${rows}`
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${activeBoard.name}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!activeBoard) return
    
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const lines = text.split("\n")
      const headers = lines[0].split(",").map(h => h.replace(/"/g, ""))
      
      const newRows = lines.slice(1).filter(line => line.trim()).map((line, index) => {
        const values = line.split(",").map(v => v.replace(/"/g, ""))
        const rowData: Record<string, any> = {}
        
        headers.forEach((header, colIndex) => {
          const column = activeBoard.columns.find(col => col.name === header)
          if (column) {
            rowData[column.id] = values[colIndex] || ""
          }
        })
        
        return {
          id: `row_${Date.now()}_${index}`,
          data: rowData
        }
      })
      
      handleRowsChange([...activeBoard.rows, ...newRows])
    }
    reader.readAsText(file)
  }

  // Filter functions
  const addFilter = () => {
    if (!activeBoard) return
    setActiveFilters([...activeFilters, { columnId: visibleColumns[0]?.id || '', operator: 'contains', value: '' }])
  }

  const removeFilter = (index: number) => {
    setActiveFilters(activeFilters.filter((_, i) => i !== index))
  }

  const updateFilter = (index: number, field: string, value: string) => {
    const newFilters = [...activeFilters]
    newFilters[index] = { ...newFilters[index], [field]: value }
    setActiveFilters(newFilters)
  }

  const clearAllFilters = () => {
    setActiveFilters([])
    setShowFilterPanel(false)
  }

  // Apply filters to rows
  const getFilteredRows = () => {
    if (!activeBoard) return []
    
    let filteredRows = activeBoard.rows

    // Apply search query
    if (searchQuery.trim()) {
      filteredRows = filteredRows.filter(row => {
        return visibleColumns.some(col => {
          const cellValue = String(row.data[col.id] || '').toLowerCase()
          return cellValue.includes(searchQuery.toLowerCase())
        })
      })
    }

    // Apply column filters
    activeFilters.forEach(filter => {
      if (filter.columnId && filter.value) {
        filteredRows = filteredRows.filter(row => {
          const cellValue = String(row.data[filter.columnId] || '').toLowerCase()
          const filterValue = filter.value.toLowerCase()
          
          switch (filter.operator) {
            case 'contains':
              return cellValue.includes(filterValue)
            case 'equals':
              return cellValue === filterValue
            case 'startsWith':
              return cellValue.startsWith(filterValue)
            case 'endsWith':
              return cellValue.endsWith(filterValue)
            case 'notEmpty':
              return cellValue.trim() !== ''
            case 'isEmpty':
              return cellValue.trim() === ''
            default:
              return true
          }
        })
      }
    })

    return filteredRows
  }

  const visibleColumns = activeBoard?.columns.filter(col => col.visible) || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Header */}
      <div className="border-b border-white/10 backdrop-blur-xl bg-white/5">
        <div className="max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-purple-200 hover:text-purple-100 h-8 px-2"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <div className="h-6 w-px bg-white/20"></div>
              <h1 className="text-lg font-semibold text-white">{workspace.name}</h1>
              
              {/* Board Tabs */}
              <div className="flex items-center space-x-1 ml-6">
                {workspace.boards.map((board) => (
                  <div key={board.id} className="relative">
                    <button
                      onClick={() => handleSwitchBoard(board.id)}
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        board.id === activeBoardId
                          ? "bg-purple-600 text-white shadow-md"
                          : "text-purple-200 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span>{board.icon || '📋'}</span>
                      <span>{board.name}</span>
                    </button>
                    
                    {/* Board Menu */}
                    {showBoardMenu === board.id && (
                      <div className="absolute top-full left-0 mt-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg shadow-xl py-1 z-50 min-w-[150px]">
                        <button
                          onClick={() => {
                            const newName = prompt("Enter new board name:", board.name)
                            if (newName) handleRenameBoard(board.id, newName)
                          }}
                          className="w-full px-3 py-2 text-left text-purple-200 hover:text-white hover:bg-white/10 text-sm flex items-center space-x-2"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Rename</span>
                        </button>
                        <button
                          onClick={() => handleDuplicateBoard(board.id)}
                          className="w-full px-3 py-2 text-left text-purple-200 hover:text-white hover:bg-white/10 text-sm flex items-center space-x-2"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Duplicate</span>
                        </button>
                        <button
                          onClick={() => handleDeleteBoard(board.id)}
                          className="w-full px-3 py-2 text-left text-red-400 hover:text-red-300 hover:bg-white/10 text-sm flex items-center space-x-2"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Add Board Button */}
                <button
                  onClick={() => setShowNewBoardModal(true)}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-purple-200 hover:text-white hover:bg-white/10 text-sm font-medium transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Board</span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={undo}
                disabled={historyIndex <= 0}
                className="text-purple-200 hover:text-white disabled:opacity-50"
              >
                <Undo className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
                className="text-purple-200 hover:text-white disabled:opacity-50"
              >
                <Redo className="w-4 h-4" />
              </Button>
              <div className="h-6 w-px bg-white/20"></div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowColumnManager(!showColumnManager)}
                className="text-purple-200 hover:text-white"
              >
                <Settings className="w-4 h-4 mr-1" />
                Columns
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAutomationModal(true)}
                className="text-purple-200 hover:text-white"
              >
                <Zap className="w-4 h-4 mr-1" />
                Automations
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAIAssistant(!showAIAssistant)}
                className={`text-purple-200 hover:text-white ${showAIAssistant ? "bg-purple-600/30" : ""}`}
              >
                <Zap className="w-4 h-4 mr-1" />
                AI Assistant
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={exportCSV}
                className="text-purple-200 hover:text-white"
              >
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
              <label className="cursor-pointer">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-purple-200 hover:text-white"
                >
                  <Upload className="w-4 h-4 mr-1" />
                  Import
                </Button>
                <input
                  type="file"
                  accept=".csv"
                  onChange={importCSV}
                  className="hidden"
                />
              </label>
              <Button
                onClick={onSave}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-3.5rem)]">
        {/* Sidebar - Column Manager */}
        {showColumnManager && (
          <div className="w-80 border-r border-white/10 bg-white/5 p-4 overflow-y-auto">
            <ColumnManager
              columns={activeBoard?.columns || []}
              onColumnsChange={handleColumnsChange}
              onAddColumn={handleAddColumn}
            />
          </div>
        )}

        {/* Main Table Area */}
        <div className="flex-1 overflow-hidden">
          {/* Toolbar */}
          <div className="border-b border-white/10 bg-white/5 px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  onClick={handleAddRow}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Row
                </Button>
                
                <div className="h-6 w-px bg-white/20"></div>
                
                {/* View Mode Toggle */}
                <div className="flex bg-white/10 rounded-lg p-1">
                  <Button
                    variant={viewMode === "table" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("table")}
                    className="text-white"
                  >
                    <Table className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "kanban" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("kanban")}
                    className="text-white"
                  >
                    <KanbanSquare className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "calendar" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("calendar")}
                    className="text-white"
                  >
                    <Calendar className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "dashboard" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("dashboard")}
                    className="text-white"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-purple-400 focus:outline-none focus:border-purple-500"
                  />
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowFilterPanel(!showFilterPanel)}
                  className={`text-purple-200 hover:text-white ${activeFilters.length > 0 ? 'bg-purple-600/30' : ''}`}
                >
                  <Filter className="w-4 h-4" />
                  {activeFilters.length > 0 && (
                    <span className="ml-1 text-xs bg-purple-600 text-white px-1.5 py-0.5 rounded-full">
                      {activeFilters.length}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilterPanel && (
            <div className="border-b border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold text-sm">Filter Rows</h3>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={addFilter}
                    className="text-purple-300 hover:text-white text-xs"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Filter
                  </Button>
                  {activeFilters.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-red-400 hover:text-red-300 text-xs"
                    >
                      Clear All
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilterPanel(false)}
                    className="text-purple-300 hover:text-white h-6 w-6 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {activeFilters.length === 0 ? (
                <p className="text-purple-300/60 text-sm italic">No filters applied. Click "Add Filter" to start filtering.</p>
              ) : (
                <div className="space-y-2">
                  {activeFilters.map((filter, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-white/5 rounded-lg p-2">
                      <select
                        value={filter.columnId}
                        onChange={(e) => updateFilter(index, 'columnId', e.target.value)}
                        className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-purple-500"
                      >
                        {visibleColumns.map(col => (
                          <option key={col.id} value={col.id} className="text-gray-900">{col.name}</option>
                        ))}
                      </select>
                      
                      <select
                        value={filter.operator}
                        onChange={(e) => updateFilter(index, 'operator', e.target.value)}
                        className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-purple-500"
                      >
                        <option value="contains" className="text-gray-900">contains</option>
                        <option value="equals" className="text-gray-900">equals</option>
                        <option value="startsWith" className="text-gray-900">starts with</option>
                        <option value="endsWith" className="text-gray-900">ends with</option>
                        <option value="notEmpty" className="text-gray-900">is not empty</option>
                        <option value="isEmpty" className="text-gray-900">is empty</option>
                      </select>
                      
                      {!['notEmpty', 'isEmpty'].includes(filter.operator) && (
                        <input
                          type="text"
                          value={filter.value}
                          onChange={(e) => updateFilter(index, 'value', e.target.value)}
                          placeholder="Filter value..."
                          className="flex-1 bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm placeholder-purple-400 focus:outline-none focus:border-purple-500"
                        />
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFilter(index)}
                        className="text-red-400 hover:text-red-300 h-6 w-6 p-0"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              
              {activeFilters.length > 0 && (
                <p className="text-purple-300/60 text-xs mt-2">
                  Showing {getFilteredRows().length} of {activeBoard?.rows.length || 0} rows
                </p>
              )}
            </div>
          )}

          {/* Table Content */}
          <div className="flex-1 overflow-auto p-4">
            {viewMode === "table" ? (
              <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-white/10 border-b border-white/20">
                    <tr>
                      <th className="w-12 px-3 py-3 text-left">
                        <input
                          type="checkbox"
                          className="w-4 h-4 bg-white/10 border border-white/20 rounded text-purple-500 focus:ring-purple-500"
                        />
                      </th>
                      <th className="w-8 px-2 py-3"></th>
                      {visibleColumns.map((column) => (
                        <th
                          key={column.id}
                          className="px-3 py-3 text-left text-purple-200 font-medium text-sm"
                          style={{ 
                            width: column.width,
                            position: column.frozen ? "sticky" : "static",
                            left: column.frozen ? 0 : "auto",
                            backgroundColor: column.frozen ? "rgba(255,255,255,0.1)" : "transparent",
                            zIndex: column.frozen ? 10 : 1
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span>{column.name}</span>
                            <div className="flex items-center space-x-1">
                              {column.frozen && <Lock className="w-3 h-3 text-blue-400" />}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleColumnVisibility(column.id, !column.visible)}
                                className="text-purple-300 hover:text-white h-4 w-4 p-0"
                              >
                                {column.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                              </Button>
                            </div>
                          </div>
                        </th>
                      ))}
                      <th className="w-20 px-3 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredRows().map((row) => (
                      <tr
                        key={row.id}
                        className="border-b border-white/10 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-3 py-3">
                          <input
                            type="checkbox"
                            className="w-4 h-4 bg-white/10 border border-white/20 rounded text-purple-500 focus:ring-purple-500"
                          />
                        </td>
                        <td className="px-2 py-3">
                          <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center cursor-move">
                            <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                          </div>
                        </td>
                        {visibleColumns.map((column) => (
                          <td
                            key={column.id}
                            className="px-3 py-3"
                            style={{
                              position: column.frozen ? "sticky" : "static",
                              left: column.frozen ? 0 : "auto",
                              backgroundColor: column.frozen ? "rgba(255,255,255,0.05)" : "transparent"
                            }}
                          >
                            <DynamicField
                              column={column}
                              value={row.data[column.id]}
                              onChange={(value) => handleCellEdit(row.id, column.id, value)}
                            />
                          </td>
                        ))}
                        <td className="px-3 py-3 text-right">
                          <div className="flex items-center justify-end space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-purple-300 hover:text-white h-6 w-6 p-0"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-400 hover:text-red-300 h-6 w-6 p-0"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {(!activeBoard || activeBoard.rows.length === 0) && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Plus className="w-8 h-8 text-purple-400" />
                    </div>
                    <p className="text-purple-200 mb-4">No data yet</p>
                    <Button
                      onClick={handleAddRow}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add First Row
                    </Button>
                  </div>
                )}
              </div>
            ) : viewMode === "kanban" ? (
              <KanbanView
                columns={activeBoard?.columns || []}
                rows={activeBoard?.rows || []}
                onRowUpdate={(rowId, updates) => {
                  if (!activeBoard) return
                  const newRows = activeBoard.rows.map(row =>
                    row.id === rowId ? { ...row, data: { ...row.data, ...updates } } : row
                  )
                  handleRowsChange(newRows)
                }}
                onRowDelete={(rowId) => {
                  if (!activeBoard) return
                  const newRows = activeBoard.rows.filter(row => row.id !== rowId)
                  handleRowsChange(newRows)
                }}
                onRowMove={(rowId, fromColumn, toColumn) => {
                  // Handle row move between kanban columns
                }}
              />
            ) : viewMode === "calendar" ? (
              <CalendarView
                columns={activeBoard?.columns || []}
                rows={activeBoard?.rows || []}
                onRowClick={(rowId) => {
                  // Handle row click
                }}
              />
            ) : viewMode === "dashboard" ? (
              <DashboardView
                columns={activeBoard?.columns || []}
                rows={activeBoard?.rows || []}
              />
            ) : null}
          </div>
        </div>

        {showAIAssistant && <AIAssistantPanel onApply={handleApplyAIAssistant} />}
      </div>

      {/* Automation Modal */}
      {showAutomationModal && activeBoard && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <AutomationBuilder
            boardId={activeBoard.id}
            workspaceId={workspace.id}
            boards={workspace.boards}
            onSave={handleSaveAutomation}
            onCancel={() => setShowAutomationModal(false)}
          />
        </div>
      )}

      {/* New Board Modal */}
      {showNewBoardModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 border border-white/20 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Create New Board</h2>
              <input
                type="text"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                placeholder="Board name..."
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 mb-4"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreateBoard()
                  if (e.key === 'Escape') setShowNewBoardModal(false)
                }}
              />
              <div className="flex justify-end space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowNewBoardModal(false)
                    setNewBoardName("")
                  }}
                  className="text-purple-300 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateBoard}
                  disabled={!newBoardName.trim()}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white disabled:opacity-50"
                >
                  Create Board
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
