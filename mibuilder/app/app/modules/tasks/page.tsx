"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Eye,
  Calendar,
  User,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react"

const tasksData = [
  {
    id: 1,
    title: "Follow up with Tech Corp",
    description: "Schedule a follow-up call to discuss the enterprise proposal",
    assignedTo: "John Doe",
    dueDate: "2024-03-20",
    priority: "high",
    status: "Not Started",
    relatedTo: "Enterprise Software Deal",
    created: "2024-03-15"
  },
  {
    id: 2,
    title: "Prepare proposal for Global Tech",
    description: "Create and send the marketing automation proposal",
    assignedTo: "Jane Smith",
    dueDate: "2024-03-22",
    priority: "medium",
    status: "In Progress",
    relatedTo: "Marketing Automation",
    created: "2024-03-14"
  },
  {
    id: 3,
    title: "Review Q3 pipeline",
    description: "Analyze pipeline performance and create quarterly report",
    assignedTo: "John Doe",
    dueDate: "2024-03-25",
    priority: "low",
    status: "Not Started",
    relatedTo: "Pipeline Analysis",
    created: "2024-03-13"
  },
  {
    id: 4,
    title: "Team sync meeting",
    description: "Weekly team meeting to discuss progress and blockers",
    assignedTo: "Jane Smith",
    dueDate: "2024-03-18",
    priority: "medium",
    status: "Completed",
    relatedTo: "Team Management",
    created: "2024-03-12"
  },
  {
    id: 5,
    title: "Update CRM documentation",
    description: "Update internal documentation for new CRM features",
    assignedTo: "Mike Johnson",
    dueDate: "2024-03-28",
    priority: "low",
    status: "In Progress",
    relatedTo: "Documentation",
    created: "2024-03-11"
  },
]

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
}

const statusIcons = {
  "Not Started": <Clock className="w-4 h-4 text-gray-500" />,
  "In Progress": <AlertCircle className="w-4 h-4 text-blue-500" />,
  "Completed": <CheckCircle className="w-4 h-4 text-green-500" />,
  "Cancelled": <AlertCircle className="w-4 h-4 text-red-500" />,
}

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTasks, setSelectedTasks] = useState<number[]>([])

  const filteredTasks = tasksData.filter(task =>
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">Manage your team's tasks and follow-ups</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasksData.length}</div>
            <p className="text-xs text-muted-foreground">+5 this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">20% completion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">40% of total tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          
          {selectedTasks.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedTasks.length} selected
              </span>
              <Button variant="outline" size="sm">Bulk Edit</Button>
              <Button variant="outline" size="sm">Bulk Delete</Button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">Export</Button>
          <Button variant="outline" size="sm">Import</Button>
        </div>
      </div>

      {/* Tasks Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Tasks</CardTitle>
          <CardDescription>
            A list of all tasks including their status, priority, and assignments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedTasks.length === filteredTasks.length}
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                </TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Related To</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedTasks.includes(task.id)}
                      onChange={() => handleSelectTask(task.id)}
                      className="rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span>{task.assignedTo}</span>
                    </div>
                  </TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                      {task.priority}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {statusIcons[task.status as keyof typeof statusIcons]}
                      <span className="text-sm">{task.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>{task.relatedTo}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <Card className="text-center py-12">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first task"}
          </p>
          {!searchTerm && (
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Task
            </Button>
          )}
        </Card>
      )}
    </div>
  )
}
