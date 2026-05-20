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
import { X, Mail, Phone, Users, Shield } from "lucide-react"

interface AddTeamMemberModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const roles = [
  { value: "admin", label: "Admin" },
  { value: "member", label: "Member" },
  { value: "viewer", label: "Viewer" },
]

const departments = [
  { value: "engineering", label: "Engineering" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "support", label: "Customer Support" },
  { value: "hr", label: "Human Resources" },
  { value: "finance", label: "Finance" },
]

export function AddTeamMemberModal({ open, onOpenChange }: AddTeamMemberModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "member",
    department: "engineering",
    bio: ""
  })

  const handleSubmit = () => {
    console.log("Adding team member:", formData)
    // TODO: Implement team member creation logic
    onOpenChange(false)
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "member",
      department: "engineering",
      bio: ""
    })
  }

  const handleEmailChange = (email: string) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      // Show error message
      return
    }
    setFormData({ ...formData, email })
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Team Member</h2>
        <p className="text-gray-600 mb-4">Add a new team member to your workspace</p>
        
        <div className="space-y-6">
          {/* Team Member Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.value} value={dept.value}>
                      {dept.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full"
                rows={3}
              />
            </div>
          </div>

          {/* Permissions Preview */}
          <div className="border-t pt-4">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Permissions Preview</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Can:</span>
                  <span className="text-gray-900">
                    {formData.role === "admin" 
                      ? "Manage all settings, invite members, billing" 
                      : formData.role === "member" 
                      ? "View all content, edit assigned items" 
                      : "View assigned items only"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Cannot:</span>
                  <span className="text-gray-900">
                    {formData.role === "admin" 
                      ? "None" 
                      : formData.role === "member" 
                      ? "Manage settings, invite members, billing"
                      : "Edit unassigned items, invite members, billing"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700">
              Add Team Member
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
