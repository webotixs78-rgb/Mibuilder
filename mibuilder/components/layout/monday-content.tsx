"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Plus, 
  Filter, 
  MoreHorizontal,
  Search,
  Calendar,
  User,
  Clock,
  Star,
  ChevronDown,
  CheckCircle
} from "lucide-react"

const tasks = [
  {
    id: 1,
    title: "Design new landing page",
    description: "Create a modern landing page for the new product launch",
    owner: { name: "Sarah Chen", avatar: "SC" },
    status: "Done",
    statusColor: "bg-green-100 text-green-800",
    dueDate: "2024-03-15",
    priority: "High",
    tags: ["Design", "Marketing"]
  },
  {
    id: 2,
    title: "Review Q1 sales report",
    description: "Analyze and present quarterly sales performance metrics",
    owner: { name: "Mike Johnson", avatar: "MJ" },
    status: "Working on it",
    statusColor: "bg-blue-100 text-blue-800",
    dueDate: "2024-03-20",
    priority: "Medium",
    tags: ["Sales", "Reports"]
  },
  {
    id: 3,
    title: "Update CRM documentation",
    description: "Update user guides and API documentation for v2.0",
    owner: { name: "Emily Davis", avatar: "ED" },
    status: "Stuck",
    statusColor: "bg-red-100 text-red-800",
    dueDate: "2024-03-18",
    priority: "Low",
    tags: ["Documentation"]
  },
  {
    id: 4,
    title: "Customer feedback analysis",
    description: "Compile and analyze customer feedback from last month",
    owner: { name: "Alex Wilson", avatar: "AW" },
    status: "Not Started",
    statusColor: "bg-gray-100 text-gray-800",
    dueDate: "2024-03-25",
    priority: "Medium",
    tags: ["Customer Success"]
  },
]

const completedTasks = [
  {
    id: 5,
    title: "Setup development environment",
    description: "Configure local development environment for new team members",
    owner: { name: "Tom Brown", avatar: "TB" },
    completedDate: "2024-03-10"
  },
  {
    id: 6,
    title: "Security audit completed",
    description: "Annual security assessment and vulnerability scan",
    owner: { name: "Lisa Anderson", avatar: "LA" },
    completedDate: "2024-03-08"
  },
]

export function MondayContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTasks, setSelectedTasks] = useState<number[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showFilterModal, setShowFilterModal] = useState(false)

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectAll = () => {
    if (selectedTasks.length === filteredTasks.length) {
      setSelectedTasks([])
    } else {
      setSelectedTasks(filteredTasks.map(task => task.id))
    }
  }

  const handleSelectTask = (id: number) => {
    setSelectedTasks(prev =>
      prev.includes(id)
        ? prev.filter(taskId => taskId !== id)
        : [...prev, id]
    )
  }

  const handleAddTask = () => {
    setShowAddModal(true)
  }

  const handleFilter = () => {
    setShowFilterModal(true)
  }

  const handleTaskAction = (taskId: number, action: string) => {
    console.log(`Task ${taskId}: ${action}`)
    // Handle task actions like edit, delete, etc.
  }

  return (
    <div className="flex-1 bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">Marketing Team</h1>
            <button className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
              />
            </div>
            
            <Button variant="outline" size="sm" className="flex items-center space-x-2" onClick={handleFilter}>
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </Button>
            
            <Button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700" onClick={handleAddTask}>
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 space-y-6">
        {/* To-Do Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">To-Do</h2>
            <div className="flex items-center space-x-2">
              {selectedTasks.length > 0 && (
                <span className="text-sm text-gray-500">
                  {selectedTasks.length} selected
                </span>
              )}
            </div>
          </div>
          
          {/* Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="w-12 p-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedTasks.length === filteredTasks.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                  </th>
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="w-12 p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedTasks.includes(task.id)}
                        onChange={() => handleSelectTask(task.id)}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                    </td>
                    <td className="p-3">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{task.title}</div>
                        <div className="text-sm text-gray-500">{task.description}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {task.tags.map((tag) => (
                            <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">{task.owner.avatar}</span>
                        </div>
                        <span className="text-sm text-gray-900">{task.owner.name}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${task.statusColor}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2 text-sm text-gray-900">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{task.dueDate}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <button 
                        className="text-gray-400 hover:text-gray-600"
                        onClick={() => handleTaskAction(task.id, 'options')}
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Completed Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Completed</h2>
            <button className="text-sm text-purple-600 hover:text-purple-700">
              Show all
            </button>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completed Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {completedTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{task.title}</div>
                        <div className="text-sm text-gray-500">{task.description}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">{task.owner.avatar}</span>
                        </div>
                        <span className="text-sm text-gray-900">{task.owner.name}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2 text-sm text-gray-900">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{task.completedDate}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Task Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Task</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
                  <input
                    type="text"
                    placeholder="Enter task title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    placeholder="Enter task description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                  />
                </div>
                <div className="flex items-center justify-end space-x-3">
                  <Button variant="outline" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setShowAddModal(false)}>
                    Add Task
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Modal */}
        {showFilterModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Tasks</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option value="">All Status</option>
                    <option value="Done">Done</option>
                    <option value="Working on it">Working on it</option>
                    <option value="Stuck">Stuck</option>
                    <option value="Not Started">Not Started</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option value="">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div className="flex items-center justify-end space-x-3">
                  <Button variant="outline" onClick={() => setShowFilterModal(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setShowFilterModal(false)}>
                    Apply Filter
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
