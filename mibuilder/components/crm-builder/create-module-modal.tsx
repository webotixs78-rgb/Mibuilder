"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Users, 
  Building, 
  Target, 
  FileText, 
  Calendar,
  Package,
  Plus,
  X
} from "lucide-react"

interface CreateModuleModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const moduleTemplates = [
  {
    name: "Leads",
    singularName: "Lead",
    description: "Track and manage potential customers",
    icon: Users,
    fields: [
      { name: "first_name", label: "First Name", type: "text", required: true },
      { name: "last_name", label: "Last Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "phone", required: false },
      { name: "company", label: "Company", type: "text", required: false },
      { name: "source", label: "Lead Source", type: "dropdown", required: false, options: ["Website", "Referral", "Cold Call", "Email", "Social"] },
      { name: "status", label: "Status", type: "status", required: true, options: ["New", "Contacted", "Qualified", "Lost"] },
    ]
  },
  {
    name: "Contacts",
    singularName: "Contact", 
    description: "Manage contact information and relationships",
    icon: Building,
    fields: [
      { name: "first_name", label: "First Name", type: "text", required: true },
      { name: "last_name", label: "Last Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "phone", required: false },
      { name: "title", label: "Job Title", type: "text", required: false },
      { name: "company", label: "Company", type: "relation", required: false },
    ]
  },
  {
    name: "Deals",
    singularName: "Deal",
    description: "Manage sales opportunities and pipelines", 
    icon: Target,
    fields: [
      { name: "deal_name", label: "Deal Name", type: "text", required: true },
      { name: "account", label: "Account", type: "relation", required: true },
      { name: "amount", label: "Deal Amount", type: "currency", required: true },
      { name: "stage", label: "Stage", type: "status", required: true, options: ["Prospecting", "Qualification", "Proposal", "Negotiation", "Closed Won", "Closed Lost"] },
      { name: "probability", label: "Probability", type: "number", required: false },
      { name: "expected_close", label: "Expected Close Date", type: "date", required: false },
    ]
  },
  {
    name: "Tasks",
    singularName: "Task",
    description: "Track action items and follow-ups",
    icon: FileText,
    fields: [
      { name: "title", label: "Task Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: false },
      { name: "assigned_to", label: "Assigned To", type: "user", required: true },
      { name: "due_date", label: "Due Date", type: "date", required: false },
      { name: "priority", label: "Priority", type: "dropdown", required: true, options: ["Low", "Medium", "High"] },
      { name: "status", label: "Status", type: "status", required: true, options: ["Not Started", "In Progress", "Completed", "Cancelled"] },
    ]
  },
]

export function CreateModuleModal({ open, onOpenChange }: CreateModuleModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [customMode, setCustomMode] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    singularName: "",
    description: "",
    icon: "Package",
  })

  const handleTemplateSelect = (templateId: string) => {
    if (templateId === "custom") {
      setCustomMode(true)
      setSelectedTemplate("")
    } else {
      setCustomMode(false)
      setSelectedTemplate(templateId)
      const template = moduleTemplates.find(t => t.name === templateId)
      if (template) {
        setFormData({
          name: template.name,
          singularName: template.singularName,
          description: template.description,
          icon: template.icon.name,
        })
      }
    }
  }

  const handleSubmit = () => {
    // Handle module creation logic here
    console.log("Creating module:", formData)
    onOpenChange(false)
    // Reset form
    setFormData({ name: "", singularName: "", description: "", icon: "Package" })
    setSelectedTemplate("")
    setCustomMode(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Module</DialogTitle>
          <DialogDescription>
            Build a custom CRM module or start from a template
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Template Selection */}
          {!customMode && (
            <div className="space-y-4">
              <Label>Choose a template or create custom</Label>
              <div className="grid gap-3">
                {moduleTemplates.map((template) => (
                  <Card 
                    key={template.name}
                    className={`cursor-pointer transition-colors ${
                      selectedTemplate === template.name 
                        ? "ring-2 ring-primary" 
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => handleTemplateSelect(template.name)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <template.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{template.name}</h3>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {template.fields.length} pre-configured fields
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card 
                  className={`cursor-pointer transition-colors ${
                    customMode 
                      ? "ring-2 ring-primary" 
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => handleTemplateSelect("custom")}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <Plus className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Custom Module</h3>
                        <p className="text-sm text-muted-foreground">Build from scratch</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Custom Module Form */}
          {(customMode || selectedTemplate) && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Module Details</Label>
                {!customMode && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setCustomMode(false)
                      setSelectedTemplate("")
                    }}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Change Template
                  </Button>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Module Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Leads, Contacts, Deals"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="singularName">Singular Name</Label>
                  <Input
                    id="singularName"
                    placeholder="e.g., Lead, Contact, Deal"
                    value={formData.singularName}
                    onChange={(e) => setFormData({ ...formData, singularName: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this module is for..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Package">Package</SelectItem>
                    <SelectItem value="Users">Users</SelectItem>
                    <SelectItem value="Building">Building</SelectItem>
                    <SelectItem value="Target">Target</SelectItem>
                    <SelectItem value="FileText">FileText</SelectItem>
                    <SelectItem value="Calendar">Calendar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!formData.name || !formData.singularName}
            >
              Create Module
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
