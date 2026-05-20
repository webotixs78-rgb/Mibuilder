"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Plus, GripVertical, Eye, EyeOff, Lock, Unlock, Copy, Trash2, Settings } from "lucide-react"

export interface ColumnType {
  id: string
  name: string
  type: string
  category: "basic" | "selection" | "datetime" | "media" | "advanced" | "relationship" | "automation"
  icon: React.ReactNode
  description: string
  settings?: Record<string, any>
}

export interface Column {
  id: string
  name: string
  type: ColumnType
  width: number
  visible: boolean
  frozen: boolean
  order: number
  settings: Record<string, any>
}

interface ColumnManagerProps {
  columns: Column[]
  onColumnsChange: (columns: Column[]) => void
  onAddColumn: (columnType: ColumnType) => void
}

const COLUMN_TYPES: ColumnType[] = [
  // Basic Types
  { id: "text", name: "Text Input", type: "text", category: "basic", icon: "T", description: "Single line text input" },
  { id: "number", name: "Number", type: "number", category: "basic", icon: "#", description: "Numeric values" },
  { id: "email", name: "Email", type: "email", category: "basic", icon: "@", description: "Email address" },
  { id: "phone", name: "Phone", type: "phone", category: "basic", icon: "📞", description: "Phone number" },
  { id: "url", name: "URL", type: "url", category: "basic", icon: "🔗", description: "Web link" },
  { id: "password", name: "Password", type: "password", category: "basic", icon: "🔒", description: "Password field" },
  { id: "textarea", name: "Textarea", type: "textarea", category: "basic", icon: "📝", description: "Multi-line text" },
  { id: "richtext", name: "Rich Text", type: "richtext", category: "basic", icon: "📄", description: "Formatted text editor" },
  
  // Selection Types
  { id: "dropdown", name: "Dropdown", type: "dropdown", category: "selection", icon: "▼", description: "Single select dropdown" },
  { id: "multiselect", name: "Multi Select", type: "multiselect", category: "selection", icon: "☑", description: "Multiple selection" },
  { id: "checkbox", name: "Checkbox", type: "checkbox", category: "selection", icon: "☐", description: "True/False checkbox" },
  { id: "radio", name: "Radio", type: "radio", category: "selection", icon: "○", description: "Radio button group" },
  { id: "toggle", name: "Toggle", type: "toggle", category: "selection", icon: "🔄", description: "On/Off switch" },
  
  // Date & Time
  { id: "date", name: "Date", type: "date", category: "datetime", icon: "📅", description: "Date picker" },
  { id: "time", name: "Time", type: "time", category: "datetime", icon: "🕐", description: "Time picker" },
  { id: "datetime", name: "DateTime", type: "datetime", category: "datetime", icon: "📆", description: "Date and time" },
  
  // Media & Files
  { id: "file", name: "File Upload", type: "file", category: "media", icon: "📎", description: "File attachment" },
  { id: "image", name: "Image Upload", type: "image", category: "media", icon: "🖼", description: "Image upload" },
  { id: "signature", name: "Signature", type: "signature", category: "media", icon: "✍", description: "Digital signature" },
  
  // Advanced Types
  { id: "currency", name: "Currency", type: "currency", category: "advanced", icon: "💰", description: "Currency values" },
  { id: "percentage", name: "Percentage", type: "percentage", category: "advanced", icon: "%", description: "Percentage values" },
  { id: "rating", name: "Rating", type: "rating", category: "advanced", icon: "⭐", description: "Star rating" },
  { id: "progress", name: "Progress", type: "progress", category: "advanced", icon: "📊", description: "Progress bar" },
  { id: "tags", name: "Tags", type: "tags", category: "advanced", icon: "🏷", description: "Tag system" },
  { id: "color", name: "Color Picker", type: "color", category: "advanced", icon: "🎨", description: "Color selection" },
  { id: "json", name: "JSON", type: "json", category: "advanced", icon: "{}", description: "JSON data" },
  { id: "formula", name: "Formula", type: "formula", category: "advanced", icon: "ƒ", description: "Calculated field" },
  { id: "autoid", name: "Auto ID", type: "autoid", category: "advanced", icon: "🆔", description: "Auto increment ID" },
  
  // Relationship Types
  { id: "user", name: "User Reference", type: "user", category: "relationship", icon: "👤", description: "User assignment" },
  { id: "contact", name: "CRM Contact", type: "contact", category: "relationship", icon: "👥", description: "Contact reference" },
  { id: "company", name: "Company", type: "company", category: "relationship", icon: "🏢", description: "Company reference" },
  { id: "linked", name: "Linked Record", type: "linked", category: "relationship", icon: "🔗", description: "Related records" },
  { id: "relation", name: "Board Relation", type: "relation", category: "relationship", icon: "🔗", description: "Connect to another board" },
  
  // Automation Types
  { id: "status", name: "Status", type: "status", category: "automation", icon: "📊", description: "Status workflow" },
  { id: "priority", name: "Priority", type: "priority", category: "automation", icon: "🔥", description: "Priority levels" },
  { id: "workflow", name: "Workflow", type: "workflow", category: "automation", icon: "⚡", description: "Workflow stages" },
  { id: "approval", name: "Approval", type: "approval", category: "automation", icon: "✅", description: "Approval state" }
]

