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
  Eye,
  FileText,
  ExternalLink,
  BarChart3,
  Settings
} from "lucide-react"

const formsData = [
  {
    id: 1,
    name: "Contact Us",
    description: "General contact form for website visitors",
    module: "Leads",
    fields: 5,
    submissions: 156,
    status: "active",
    lastSubmission: "2 hours ago",
    created: "2024-01-15",
  },
  {
    id: 2,
    name: "Demo Request",
    description: "Form for requesting product demonstrations",
    module: "Leads",
    fields: 8,
    submissions: 89,
    status: "active",
    lastSubmission: "1 day ago",
    created: "2024-01-10",
  },
  {
    id: 3,
    name: "Support Ticket",
    description: "Customer support request form",
    module: "Contacts",
    fields: 6,
    submissions: 234,
    status: "active",
    lastSubmission: "5 minutes ago",
    created: "2024-01-08",
  },
  {
    id: 4,
    name: "Partnership Inquiry",
    description: "Form for business partnership opportunities",
    module: "Companies",
    fields: 10,
    submissions: 34,
    status: "inactive",
    lastSubmission: "1 week ago",
    created: "2024-01-05",
  },
  {
    id: 5,
    name: "Feedback Survey",
    description: "Customer satisfaction survey",
    module: "Contacts",
    fields: 12,
    submissions: 67,
    status: "active",
    lastSubmission: "3 days ago",
    created: "2024-01-03",
  },
]

const statusColors = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  draft: "bg-yellow-100 text-yellow-800",
}

export default function FormsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredForms = formsData.filter(form =>
    form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Forms</h1>
          <p className="text-muted-foreground">Create and manage lead capture forms</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Form
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Forms</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formsData.length}</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">580</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Forms</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">1 inactive</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
            <p className="text-xs text-muted-foreground">+5% improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search forms..."
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

      {/* Forms Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredForms.map((form) => (
          <Card key={form.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1">{form.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {form.description}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[form.status as keyof typeof statusColors]}`}>
                  {form.status}
                </span>
                <span className="text-xs text-muted-foreground">
                  {form.fields} fields
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">{form.submissions}</p>
                  <p className="text-muted-foreground">Submissions</p>
                </div>
                <div>
                  <p className="font-medium">{form.lastSubmission}</p>
                  <p className="text-muted-foreground">Last submission</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <div className="text-xs text-muted-foreground">
                  <p>Connected to {form.module}</p>
                  <p>Created {form.created}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
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
      {filteredForms.length === 0 && (
        <Card className="text-center py-12">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No forms found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? "Try adjusting your search terms" : "Get started by creating your first form"}
          </p>
          {!searchTerm && (
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Form
            </Button>
          )}
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common form management tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="w-6 h-6 mb-2" />
              Create Form
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Copy className="w-6 h-6 mb-2" />
              Duplicate Form
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="w-6 h-6 mb-2" />
              View Analytics
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <ExternalLink className="w-6 h-6 mb-2" />
              Embed Code
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
