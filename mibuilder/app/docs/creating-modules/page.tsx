"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Plus, Database, Settings, Zap, Users, BarChart3, FileText, Calendar } from "lucide-react"
import Link from "next/link"

export default function CreatingModulesPage() {
  const moduleTypes = [
    {
      name: "Customer Management",
      icon: Users,
      description: "Track customer information, interactions, and history",
      fields: ["Name", "Email", "Phone", "Company", "Status", "Notes"]
    },
    {
      name: "Lead Tracking",
      icon: Zap,
      description: "Manage sales leads through your pipeline",
      fields: ["Lead Source", "Status", "Value", "Probability", "Follow-up Date"]
    },
    {
      name: "Task Management",
      icon: Calendar,
      description: "Organize and track tasks and assignments",
      fields: ["Title", "Description", "Due Date", "Priority", "Assignee"]
    },
    {
      name: "Inventory",
      icon: Database,
      description: "Manage products, stock levels, and orders",
      fields: ["Product Name", "SKU", "Price", "Stock", "Category"]
    },
    {
      name: "Projects",
      icon: BarChart3,
      description: "Track project progress and milestones",
      fields: ["Project Name", "Status", "Budget", "Timeline", "Team"]
    },
    {
      name: "Documents",
      icon: FileText,
      description: "Store and organize important documents",
      fields: ["Title", "Type", "Category", "Tags", "Upload Date"]
    }
  ]

  return (
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
        {/* Navigation */}
        <nav className="border-b border-white/10 backdrop-blur-xl bg-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center space-x-4">
                <Link href="/docs">
                  <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 border border-white/20 backdrop-blur-sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Docs
                  </Button>
                </Link>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">Creating Modules</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/">
                  <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 border border-white/20 backdrop-blur-sm">
                    Back to App
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Creating Modules</h1>
            <p className="text-xl text-purple-200">
              Learn how to build custom modules for your CRM with our visual builder
            </p>
          </div>

          {/* Module Builder Overview */}
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20 mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Module Builder Overview</h2>
              <p className="text-purple-200 mb-6">
                The Module Builder is a powerful no-code tool that lets you create custom data structures 
                for your CRM without writing any code. Each module can have custom fields, relationships, 
                workflows, and permissions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Custom Fields</h4>
                  <p className="text-purple-200 text-sm">
                    Add text, numbers, dates, dropdowns, and more
                  </p>
                </div>
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Relationships</h4>
                  <p className="text-purple-200 text-sm">
                    Connect modules with one-to-many and many-to-many relationships
                  </p>
                </div>
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Workflows</h4>
                  <p className="text-purple-200 text-sm">
                    Automate processes and create custom business logic
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Module Types */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Popular Module Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {moduleTypes.map((module, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 shadow-xl shadow-purple-500/10">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25 flex-shrink-0">
                        <module.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">{module.name}</h3>
                        <p className="text-purple-200 mb-4">{module.description}</p>
                        <div className="space-y-2">
                          <p className="text-purple-300 text-sm font-medium">Common Fields:</p>
                          <div className="flex flex-wrap gap-2">
                            {module.fields.map((field, idx) => (
                              <span key={idx} className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-300">
                                {field}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Step-by-Step Guide */}
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20 mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Creating Your First Module</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Choose Module Type</h3>
                    <p className="text-purple-200">
                      Start with a template or create a custom module from scratch
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Add Fields</h3>
                    <p className="text-purple-200">
                      Define the data structure with custom fields and validation rules
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Configure Layout</h3>
                    <p className="text-purple-200">
                      Design how your module will appear to users
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Set Permissions</h3>
                    <p className="text-purple-200">
                      Control who can view, create, edit, and delete records
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Test & Deploy</h3>
                    <p className="text-purple-200">
                      Test your module and make it available to your team
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Start */}
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20 mb-8">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Zap className="w-6 h-6 mr-2 text-yellow-400" />
                Quick Start Template
              </h3>
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-6">
                <h4 className="text-white font-medium mb-4">Customer Management Template</h4>
                <p className="text-purple-200 mb-6">
                  Start with our pre-built customer management module and customize it for your needs
                </p>
                <Link href="/workspaces/create">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Module
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Next Steps</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/docs/workflows">
                  <Button variant="outline" className="w-full text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl justify-between">
                    <span>Learn About Workflows</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/docs/automations">
                  <Button variant="outline" className="w-full text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl justify-between">
                    <span>Explore Automations</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