export function ColumnManager({ columns, onColumnsChange, onAddColumn }: ColumnManagerProps) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [draggedColumn, setDraggedColumn] = useState<Column | null>(null)

  const categories = [
    { id: "all", name: "All Types", icon: "📋" },
    { id: "basic", name: "Basic", icon: "🔤" },
    { id: "selection", name: "Selection", icon: "☑" },
    { id: "datetime", name: "Date & Time", icon: "📅" },
    { id: "media", name: "Media", icon: "📎" },
    { id: "advanced", name: "Advanced", icon: "⚙" },
    { id: "relationship", name: "Relationship", icon: "🔗" },
    { id: "automation", name: "Automation", icon: "⚡" }
  ]

  const filteredTypes = selectedCategory === "all" 
    ? COLUMN_TYPES 
    : COLUMN_TYPES.filter(type => type.category === selectedCategory)

  const handleDragStart = (column: Column) => {
    setDraggedColumn(column)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (targetColumn: Column) => {
    if (!draggedColumn || draggedColumn.id === targetColumn.id) return

    const newColumns = [...columns]
    const draggedIndex = newColumns.findIndex(c => c.id === draggedColumn.id)
    const targetIndex = newColumns.findIndex(c => c.id === targetColumn.id)

    newColumns.splice(draggedIndex, 1)
    newColumns.splice(targetIndex, 0, draggedColumn)

    // Update order values
    newColumns.forEach((col, index) => {
      col.order = index
    })

    onColumnsChange(newColumns)
    setDraggedColumn(null)
  }

  const toggleColumnVisibility = (columnId: string) => {
    const newColumns = columns.map(col => 
      col.id === columnId ? { ...col, visible: !col.visible } : col
    )
    onColumnsChange(newColumns)
  }

  const toggleColumnFreeze = (columnId: string) => {
    const newColumns = columns.map(col => 
      col.id === columnId ? { ...col, frozen: !col.frozen } : col
    )
    onColumnsChange(newColumns)
  }

  const duplicateColumn = (column: Column) => {
    const newColumn: Column = {
      ...column,
      id: `${column.id}_copy_${Date.now()}`,
      name: `${column.name} (Copy)`,
      order: column.order + 0.5
    }
    
    const newColumns = [...columns, newColumn].sort((a, b) => a.order - b.order)
    onColumnsChange(newColumns)
  }

  const deleteColumn = (columnId: string) => {
    const newColumns = columns.filter(col => col.id !== columnId)
    onColumnsChange(newColumns)
  }

  const resizeColumn = (columnId: string, newWidth: number) => {
    const newColumns = columns.map(col => 
      col.id === columnId ? { ...col, width: newWidth } : col
    )
    onColumnsChange(newColumns)
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Column Manager</h3>
        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Column
        </Button>
      </div>

      {/* Columns List */}
      <div className="space-y-2">
        {columns.map((column) => (
          <div
            key={column.id}
            draggable
            onDragStart={() => handleDragStart(column)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column)}
            className={`flex items-center space-x-2 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-move ${
              draggedColumn?.id === column.id ? "opacity-50" : ""
            }`}
          >
            <GripVertical className="w-4 h-4 text-purple-400" />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-white font-medium truncate">{column.name}</span>
                <span className="text-purple-300 text-xs bg-purple-500/20 px-2 py-1 rounded">
                  {column.type.name}
                </span>
                {!column.visible && (
                  <EyeOff className="w-3 h-3 text-gray-400" />
                )}
                {column.frozen && (
                  <Lock className="w-3 h-3 text-blue-400" />
                )}
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleColumnVisibility(column.id)}
                className="text-purple-300 hover:text-white"
              >
                {column.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleColumnFreeze(column.id)}
                className="text-purple-300 hover:text-white"
              >
                {column.frozen ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => duplicateColumn(column)}
                className="text-purple-300 hover:text-white"
              >
                <Copy className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-purple-300 hover:text-white"
              >
                <Settings className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteColumn(column.id)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Column Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 border border-white/20 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/5 flex-shrink-0">
              <div>
                <h2 className="text-xl font-bold text-white">Add New Column</h2>
                <p className="text-purple-300 text-xs mt-0.5">Select a column type for your workspace</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddModal(false)}
                className="text-purple-300 hover:text-white hover:bg-white/10 h-8 w-8 p-0 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 p-4 border-b border-white/10 bg-white/5 flex-shrink-0">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    selectedCategory === category.id
                      ? "bg-purple-600 text-white shadow-md"
                      : "text-purple-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className="mr-1">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>

            {/* Column Types Grid */}
            <div className="flex-1 overflow-y-auto p-5">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredTypes.map((columnType) => (
                  <button
                    key={columnType.id}
                    onClick={() => {
                      onAddColumn(columnType)
                      setShowAddModal(false)
                    }}
                    className="group p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-purple-400/40 transition-all duration-200 text-left"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center text-base flex-shrink-0 group-hover:scale-105 transition-transform">
                        {columnType.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-white font-medium text-sm block truncate">{columnType.name}</span>
                        <p className="text-purple-300/70 text-xs mt-0.5 line-clamp-2">{columnType.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-white/10 bg-white/5 flex justify-between items-center flex-shrink-0">
              <span className="text-purple-300 text-xs">
                {filteredTypes.length} types available
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddModal(false)}
                className="text-purple-300 hover:text-white text-sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
