"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Link2, X, Plus, Search } from "lucide-react"

interface RelationFieldProps {
  value: string | string[]
  onChange: (value: string | string[]) => void
  relationConfig: {
    targetBoardId?: string
    targetColumnId?: string
    relationType?: 'one-to-one' | 'one-to-many' | 'many-to-many'
    allowMultiple?: boolean
    displayField?: string
  }
  boards: any[]
  disabled?: boolean
}

interface BoardRecord {
  id: string
  data: Record<string, any>
}

export function RelationField({ value, onChange, relationConfig, boards, disabled }: RelationFieldProps) {
  const [isOpen, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRecords, setSelectedRecords] = useState<string[]>(Array.isArray(value) ? value : value ? [value] : [])
  
  const targetBoard = boards.find(b => b.id === relationConfig.targetBoardId)
  const targetRecords: BoardRecord[] = targetBoard?.rows || []
  
  const isMultiple = relationConfig.allowMultiple || relationConfig.relationType === 'many-to-many'
  
  useEffect(() => {
    setSelectedRecords(Array.isArray(value) ? value : value ? [value] : [])
  }, [value, isMultiple])

  const filteredRecords = targetRecords.filter(record => {
    if (!searchQuery) return true
    const displayValue = record.data[relationConfig.displayField || 'name'] || record.id
    return String(displayValue).toLowerCase().includes(searchQuery.toLowerCase())
  })

  const handleRecordSelect = (recordId: string) => {
    if (isMultiple) {
      const newSelected = selectedRecords.includes(recordId)
        ? selectedRecords.filter(id => id !== recordId)
        : [...selectedRecords, recordId]
      setSelectedRecords(newSelected)
      onChange(newSelected)
    } else {
      setSelectedRecords([recordId])
      onChange(recordId)
      setOpen(false)
    }
  }

  const handleRemoveRecord = (recordId: string) => {
    if (isMultiple) {
      const newSelected = selectedRecords.filter(id => id !== recordId)
      setSelectedRecords(newSelected)
      onChange(newSelected)
    } else {
      setSelectedRecords([])
      onChange("")
    }
  }

  const getDisplayValue = (recordId: string) => {
    const record = targetRecords.find(r => r.id === recordId)
    return record?.data[relationConfig.displayField || 'name'] || recordId
  }

  return (
    <div className="w-full">
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left h-9 px-3 bg-white/10 border-white/20 text-white hover:bg-white/20"
            disabled={disabled}
          >
            <Link2 className="w-4 h-4 mr-2 text-purple-400" />
            {selectedRecords.length === 0 ? (
              <span className="text-purple-300">Select records...</span>
            ) : isMultiple ? (
              <span className="text-white">{selectedRecords.length} selected</span>
            ) : (
              <span className="text-white truncate">{getDisplayValue(selectedRecords[0])}</span>
            )}
          </Button>
        </DialogTrigger>
        
        <DialogContent className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 border-white/20 text-white max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-white">Select Records</DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
              <input
                type="text"
                placeholder="Search records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500"
              />
            </div>
            
            {/* Records List */}
            <div className="flex-1 overflow-y-auto space-y-2">
              {filteredRecords.length === 0 ? (
                <p className="text-purple-300 text-center py-8">No records found</p>
              ) : (
                filteredRecords.map((record) => {
                  const isSelected = selectedRecords.includes(record.id)
                  const displayValue = record.data[relationConfig.displayField || 'name'] || record.id
                  
                  return (
                    <button
                      key={record.id}
                      onClick={() => handleRecordSelect(record.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                        isSelected
                          ? "bg-purple-600 border border-purple-500"
                          : "bg-white/5 border border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <span className="text-white">{displayValue}</span>
                      {isSelected && (
                        <div className="w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full" />
                        </div>
                      )}
                    </button>
                  )
                })
              )}
            </div>
            
            {/* Selected Records (for multi-select) */}
            {isMultiple && selectedRecords.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-purple-300 text-sm mb-2">{selectedRecords.length} selected</p>
                <div className="flex flex-wrap gap-2">
                  {selectedRecords.map((recordId) => (
                    <div
                      key={recordId}
                      className="flex items-center space-x-1 bg-purple-600/30 border border-purple-500/50 rounded-full px-3 py-1"
                    >
                      <span className="text-white text-sm">{getDisplayValue(recordId)}</span>
                      <button
                        onClick={() => handleRemoveRecord(recordId)}
                        className="text-purple-300 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-white/10">
            <Button
              variant="ghost"
              onClick={() => setOpen(false)}
              className="text-purple-300 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setOpen(false)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Quick remove for single select */}
      {!isMultiple && selectedRecords.length > 0 && (
        <button
          onClick={() => handleRemoveRecord(selectedRecords[0])}
          className="mt-1 text-xs text-purple-400 hover:text-red-400 flex items-center space-x-1"
        >
          <X className="w-3 h-3" />
          <span>Clear selection</span>
        </button>
      )}
    </div>
  )
}
