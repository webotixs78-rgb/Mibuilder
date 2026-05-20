"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Briefcase, 
  Calendar, 
  Users, 
  Star,
  TrendingUp,
  Clock,
  CheckCircle
} from "lucide-react"

const myTasks = [
  {
    id: 1,
    title: "Complete project proposal",
    project: "Website Redesign",
    dueDate: "2024-03-20",
    status: "In Progress",
    priority: "High"
  },
  {
    id: 2,
    title: "Review design mockups",
    project: "Mobile App",
    dueDate: "2024-03-18",
    status: "Not Started",
    priority: "Medium"
  },
  {
    id: 3,
    title: "Client meeting preparation",
    project: "Q1 Strategy",
    dueDate: "2024-03-22",
    status: "In Progress",
    priority: "High"
  },
]

const projects = [
  { name: "Website Redesign", tasks: 12, completed: 8 },
  { name: "Mobile App", tasks: 24, completed: 15 },
  { name: "Q1 Strategy", tasks: 6, completed: 3 },
]

export default function MyWorkPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Work</h1>
        <p className="text-gray-600">Manage your tasks and projects</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">My Tasks</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <Briefcase className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">18</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">6</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Performance</p>
                <p className="text-2xl font-bold text-gray-900">92%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Card key={project.name}>
              <CardContent className="p-4">
                <h3 className="font-medium text-gray-900 mb-2">{project.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{Math.round((project.completed / project.tasks) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${(project.completed / project.tasks) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{project.completed} completed</span>
                    <span className="text-gray-600">{project.tasks} total</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tasks */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">My Tasks</h2>
        <div className="space-y-3">
          {myTasks.map((task) => (
            <Card key={task.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                    <p className="text-sm text-gray-600">{task.project}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm">
                      <span className="text-gray-500">Due: {task.dueDate}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.priority === 'High' 
                          ? 'bg-red-100 text-red-800'
                          : task.priority === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : task.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
