"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Bell, 
  Check, 
  X, 
  Archive,
  Star,
  Clock,
  Users,
  Target,
  MessageSquare,
  AlertCircle
} from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "mention",
    title: "Sarah Chen mentioned you",
    description: "in 'Marketing Campaign Planning'",
    time: "2 minutes ago",
    read: false,
    priority: "normal",
    icon: MessageSquare,
    color: "blue"
  },
  {
    id: 2,
    type: "task_assigned",
    title: "New task assigned",
    description: "Design new landing page - Due tomorrow",
    time: "15 minutes ago",
    read: false,
    priority: "high",
    icon: Target,
    color: "red"
  },
  {
    id: 3,
    type: "comment",
    title: "Mike Johnson commented",
    description: "on 'Q1 Sales Report'",
    time: "1 hour ago",
    read: false,
    priority: "normal",
    icon: MessageSquare,
    color: "blue"
  },
  {
    id: 4,
    type: "deadline",
    title: "Deadline approaching",
    description: "Product Launch Roadmap - Due in 2 days",
    time: "3 hours ago",
    read: true,
    priority: "high",
    icon: AlertCircle,
    color: "orange"
  },
  {
    id: 5,
    type: "team_invitation",
    title: "You've been invited to a team",
    description: "Join 'Product Development Team'",
    time: "1 day ago",
    read: true,
    priority: "normal",
    icon: Users,
    color: "green"
  }
]

export default function InboxPage() {
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([])
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read
    if (filter === 'read') return notification.read
    return true
  })

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([])
    } else {
      setSelectedNotifications(filteredNotifications.map(n => n.id))
    }
  }

  const handleSelectNotification = (id: number) => {
    setSelectedNotifications(prev =>
      prev.includes(id)
        ? prev.filter(nId => nId !== id)
        : [...prev, id]
    )
  }

  const handleMarkAsRead = (id: number) => {
    console.log(`Mark notification ${id} as read`)
  }

  const handleArchive = (id: number) => {
    console.log(`Archive notification ${id}`)
  }

  const handleStar = (id: number) => {
    console.log(`Star notification ${id}`)
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {(['all', 'unread', 'read'] as const).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  filter === filterType 
                    ? 'bg-white text-purple-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                {filterType === 'unread' && unreadCount > 0 && (
                  <span className="ml-1 text-xs">({unreadCount})</span>
                )}
              </button>
            ))}
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Check className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {filteredNotifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`hover:shadow-md transition-shadow ${
              !notification.read ? 'border-l-4 border-l-blue-500' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  checked={selectedNotifications.includes(notification.id)}
                  onChange={() => handleSelectNotification(notification.id)}
                  className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  notification.color === 'blue' ? 'bg-blue-100' :
                  notification.color === 'red' ? 'bg-red-100' :
                  notification.color === 'orange' ? 'bg-orange-100' :
                  notification.color === 'green' ? 'bg-green-100' :
                  'bg-gray-100'
                }`}>
                  <notification.icon className={`w-5 h-5 ${
                    notification.color === 'blue' ? 'text-blue-600' :
                    notification.color === 'red' ? 'text-red-600' :
                    notification.color === 'orange' ? 'text-orange-600' :
                    notification.color === 'green' ? 'text-green-600' :
                    'text-gray-600'
                  }`} />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`font-medium text-gray-900 ${
                        !notification.read ? 'font-semibold' : ''
                      }`}>
                        {notification.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                      <p className="text-xs text-gray-500 mt-2 flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{notification.time}</span>
                        {notification.priority === 'high' && (
                          <span className="text-red-500 font-medium">High Priority</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {!notification.read && (
                    <button 
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="text-blue-500 hover:text-blue-600"
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button 
                    onClick={() => handleStar(notification.id)}
                    className="text-gray-400 hover:text-yellow-500"
                    title="Star"
                  >
                    <Star className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleArchive(notification.id)}
                    className="text-gray-400 hover:text-gray-600"
                    title="Archive"
                  >
                    <Archive className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredNotifications.length === 0 && (
          <Card className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {filter === 'unread' ? 'No unread notifications' : 
               filter === 'read' ? 'No read notifications' : 
               'No notifications'}
            </h3>
            <p className="text-gray-600 mb-4">
              {filter === 'unread' ? 'All caught up! Great job!' : 
               filter === 'read' ? 'No read notifications yet' : 
               'Your notifications will appear here'}
            </p>
            {filter !== 'all' && (
              <Button variant="outline" onClick={() => setFilter('all')}>
                View All Notifications
              </Button>
            )}
          </Card>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedNotifications.length > 0 && (
        <Card className="sticky bottom-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {selectedNotifications.length} selected
              </span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Check className="w-4 h-4 mr-2" />
                  Mark Read
                </Button>
                <Button variant="outline" size="sm">
                  <Archive className="w-4 h-4 mr-2" />
                  Archive
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <X className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
