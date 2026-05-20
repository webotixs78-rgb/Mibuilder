"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreateModuleModal } from "@/components/crm-builder/create-module-modal"
import { 
  Database, 
  Plus, 
  Search, 
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Eye,
  Users,
  Building,
  Target,
  FileText,
  Calendar
} from "lucide-react"

const modules = [
  {
    id: 1,
    name: "Leads",
    singularName: "Lead",
    description: "Track and manage potential customers",
    icon: Users,
    color: "blue",
    records: 24,
    fields: 12,
    createdBy: "John Doe",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Contacts", 
    singularName: "Contact",
    description: "Manage contact information and relationships",
    icon: Building,
    color: "green",
    records: 156,
    fields: 18,
    createdBy: "John Doe", 
    createdAt: "2024-01-10",
  },
  {
    id: 3,
    name: "Companies",
    singularName: "Company", 
    description: "Track business accounts and organizations",
    icon: Building,
    color: "purple",
    records: 42,
    fields: 15,
    createdBy: "Jane Smith",
    createdAt: "2024-01-08",
  },
  {
    id: 4,
    name: "Deals",
    singularName: "Deal",
    description: "Manage sales opportunities and pipelines",
    icon: Target,
    color: "orange",
    records: 18,
    fields: 20,
    createdBy: "John Doe",
    createdAt: "2024-01-05",
  },
  {
    id: 5,
    name: "Tasks",
    singularName: "Task",
    description: "Track action items and follow-ups",
    icon: FileText,
    color: "red",
    records: 67,
    fields: 8,
    createdBy: "Jane Smith",
    createdAt: "2024-01-03",
  },
  {
    id: 6,
    name: "Meetings",
    singularName: "Meeting",
    description: "Schedule and track customer meetings",
    icon: Calendar,
    color: "indigo",
    records: 34,
    fields: 10,
    createdBy: "John Doe",
    createdAt: "2024-01-01",
  },
]

export default function ModulesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const filteredModules = modules.filter(module =>
    module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Modules</h1>
          <p className="text-muted-foreground">Create and manage your CRM modules</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Module
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search modules..."
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

      {/* Modules Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredModules.map((module) => (
          <Card key={module.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-${module.color}-100 rounded-lg flex items-center justify-center`}>
                    <module.icon className={`w-5 h-5 text-${module.color}-600`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                    <CardDescription>{module.singularName}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{module.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium">{module.records}</p>
                    <p className="text-muted-foreground">Records</p>
                  </div>
                  <div>
                    <p className="font-medium">{module.fields}</p>
                    <p className="text-muted-foreground">Fields</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <div className="text-xs text-muted-foreground">
                  <p>Created by {module.createdBy}</p>
                  <p>{module.createdAt}</p>
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
      {filteredModules.length === 0 && (
        <Card className="text-center py-12">
          <Database className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No modules found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? "Try adjusting your search terms" : "Get started by creating your first module"}
          </p>
          {!searchTerm && (
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Module
            </Button>
          )}
        </Card>
      )}

      {/* Create Module Modal */}
      <CreateModuleModal 
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  )
}
