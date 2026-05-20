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
import { X, Calendar, Users, Target } from "lucide-react"

interface AddTaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const taskTemplates = [
  {
    name: "New Task",
    description: "Create a new task from scratch",
  },
  {
    name: "Meeting Follow-up",
    description: "Task to follow up after meetings",
    template: {
      title: "Meeting Follow-up: [Meeting Name]",
      description: "Follow up on action items from [Meeting Name]",
      dueDate: "tomorrow",
      assignee: "current"
    }
  },
  {
    name: "Bug Report",
    description: "Report and track software bugs",
    template: {
      title: "Bug: [Issue Description]",
      description: "Report bug found in [Component/Feature]",
      dueDate: "3 days",
      priority: "high"
    }
  },
  {
    name: "Review Request",
    description: "Request review of work or documents",
    template: {
      title: "Review: [Document/Feature Name]",
      description: "Please review [Document/Feature] by [Date]",
      dueDate: "2 days",
      assignee: "manager"
    }
  }
]

export function AddTaskModal({ open, onOpenChange }: AddTaskModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee: "",
    dueDate: "",
    priority: "medium",
    status: "Not Started",
    template: ""
  })
  const [selectedTemplate, setSelectedTemplate] = useState("")

  const handleSubmit = () => {
    console.log("Creating task:", formData)
    // TODO: Implement task creation logic
    onOpenChange(false)
    // Reset form
    setFormData({
      title: "",
      description: "",
      assignee: "",
      dueDate: "",
      priority: "medium",
      status: "Not Started",
      template: ""
    })
    setSelectedTemplate("")
  }

  const handleTemplateSelect = (templateName: string) => {
    setSelectedTemplate(templateName)
    const template = taskTemplates.find(t => t.name === templateName)
    if (template && template.template) {
      setFormData({
        ...formData,
        ...template.template
      })
    } else {
      setFormData({
        title: "",
        description: "",
        assignee: "",
        dueDate: "",
        priority: "medium",
        status: "Not Started",
        template: ""
      })
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Task</h2>
        
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Task</h3>
          
          {/* Template Selection */}
          <div className="space-y-2">
            <Label>Quick Start (Optional)</Label>
            <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a template" />
              </SelectTrigger>
              <SelectContent>
                {taskTemplates.map((template) => (
                  <SelectItem key={template.name} value={template.name}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Task Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Task Title *</Label>
              <Input
                id="title"
                placeholder="Enter task title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter task description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assignee">Assign To</Label>
                <Select value={formData.assignee} onValueChange={(value) => setFormData({ ...formData, assignee: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Me</SelectItem>
                    <SelectItem value="sarah">Sarah Chen</SelectItem>
                    <SelectItem value="mike">Mike Johnson</SelectItem>
                    <SelectItem value="emily">Emily Davis</SelectItem>
                    <SelectItem value="alex">Alex Wilson</SelectItem>
                    <SelectItem value="lisa">Lisa Anderson</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
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
                    <SelectItem value="Not Started">Not Started</SelectItem>
                    <SelectItem value="Working on it">Working on it</SelectItem>
                    <SelectItem value="Stuck">Stuck</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700">
              Create Task
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
