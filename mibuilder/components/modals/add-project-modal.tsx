"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
// import { 
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { X, Calendar, Users, Target, Folder } from "lucide-react"

interface AddProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const projectTemplates = [
  {
    name: "New Project",
    description: "Create a project from scratch",
  },
  {
    name: "Marketing Campaign",
    description: "Marketing campaign project template",
    template: {
      name: "Q2 Marketing Campaign",
      description: "Comprehensive marketing campaign for Q2",
      startDate: "2024-04-01",
      endDate: "2024-06-30",
      team: ["sarah", "mike", "emily"]
    }
  },
  {
    name: "Product Development",
    description: "Software development project template",
    template: {
      name: "New Feature Release",
      description: "Develop and release new product features",
      startDate: "2024-04-01",
      endDate: "2024-05-15",
      team: ["alex", "lisa", "tom"]
    }
  },
  {
    name: "Website Redesign",
    description: "Website redesign project template",
    template: {
      name: "Company Website Redesign",
      description: "Complete website redesign and launch",
      startDate: "2024-03-15",
      endDate: "2024-05-01",
      team: ["sarah", "mike", "emily", "alex"]
    }
  }
]

export function AddProjectModal({ open, onOpenChange }: AddProjectModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    team: [] as string[],
    status: "Planning",
    template: ""
  })
  const [selectedTemplate, setSelectedTemplate] = useState("")

  const handleSubmit = () => {
    console.log("Creating project:", formData)
    // TODO: Implement project creation logic
    onOpenChange(false)
    // Reset form
    setFormData({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      team: [] as string[],
      status: "Planning",
      template: ""
    })
    setSelectedTemplate("")
  }

  const handleTemplateSelect = (templateName: string) => {
    setSelectedTemplate(templateName)
    const template = projectTemplates.find(t => t.name === templateName)
    if (template && template.template) {
      setFormData({
        ...formData,
        ...template.template,
        team: template.template.team || []
      })
    } else {
      setFormData({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        team: [],
        status: "Planning",
        template: ""
      })
    }
  }

  const teamMembers = [
    { id: "sarah", name: "Sarah Chen" },
    { id: "mike", name: "Mike Johnson" },
    { id: "emily", name: "Emily Davis" },
    { id: "alex", name: "Alex Wilson" },
    { id: "lisa", name: "Lisa Anderson" },
    { id: "tom", name: "Tom Brown" }
  ]

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Project</h2>
        <p className="text-gray-600 mb-4">Create a new project or use a template to get started quickly</p>
        
        <div className="space-y-6">
          {/* Template Selection */}
          <div className="space-y-2">
            <Label>Quick Start (Optional)</Label>
            <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a template" />
              </SelectTrigger>
              <SelectContent>
                {projectTemplates.map((template) => (
                  <SelectItem key={template.name} value={template.name}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                placeholder="Enter project name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter project description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="team">Team Members</Label>
              <Select 
                value={formData.team.join(",")} 
                onValueChange={(value) => setFormData({ ...formData, team: value.split(",").filter(Boolean) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select team members" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700">
              Create Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
