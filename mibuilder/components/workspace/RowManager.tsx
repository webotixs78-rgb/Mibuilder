"use client"

import React, { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Copy, Trash2, GripVertical, Check, ChevronDown, Search, Filter, ArrowUpDown, Group } from "lucide-react"

export interface Row {
  id: string
  data: Record<string, any>
  selected?: boolean
}

interface RowManagerProps {
  rows: Row[]
  columns: Array<{
    id: string
    name: string
    type: { type: string }
    visible: boolean
    frozen: boolean
    width: number
  }>
  onRowsChange: (rows: Row[]) => void
  onAddRow: () => void
  onBulkDelete: (rowIds: string[]) => void
  onDuplicateRows: (rowIds: string[]) => void
}

export function RowManager({ 
  rows, 
  columns, 
  onRowsChange, 
  onAddRow, 
  onBulkDelete, 
  onDuplicateRows 
}: RowManagerProps) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [draggedRow, setDraggedRow] = useState<Row | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [showBulkActions, setShowBulkActions] = useState(false)
  const dragCounter = useRef(0)

  // Filter rows based on search
  const filteredRows = rows.filter(row => {
    if (!searchQuery) return true
    return Object.values(row.data).some(value => 
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  // Sort rows
  const sortedRows = [...filteredRows].sort((a, b) => {
    if (!sortBy) return 0
    
    const aValue = a.data[sortBy] || ""
    const bValue = b.data[sortBy] || ""
    
    const comparison = String(aValue).localeCompare(String(bValue))
    return sortOrder === "asc" ? comparison : -comparison
  })

  const handleRowSelect = (rowId: string, selected: boolean) => {
    const newSelected = new Set(selectedRows)
    if (selected) {
      newSelected.add(rowId)
    } else {
      newSelected.delete(rowId)
    }
    setSelectedRows(newSelected)
    setShowBulkActions(newSelected.size > 0)
  }

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedRows(new Set(sortedRows.map(row => row.id)))
      setShowBulkActions(true)
    } else {
      setSelectedRows(new Set())
      setShowBulkActions(false)
    }
  }

  const handleDragStart = (row: Row) => {
    setDraggedRow(row)
    dragCounter.current = 0
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    dragCounter.current++
  }

  const handleDragLeave = (e: React.DragEvent) => {
    dragCounter.current--
  }

  const handleDrop = (e: React.DragEvent, targetRow: Row) => {
    e.preventDefault()
    dragCounter.current = 0
    
    if (!draggedRow || draggedRow.id === targetRow.id) return

    const newRows = [...rows]
    const draggedIndex = newRows.findIndex(r => r.id === draggedRow.id)
    const targetIndex = newRows.findIndex(r => r.id === targetRow.id)

    newRows.splice(draggedIndex, 1)
    newRows.splice(targetIndex, 0, draggedRow)

    onRowsChange(newRows)
    setDraggedRow(null)
  }

  const handleSort = (columnId: string) => {
    if (sortBy === columnId) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(columnId)
      setSortOrder("asc")
    }
  }

  const handleBulkDelete = () => {
    if (selectedRows.size === 0) return
    onBulkDelete(Array.from(selectedRows))
    setSelectedRows(new Set())
    setShowBulkActions(false)
  }

  const handleBulkDuplicate = () => {
    if (selectedRows.size === 0) return
    onDuplicateRows(Array.from(selectedRows))
    setSelectedRows(new Set())
    setShowBulkActions(false)
  }

  const visibleColumns = columns.filter(col => col.visible)
  const frozenColumns = visibleColumns.filter(col => col.frozen)
  const regularColumns = visibleColumns.filter(col => !col.frozen)

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 bg-white/5 border border-white/20 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Button
            onClick={onAddRow}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Row
          </Button>
          
          {showBulkActions && (
            <>
              <div className="h-6 w-px bg-white/20"></div>
              <span className="text-purple-200 text-sm">
                {selectedRows.size} selected
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBulkDuplicate}
                className="text-purple-200 hover:text-white"
              >
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBulkDelete}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
            <input
              type="text"
              placeholder="Search rows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-purple-400 focus:outline-none focus:border-purple-500"
            />
          </div>
          
          <Button variant="ghost" size="sm" className="text-purple-200 hover:text-white">
            <Filter className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm" className="text-purple-200 hover:text-white">
            <Group className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-white/20 rounded-b-lg">
        <table className="w-full">
          <thead className="bg-white/5 border-b border-white/20">
            <tr>
              {/* Select All Checkbox */}
              <th className="w-12 px-3 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedRows.size === sortedRows.length && sortedRows.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="w-4 h-4 bg-white/10 border border-white/20 rounded text-purple-500 focus:ring-purple-500"
                />
              </th>

              {/* Drag Handle */}
              <th className="w-8 px-2 py-3">
                <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center">
                  <GripVertical className="w-3 h-3 text-purple-400" />
                </div>
              </th>

              {/* Frozen Columns */}
              {frozenColumns.map((column) => (
                <th
                  key={column.id}
                  className="px-3 py-3 text-left text-purple-200 font-medium text-sm border-r border-white/10"
                  style={{ width: column.width, position: "sticky", left: 0, backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                  <button
                    onClick={() => handleSort(column.id)}
                    className="flex items-center space-x-1 hover:text-white transition-colors"
                  >
                    <span>{column.name}</span>
                    {sortBy === column.id && (
                      <ChevronDown className={`w-3 h-3 transform ${sortOrder === "desc" ? "rotate-180" : ""}`} />
                    )}
                  </button>
                </th>
              ))}

              {/* Regular Columns */}
              {regularColumns.map((column) => (
                <th
                  key={column.id}
                  className="px-3 py-3 text-left text-purple-200 font-medium text-sm"
                  style={{ width: column.width }}
                >
                  <button
                    onClick={() => handleSort(column.id)}
                    className="flex items-center space-x-1 hover:text-white transition-colors"
                  >
                    <span>{column.name}</span>
                    {sortBy === column.id && (
                      <ChevronDown className={`w-3 h-3 transform ${sortOrder === "desc" ? "rotate-180" : ""}`} />
                    )}
                  </button>
                </th>
              ))}

              {/* Actions */}
              <th className="w-20 px-3 py-3 text-right text-purple-200 font-medium text-sm">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedRows.map((row, index) => (
              <tr
                key={row.id}
                draggable
                onDragStart={() => handleDragStart(row)}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, row)}
                className={`border-b border-white/10 hover:bg-white/5 transition-colors ${
                  selectedRows.has(row.id) ? "bg-purple-500/10" : ""
                } ${draggedRow?.id === row.id ? "opacity-50" : ""}`}
              >
                {/* Select Checkbox */}
                <td className="px-3 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(row.id)}
                    onChange={(e) => handleRowSelect(row.id, e.target.checked)}
                    className="w-4 h-4 bg-white/10 border border-white/20 rounded text-purple-500 focus:ring-purple-500"
                  />
                </td>

                {/* Drag Handle */}
                <td className="px-2 py-3">
                  <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center cursor-move">
                    <GripVertical className="w-3 h-3 text-purple-400" />
                  </div>
                </td>

                {/* Frozen Columns */}
                {frozenColumns.map((column) => (
                  <td
                    key={column.id}
                    className="px-3 py-3 border-r border-white/10"
                    style={{ position: "sticky", left: 0, backgroundColor: "rgba(255,255,255,0.05)" }}
                  >
                    <div className="text-white text-sm">
                      {row.data[column.id] || "—"}
                    </div>
                  </td>
                ))}

                {/* Regular Columns */}
                {regularColumns.map((column) => (
                  <td key={column.id} className="px-3 py-3">
                    <div className="text-white text-sm">
                      {row.data[column.id] || "—"}
                    </div>
                  </td>
                ))}

                {/* Actions */}
                <td className="px-3 py-3 text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newRow = {
                          ...row,
                          id: `${row.id}_copy_${Date.now()}`,
                          data: { ...row.data }
                        }
                        const newRows = [...rows]
                        newRows.splice(index + 1, 0, newRow)
                        onRowsChange(newRows)
                      }}
                      className="text-purple-300 hover:text-white h-6 w-6 p-0"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newRows = rows.filter(r => r.id !== row.id)
                        onRowsChange(newRows)
                        setSelectedRows(prev => {
                          const newSet = new Set(prev)
                          newSet.delete(row.id)
                          return newSet
                        })
                      }}
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

        {/* Empty State */}
        {sortedRows.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-purple-400" />
            </div>
            <p className="text-purple-200 mb-4">
              {searchQuery ? "No rows found matching your search" : "No rows yet"}
            </p>
            {!searchQuery && (
              <Button
                onClick={onAddRow}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Row
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
