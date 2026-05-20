"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Zap, PlayCircle, Settings, Users, Mail, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function WorkflowsPage() {
  const workflowTypes = [
    {
      name: "Lead to Customer",
      icon: Users,
      description: "Convert leads to customers automatically",
      triggers: ["New Lead Created", "Lead Status Changed"],
      actions: ["Send Welcome Email", "Create Customer Record", "Notify Sales Team"]
    },
    {
      name: "Task Assignment",
      icon: Settings,
      description: "Automatically assign tasks based on rules",
      triggers: ["New Task Created", "Task Priority Changed"],
      actions: ["Assign to Team Member", "Send Notification", "Update Status"]
    },
    {
      name: "Email Notifications",
      icon: Mail,
      description: "Send automated emails based on events",
      triggers: ["Record Created", "Status Updated", "Deadline Approaching"],
      actions: ["Send Email", "Update Contact", "Log Communication"]
    },
    {
      name: "Follow-up Reminders",
      icon: Clock,
      description: "Automated follow-up and reminder system",
      triggers: ["No Activity for 7 Days", "Meeting Scheduled", "Task Due"],
      actions: ["Send Reminder", "Create Follow-up Task", "Notify Manager"]
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
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">Workflows</span>
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
            <h1 className="text-4xl font-bold text-white mb-4">Workflows & Automation</h1>
            <p className="text-xl text-purple-200">
              Automate your business processes with powerful workflow automation
            </p>
          </div>

          {/* Workflow Overview */}
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20 mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">What are Workflows?</h2>
              <p className="text-purple-200 mb-6">
                Workflows are automated processes that trigger actions based on specific events in your CRM. 
                They help you save time, reduce manual work, and ensure consistency in your business operations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Triggers</h4>
                  <p className="text-purple-200 text-sm">
                    Events that start your workflow (e.g., new record created, field updated)
                  </p>
                </div>
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Conditions</h4>
                  <p className="text-purple-200 text-sm">
                    Rules that determine when actions should be executed
                  </p>
                </div>
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Actions</h4>
                  <p className="text-purple-200 text-sm">
                    Tasks that are performed when conditions are met
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Popular Workflows */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Popular Workflow Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workflowTypes.map((workflow, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 shadow-xl shadow-purple-500/10">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25 flex-shrink-0">
                        <workflow.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">{workflow.name}</h3>
                        <p className="text-purple-200 mb-4">{workflow.description}</p>
                        <div className="space-y-3">
                          <div>
                            <p className="text-purple-300 text-sm font-medium mb-1">Triggers:</p>
                            <div className="flex flex-wrap gap-1">
                              {workflow.triggers.map((trigger, idx) => (
                                <span key={idx} className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs text-blue-300">
                                  {trigger}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-purple-300 text-sm font-medium mb-1">Actions:</p>
                            <div className="flex flex-wrap gap-1">
                              {workflow.actions.map((action, idx) => (
                                <span key={idx} className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-xs text-green-300">
                                  {action}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Building Workflows */}
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20 mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Building Your First Workflow</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Choose a Trigger</h3>
                    <p className="text-purple-200">
                      Select the event that will start your workflow
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Set Conditions</h3>
                    <p className="text-purple-200">
                      Define rules that must be met for the workflow to execute
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Add Actions</h3>
                    <p className="text-purple-200">
                      Configure what should happen when the workflow runs
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Test & Activate</h3>
                    <p className="text-purple-200">
                      Test your workflow and activate it for production use
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20 mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Workflow Best Practices</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium">Start Simple</h4>
                      <p className="text-purple-200 text-sm">Begin with basic workflows and gradually add complexity</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium">Test Thoroughly</h4>
                      <p className="text-purple-200 text-sm">Always test workflows before activating them</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium">Monitor Performance</h4>
                      <p className="text-purple-200 text-sm">Track workflow execution and optimize as needed</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium">Avoid Infinite Loops</h4>
                      <p className="text-purple-200 text-sm">Be careful not to create workflows that trigger themselves</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium">Use Clear Names</h4>
                      <p className="text-purple-200 text-sm">Name your workflows descriptively for easy management</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium">Document Logic</h4>
                      <p className="text-purple-200 text-sm">Add descriptions to explain complex workflow logic</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Next Steps</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/docs/automations">
                  <Button variant="outline" className="w-full text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl justify-between">
                    <span>Advanced Automations</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/workspaces/create">
                  <Button variant="outline" className="w-full text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl justify-between">
                    <span>Create Workspace</span>
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
