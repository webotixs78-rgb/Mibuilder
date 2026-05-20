"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from "lucide-react"

interface CalendarViewProps {
  columns: any[]
  rows: any[]
  dateColumnId?: string
  onRowClick?: (rowId: string) => void
}

export function CalendarView({ columns, rows, dateColumnId, onRowClick }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Find the date column
  const dateColumn = dateColumnId ? columns.find(c => c.id === dateColumnId) : columns.find(c => 
    c.type.type === 'date' || c.type.type === 'datetime' || c.name.toLowerCase().includes('date')
  )

  // Get display field
  const displayColumn = columns.find(c => 
    c.name.toLowerCase() === 'name' || 
    c.name.toLowerCase() === 'title' ||
    c.type.type === 'text'
  )

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    return {
      firstDay,
      lastDay,
      daysInMonth: lastDay.getDate(),
      startDayOfWeek: firstDay.getDay()
    }
  }

  const getEventsForDate = (date: Date) => {
    if (!dateColumn) return []
    
    const dateStr = date.toISOString().split('T')[0]
    
    return rows.filter(row => {
      const rowDate = row.data[dateColumn.id]
      if (!rowDate) return false
      
      // Handle different date formats
      const rowDateStr = new Date(rowDate).toISOString().split('T')[0]
      return rowDateStr === dateStr
    })
  }

  const getDisplayValue = (row: any) => {
    if (displayColumn) {
      return row.data[displayColumn.id] || 'Untitled'
    }
    return Object.values(row.data)[0] || 'Untitled'
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      return newDate
    })
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const { firstDay, daysInMonth, startDayOfWeek } = getDaysInMonth(currentDate)
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // Create calendar grid
  const calendarDays = []
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startDayOfWeek; i++) {
    calendarDays.push({ day: null, isCurrentMonth: false })
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    calendarDays.push({ day, date, isCurrentMonth: true })
  }

  const today = new Date()
  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString()
  }

  return (
    <div className="h-full flex flex-col p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => navigateMonth('prev')} className="text-purple-300 hover:text-white">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-xl font-semibold text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <Button variant="ghost" size="sm" onClick={() => navigateMonth('next')} className="text-purple-300 hover:text-white">
            <ChevronRight className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={goToToday} className="text-purple-300 hover:text-white">
            Today
          </Button>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg overflow-hidden">
        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b border-white/10">
          {dayNames.map(day => (
            <div key={day} className="p-3 text-center text-purple-300 font-medium text-sm">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 flex-1 auto-rows-fr">
          {calendarDays.map((cell, index) => {
            if (!cell.day) {
              return <div key={index} className="border border-white/5 bg-white/5/50" />
            }

            const events = getEventsForDate(cell.date)
            const isCurrentDay = isToday(cell.date)

            return (
              <div
                key={index}
                onClick={() => setSelectedDate(cell.date)}
                className={`border border-white/5 p-2 min-h-[100px] cursor-pointer hover:bg-white/10 transition-colors ${
                  isCurrentDay ? 'bg-purple-600/20' : ''
                }`}
              >
                <div className={`flex items-center justify-between mb-1`}>
                  <span className={`text-sm font-medium ${isCurrentDay ? 'text-purple-400' : 'text-white'}`}>
                    {cell.day}
                  </span>
                  {events.length > 0 && (
                    <span className="text-xs text-purple-300 bg-purple-500/20 px-1.5 py-0.5 rounded">
                      {events.length}
                    </span>
                  )}
                </div>

                <div className="space-y-1 overflow-y-auto max-h-[80px]">
                  {events.slice(0, 3).map((row) => (
                    <div
                      key={row.id}
                      onClick={(e) => {
                        e.stopPropagation()
                        onRowClick?.(row.id)
                      }}
                      className="text-xs bg-purple-600/30 border border-purple-500/50 rounded px-1.5 py-0.5 text-white truncate hover:bg-purple-600/50 cursor-pointer"
                    >
                      {getDisplayValue(row)}
                    </div>
                  ))}
                  {events.length > 3 && (
                    <div className="text-xs text-purple-300 text-center">
                      +{events.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Selected Date Events */}
      {selectedDate && (
        <div className="mt-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold flex items-center space-x-2">
              <CalendarIcon className="w-4 h-4 text-purple-400" />
              <span>
                {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </h3>
            <Button variant="ghost" size="sm" onClick={() => setSelectedDate(null)} className="text-purple-300 hover:text-white">
              Close
            </Button>
          </div>

          <div className="space-y-2">
            {getEventsForDate(selectedDate).length === 0 ? (
              <p className="text-purple-300/60 text-sm">No events on this day</p>
            ) : (
              getEventsForDate(selectedDate).map((row) => (
                <Card key={row.id} className="bg-white/10 border-white/20">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{getDisplayValue(row)}</p>
                        {displayColumn && (
                          <p className="text-purple-300 text-sm">{displayColumn.name}</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRowClick?.(row.id)}
                        className="text-purple-300 hover:text-white"
                      >
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
