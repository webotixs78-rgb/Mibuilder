"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Clock,
  Users,
  Target,
  Video,
  MapPin
} from "lucide-react"

const events = [
  {
    id: 1,
    title: "Marketing Team Meeting",
    date: "2024-03-20",
    time: "10:00 AM",
    duration: "1 hour",
    type: "meeting",
    attendees: ["Sarah Chen", "Mike Johnson", "Emily Davis"],
    location: "Conference Room A",
    description: "Weekly marketing team sync and strategy discussion"
  },
  {
    id: 2,
    title: "Product Demo",
    date: "2024-03-20",
    time: "2:00 PM",
    duration: "30 minutes",
    type: "demo",
    attendees: ["Alex Wilson", "Lisa Anderson"],
    location: "Virtual - Zoom",
    description: "Product demonstration for potential client"
  },
  {
    id: 3,
    title: "Q1 Review",
    date: "2024-03-21",
    time: "3:00 PM",
    duration: "2 hours",
    type: "review",
    attendees: ["Tom Brown", "Sarah Chen", "Mike Johnson"],
    location: "Board Room",
    description: "Quarterly performance review and planning"
  },
  {
    id: 4,
    title: "Client Workshop",
    date: "2024-03-22",
    time: "9:00 AM",
    duration: "3 hours",
    type: "workshop",
    attendees: ["Emily Davis", "Alex Wilson", "Lisa Anderson"],
    location: "Client Office",
    description: "Requirements gathering workshop with key stakeholders"
  }
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month')

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = getFirstDayOfMonth(currentDate)
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]

  const renderCalendar = () => {
    const days = []
    const emptyDays = firstDayOfMonth

    // Add empty cells for days before month starts
    for (let i = 0; i < emptyDays; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.date)
        return eventDate.getDate() === day && 
               eventDate.getMonth() === currentDate.getMonth() &&
               eventDate.getFullYear() === currentDate.getFullYear()
      })

      const isToday = new Date().getDate() === day && 
                      new Date().getMonth() === currentDate.getMonth() &&
                      new Date().getFullYear() === currentDate.getFullYear()

      days.push(
        <div 
          key={day} 
          className={`h-24 border border-gray-200 p-1 overflow-hidden ${
            isToday ? 'bg-purple-50' : 'bg-white'
          }`}
        >
          <div className={`text-sm font-medium mb-1 ${
            isToday ? 'text-purple-600' : 'text-gray-900'
          }`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event, index) => (
              <div 
                key={index}
                className={`text-xs p-1 rounded truncate ${
                  event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                  event.type === 'demo' ? 'bg-green-100 text-green-800' :
                  event.type === 'review' ? 'bg-purple-100 text-purple-800' :
                  'bg-orange-100 text-orange-800'
                }`}
              >
                {event.time} - {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
            )}
          </div>
        </div>
      )
    }

    return days
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-lg font-medium text-gray-900 min-w-[150px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {(['month', 'week', 'day'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  viewMode === mode 
                    ? 'bg-white text-purple-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-700">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {renderCalendar()}
        </div>
      </div>

      {/* Today's Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5 text-purple-600" />
            <span>Today's Events</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events
              .filter(event => {
                const eventDate = new Date(event.date)
                const today = new Date()
                return eventDate.toDateString() === today.toDateString()
              })
              .map((event) => (
                <div key={event.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className={`w-3 h-3 rounded-full mt-1 ${
                    event.type === 'meeting' ? 'bg-blue-500' :
                    event.type === 'demo' ? 'bg-green-500' :
                    event.type === 'review' ? 'bg-purple-500' :
                    'bg-orange-500'
                  }`}></div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{event.time} ({event.duration})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees.length} attendees</span>
                      </div>
                      {event.location.includes('Zoom') && (
                        <div className="flex items-center space-x-1">
                          <Video className="w-4 h-4" />
                          <span>Virtual</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            
            {events.filter(event => {
              const eventDate = new Date(event.date)
              const today = new Date()
              return eventDate.toDateString() === today.toDateString()
            }).length === 0 && (
              <div className="text-center py-8">
                <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No events today</h3>
                <p className="text-gray-600 mb-4">You have a free day ahead!</p>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Event
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
