"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Plus, Settings, Users, Database, Zap, Globe, Shield, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"
import { ProtectedRoute } from "@/components/ProtectedRoute"

export default function CreateWorkspacePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    industry: "",
    teamSize: "",
    template: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Create workspace object with new multi-board structure
    const workspaceId = Date.now().toString()
    const newWorkspace = {
      id: workspaceId,
      name: formData.name,
      description: formData.description,
      industry: formData.industry,
      teamSize: formData.teamSize,
      template: formData.template,
      boards: [
        {
          id: `board_${Date.now()}`,
          name: formData.template === "sales" ? "Leads" : formData.template === "marketing" ? "Campaigns" : formData.template === "support" ? "Tickets" : formData.template === "project" ? "Tasks" : formData.template === "ecommerce" ? "Products" : "Main Board",
          icon: "📋",
          color: "#8B5CF6",
          columns: [
            {
              id: "col_name",
              name: "Name",
              type: {
                id: "text",
                name: "Text Input",
                type: "text",
                category: "basic",
                icon: "T",
                description: "Single line text input"
              },
              width: 200,
              visible: true,
              frozen: false,
              order: 0,
              settings: {
                placeholder: "Enter name...",
                maxLength: 255,
                required: false
              }
            },
            {
              id: "col_status",
              name: "Status",
              type: {
                id: "status",
                name: "Status",
                type: "status",
                category: "automation",
                icon: "📊",
                description: "Status workflow"
              },
              width: 150,
              visible: true,
              frozen: false,
              order: 1,
              settings: {
                options: ["New", "In Progress", "Completed", "On Hold"],
                colorLabels: true
              }
            },
            {
              id: "col_priority",
              name: "Priority",
              type: {
                id: "priority",
                name: "Priority",
                type: "priority",
                category: "automation",
                icon: "🔥",
                description: "Priority levels"
              },
              width: 120,
              visible: true,
              frozen: false,
              order: 2,
              settings: {
                options: ["Low", "Medium", "High", "Critical"],
                colorLabels: true
              }
            },
            {
              id: "col_date",
              name: "Created Date",
              type: {
                id: "date",
                name: "Date",
                type: "date",
                category: "datetime",
                icon: "📅",
                description: "Date picker"
              },
              width: 150,
              visible: true,
              frozen: false,
              order: 3,
              settings: {
                format: "MM/DD/YYYY",
                defaultToday: true
              }
            }
          ],
          rows: [],
          automations: [],
          relations: [],
          views: [],
          settings: {
            defaultView: "table",
            autoSave: true,
            pageSize: 50
          },
          order: 0,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ],
      settings: {
        viewMode: "table",
        frozenColumns: 0,
        pageSize: 25,
        autoSave: true
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    // Get existing workspaces or create empty array
    const existingWorkspaces = JSON.parse(localStorage.getItem("workspaces") || "[]")
    existingWorkspaces.push(newWorkspace)
    localStorage.setItem("workspaces", JSON.stringify(existingWorkspaces))
    
    // Save workspace data separately for the builder
    localStorage.setItem(`workspace_data_${workspaceId}`, JSON.stringify(newWorkspace))
    
    // Redirect to workspace detail page
    setTimeout(() => {
      setIsLoading(false)
      router.push(`/workspaces/${workspaceId}`)
    }, 1000)
  }

  const templates = [
    { id: "sales", name: "Sales CRM", icon: <Users className="w-5 h-5" />, description: "Manage leads, contacts, and sales pipeline" },
    { id: "marketing", name: "Marketing Hub", icon: <Zap className="w-5 h-5" />, description: "Campaign management and analytics" },
    { id: "support", name: "Support Desk", icon: <Shield className="w-5 h-5" />, description: "Customer support and ticketing" },
    { id: "project", name: "Project Manager", icon: <BarChart3 className="w-5 h-5" />, description: "Task tracking and collaboration" },
    { id: "ecommerce", name: "E-commerce", icon: <Globe className="w-5 h-5" />, description: "Product and order management" },
    { id: "custom", name: "Custom", icon: <Settings className="w-5 h-5" />, description: "Build from scratch" }
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative">
        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-purple-600/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-radial from-pink-600/20 via-transparent to-transparent" style={{ backgroundPosition: '70% 30%' }} />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-indigo-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="border-b border-white/10 backdrop-blur-xl bg-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center">
                <Button
                  variant="ghost"
                  onClick={() => router.back()}
                  className="text-purple-200 hover:text-purple-100"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Workspaces
                </Button>
                <div className="ml-auto flex items-center space-x-4">
                  <h1 className="text-xl font-semibold text-white">Create New Workspace</h1>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Form */}
              <div className="lg:col-span-2">
                <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-white">Workspace Details</CardTitle>
                    <CardDescription className="text-purple-200">
                      Configure your new workspace settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-purple-200 mb-2">
                          Workspace Name
                        </label>
                        <Input
                          placeholder="Enter workspace name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-purple-200 mb-2">
                          Description
                        </label>
                        <textarea
                          placeholder="Describe your workspace purpose"
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          className="w-full min-h-[100px] px-3 py-2 bg-white/5 border-white/20 rounded-lg text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-purple-200 mb-2">
                            Industry
                          </label>
                          <select
                            value={formData.industry}
                            onChange={(e) => setFormData({...formData, industry: e.target.value})}
                            className="w-full appearance-none bg-purple-800/90 border-white/30 rounded-lg px-4 py-3 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400/50 hover:bg-purple-700/90"
                            required
                          >
                            <option value="">Select industry</option>
                            <option value="technology">Technology</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="finance">Finance</option>
                            <option value="retail">Retail</option>
                            <option value="education">Education</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-purple-200 mb-2">
                            Team Size
                          </label>
                          <select
                            value={formData.teamSize}
                            onChange={(e) => setFormData({...formData, teamSize: e.target.value})}
                            className="w-full appearance-none bg-purple-800/90 border-white/30 rounded-lg px-4 py-3 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400/50 hover:bg-purple-700/90"
                            required
                          >
                            <option value="">Select team size</option>
                            <option value="1-10">1-10</option>
                            <option value="11-50">11-50</option>
                            <option value="51-200">51-200</option>
                            <option value="201+">201+</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-4">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => router.push("/dashboard")}
                          className="text-purple-200 hover:text-purple-100"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
                        >
                          {isLoading ? "Creating..." : "Create Workspace"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Templates */}
              <div>
                <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-white">Choose Template</CardTitle>
                    <CardDescription className="text-purple-200">
                      Start with a pre-built template
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        onClick={() => setFormData({...formData, template: template.id})}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                          formData.template === template.id
                            ? "border-purple-500 bg-purple-500/20"
                            : "border-white/20 bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 text-purple-200">
                            {template.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-white">{template.name}</h3>
                            <p className="text-sm text-purple-200 mt-1">{template.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
