"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal, GripVertical, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface KanbanColumn {
  id: string
  name: string
  color: string
  rows: any[]
}

interface KanbanViewProps {
  columns: any[]
  rows: any[]
  statusColumnId?: string
  onRowUpdate: (rowId: string, updates: any) => void
  onRowDelete: (rowId: string) => void
  onRowMove: (rowId: string, fromColumn: string, toColumn: string) => void
}

export function KanbanView({ columns, rows, statusColumnId, onRowUpdate, onRowDelete, onRowMove }: KanbanViewProps) {
  const [draggedRow, setDraggedRow] = useState<any>(null)
  const [draggedOverColumn, setDraggedOverColumn] = useState<string | null>(null)

  // Find the status column
  const statusColumn = statusColumnId ? columns.find(c => c.id === statusColumnId) : columns.find(c => c.type.type === 'status')
  
  // Get unique status values
  const statusOptions = statusColumn?.settings?.options || ['Not Started', 'In Progress', 'Completed']
  
  // Group rows by status
  const kanbanColumns: KanbanColumn[] = statusOptions.map((option: string, index: number) => ({
    id: option.toLowerCase().replace(/\s+/g, '_'),
    name: option,
    color: ['#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444'][index % 5],
    rows: rows.filter(row => {
      const statusValue = statusColumn ? row.data[statusColumn.id] : null
      return statusValue === option
    })
  }))

  const handleDragStart = (row: any, columnId: string) => {
    setDraggedRow({ row, fromColumn: columnId })
  }

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault()
    setDraggedOverColumn(columnId)
  }

  const handleDrop = (e: React.DragEvent, toColumnId: string) => {
    e.preventDefault()
    if (!draggedRow || !statusColumn) return

    const { row, fromColumn } = draggedRow
    if (fromColumn === toColumnId) {
      setDraggedRow(null)
      setDraggedOverColumn(null)
      return
    }

    // Update the row's status
    const statusValue = kanbanColumns.find(col => col.id === toColumnId)?.name
    if (statusValue) {
      onRowUpdate(row.id, { [statusColumn.id]: statusValue })
      onRowMove(row.id, fromColumn, toColumnId)
    }

    setDraggedRow(null)
    setDraggedOverColumn(null)
  }

  const getDisplayValue = (row: any) => {
    // Find a display field (prefer name, title, or first text field)
    const displayColumn = columns.find(c => 
      c.name.toLowerCase() === 'name' || 
      c.name.toLowerCase() === 'title' ||
      c.type.type === 'text'
    )
    if (displayColumn) {
      return row.data[displayColumn.id] || 'Untitled'
    }
    return Object.values(row.data)[0] || 'Untitled'
  }

  return (
    <div className="flex h-full gap-4 overflow-x-auto p-4">
      {kanbanColumns.map((column) => (
        <div
          key={column.id}
          onDragOver={(e) => handleDragOver(e, column.id)}
          onDrop={(e) => handleDrop(e, column.id)}
          className={`flex-shrink-0 w-80 flex flex-col bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg ${
            draggedOverColumn === column.id ? 'border-purple-500' : ''
          }`}
        >
          {/* Column Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: column.color }}
                />
                <h3 className="text-white font-semibold">{column.name}</h3>
                <span className="text-purple-300 text-sm bg-purple-500/20 px-2 py-0.5 rounded-full">
                  {column.rows.length}
                </span>
              </div>
              <Button variant="ghost" size="sm" className="text-purple-300 hover:text-white h-6 w-6 p-0">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Column Content */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {column.rows.map((row) => (
              <div
                key={row.id}
                draggable
                onDragStart={() => handleDragStart(row, column.id)}
                className={`bg-white/10 border border-white/20 rounded-lg p-3 cursor-move hover:bg-white/15 transition-colors ${
                  draggedRow?.row.id === row.id ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <GripVertical className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <p className="text-white text-sm truncate">{getDisplayValue(row)}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRowDelete(row.id)}
                    className="text-purple-300 hover:text-red-400 h-6 w-6 p-0 flex-shrink-0"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
                
                {/* Show some additional fields */}
                <div className="space-y-1">
                  {columns.slice(0, 3).filter(col => col.id !== statusColumn?.id).map(col => (
                    <div key={col.id} className="flex items-center justify-between text-xs">
                      <span className="text-purple-300">{col.name}:</span>
                      <span className="text-white truncate ml-2 max-w-[100px]">
                        {String(row.data[col.id] || '-')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {column.rows.length === 0 && (
              <div className="text-center py-8">
                <p className="text-purple-300/60 text-sm">No items</p>
              </div>
            )}
          </div>

          {/* Add Button */}
          <div className="p-3 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full text-purple-300 hover:text-white hover:bg-white/10"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
