"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Plus, Users, Settings, Database, Globe, CheckCircle, Zap } from "lucide-react"
import Link from "next/link"

export default function FirstWorkspacePage() {
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
                  <span className="text-xl font-bold text-white">First Workspace</span>
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
            <h1 className="text-4xl font-bold text-white mb-4">Creating Your First Workspace</h1>
            <p className="text-xl text-purple-200">
              Learn how to create and configure your first CRM workspace in Mibuilder
            </p>
          </div>

          {/* Overview */}
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20 mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">What is a Workspace?</h2>
              <p className="text-purple-200 mb-6">
                A workspace is your dedicated environment for building and managing CRM solutions. 
                Each workspace contains its own modules, data, workflows, and team settings.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start space-x-3">
                  <Database className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium">Modules & Data</h3>
                    <p className="text-purple-200 text-sm">Custom modules and your business data</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium">Team Collaboration</h3>
                    <p className="text-purple-200 text-sm">Invite team members and set permissions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Settings className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium">Custom Settings</h3>
                    <p className="text-purple-200 text-sm">Configure your workspace preferences</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step-by-Step Guide */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-white">Step-by-Step Guide</h2>
            
            {/* Step 1 */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-white">Navigate to Workspaces</h3>
                </div>
                <p className="text-purple-200 mb-4">
                  From your dashboard, click the "Workspaces" tab in the navigation menu.
                </p>
                <div className="bg-black/30 rounded-lg p-4">
                  <p className="text-purple-200 text-sm">
                    You can also access workspaces directly from the main menu or by using the shortcut Ctrl+W.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-white">Create New Workspace</h3>
                </div>
                <p className="text-purple-200 mb-4">
                  Click the "Create Workspace" button to start the setup process.
                </p>
                <div className="bg-black/30 rounded-lg p-4">
                  <p className="text-purple-200 text-sm">
                    The button is prominently displayed at the top right of the workspaces page.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-white">Configure Basic Settings</h3>
                </div>
                <p className="text-purple-200 mb-4">
                  Fill in your workspace details:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white">Workspace Name (e.g., "Sales CRM", "Customer Support")</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white">Description (optional but recommended)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white">Industry Type (helps with templates)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white">Workspace Color Theme</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    4
                  </div>
                  <h3 className="text-xl font-semibold text-white">Choose Initial Modules</h3>
                </div>
                <p className="text-purple-200 mb-4">
                  Select from pre-built modules or start from scratch:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Pre-built Modules</h4>
                    <ul className="text-purple-200 text-sm space-y-1">
                      <li>• Customer Management</li>
                      <li>• Sales Pipeline</li>
                      <li>• Task Management</li>
                      <li>• Inventory Tracking</li>
                    </ul>
                  </div>
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Custom Builder</h4>
                    <p className="text-purple-200 text-sm">
                      Create your own modules using our visual builder
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 5 */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    5
                  </div>
                  <h3 className="text-xl font-semibold text-white">Invite Team Members</h3>
                </div>
                <p className="text-purple-200 mb-4">
                  Add team members to collaborate in your workspace:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white">Enter email addresses of team members</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white">Assign roles (Admin, Editor, Viewer)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white">Set permissions for each role</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Start */}
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20 mt-8">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Zap className="w-6 h-6 mr-2 text-yellow-400" />
                Quick Start Template
              </h3>
              <p className="text-purple-200 mb-6">
                Want to get started immediately? Use our quick start template:
              </p>
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-6">
                <h4 className="text-white font-medium mb-4">Small Business CRM Template</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h5 className="text-purple-200 font-medium mb-2">Includes:</h5>
                    <ul className="text-purple-300 text-sm space-y-1">
                      <li>• Customer Database</li>
                      <li>• Lead Management</li>
                      <li>• Task Tracking</li>
                      <li>• Basic Reports</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-purple-200 font-medium mb-2">Perfect for:</h5>
                    <ul className="text-purple-300 text-sm space-y-1">
                      <li>• Small businesses</li>
                      <li>• Startups</li>
                      <li>• Freelancers</li>
                      <li>• Service providers</li>
                    </ul>
                  </div>
                </div>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm">
                    Use This Template
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20 mt-8">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Next Steps</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/docs/creating-modules">
                  <Button variant="outline" className="w-full text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl justify-between">
                    <span>Create Custom Modules</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/docs/workflows">
                  <Button variant="outline" className="w-full text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl justify-between">
                    <span>Set Up Workflows</span>
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
