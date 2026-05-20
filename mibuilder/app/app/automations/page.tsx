"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Plus, 
  Search, 
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Play,
  Pause,
  Zap,
  GitBranch,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react"

const automationsData = [
  {
    id: 1,
    name: "Welcome Email Sequence",
    description: "Send welcome emails to new leads automatically",
    trigger: "When lead is created",
    actions: 3,
    status: "active",
    lastRun: "2 hours ago",
    runCount: 156,
    createdBy: "John Doe",
    created: "2024-01-15",
  },
  {
    id: 2,
    name: "Deal Stage Notifications",
    description: "Notify team when deals move to negotiation stage",
    trigger: "When deal stage changes",
    actions: 2,
    status: "active",
    lastRun: "1 day ago",
    runCount: 89,
    createdBy: "Jane Smith",
    created: "2024-01-10",
  },
  {
    id: 3,
    name: "Task Assignment",
    description: "Assign follow-up tasks to team members",
    trigger: "When lead status changes",
    actions: 1,
    status: "paused",
    lastRun: "3 days ago",
    runCount: 234,
    createdBy: "John Doe",
    created: "2024-01-08",
  },
  {
    id: 4,
    name: "Monthly Report",
    description: "Generate and send monthly performance reports",
    trigger: "Scheduled (Monthly)",
    actions: 4,
    status: "active",
    lastRun: "1 week ago",
    runCount: 12,
    createdBy: "Jane Smith",
    created: "2024-01-05",
  },
  {
    id: 5,
    name: "Lead Scoring",
    description: "Calculate and update lead scores based on activity",
    trigger: "When lead is updated",
    actions: 2,
    status: "active",
    lastRun: "5 minutes ago",
    runCount: 567,
    createdBy: "John Doe",
    created: "2024-01-03",
  },
]

const statusColors = {
  active: "bg-green-100 text-green-800",
  paused: "bg-yellow-100 text-yellow-800",
  inactive: "bg-gray-100 text-gray-800",
}

const statusIcons = {
  active: <CheckCircle className="w-4 h-4" />,
  paused: <Pause className="w-4 h-4" />,
  inactive: <AlertCircle className="w-4 h-4" />,
}

export default function AutomationsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAutomations = automationsData.filter(automation =>
    automation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    automation.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Automations</h1>
          <p className="text-muted-foreground">Build workflows to save time and reduce errors</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Automation
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Automations</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">1 paused</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Runs</CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,058</div>
            <p className="text-xs text-muted-foreground">+156 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">+2% improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42h</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search automations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          Filter
        </Button>
        <Button variant="outline">
          Sort
        </Button>
      </div>

      {/* Automations List */}
      <div className="space-y-4">
        {filteredAutomations.map((automation) => (
          <Card key={automation.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <CardTitle className="text-lg">{automation.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[automation.status as keyof typeof statusColors]}`}>
                        {statusIcons[automation.status as keyof typeof statusIcons]}
                        <span className="ml-1">{automation.status}</span>
                      </span>
                    </div>
                  </div>
                  <CardDescription>{automation.description}</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    {automation.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Trigger</p>
                  <p className="text-sm text-muted-foreground">{automation.trigger}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Actions</p>
                  <p className="text-sm text-muted-foreground">{automation.actions} actions</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Performance</p>
                  <p className="text-sm text-muted-foreground">{automation.runCount} runs</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <div className="text-xs text-muted-foreground">
                  <p>Last run: {automation.lastRun}</p>
                  <p>Created by {automation.createdBy} on {automation.created}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm">
                    <Play className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredAutomations.length === 0 && (
        <Card className="text-center py-12">
          <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No automations found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? "Try adjusting your search terms" : "Get started by creating your first automation"}
          </p>
          {!searchTerm && (
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Automation
            </Button>
          )}
        </Card>
      )}

      {/* Quick Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Automation Templates</CardTitle>
          <CardDescription>
            Quick-start templates for common automation workflows
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Lead Nurturing</h4>
                    <p className="text-sm text-muted-foreground">Welcome sequence for new leads</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Use Template
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <GitBranch className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Deal Management</h4>
                    <p className="text-sm text-muted-foreground">Automated deal stage updates</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Use Template
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Task Management</h4>
                    <p className="text-sm text-muted-foreground">Auto-assign follow-up tasks</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Use Template
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
