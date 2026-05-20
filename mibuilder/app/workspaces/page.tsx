"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Search, Users, Database, Settings, MoreVertical, Eye, Edit, Trash2, ArrowRight, Wrench, Zap, Globe, Shield, BarChart3, Sparkles } from "lucide-react"
import Link from "next/link"

interface Workspace {
  id: string
  name: string
  description: string
  modules: number
  users: number
  lastActivity: string
  status: "active" | "inactive"
  industry: string
}

export default function WorkspacesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])

  useEffect(() => {
    // Load workspaces from localStorage
    const savedWorkspaces = JSON.parse(localStorage.getItem("workspaces") || "[]")
    
    // If no workspaces exist, create default ones
    if (savedWorkspaces.length === 0) {
      const defaultWorkspaces: Workspace[] = [
        {
          id: "1",
          name: "Sales CRM",
          description: "Customer relationship management for sales team",
          modules: 8,
          users: 12,
          lastActivity: "2 hours ago",
          status: "active",
          industry: "Sales"
        },
        {
          id: "2",
          name: "Customer Support",
          description: "Help desk and ticket management system",
          modules: 5,
          users: 8,
          lastActivity: "1 day ago",
          status: "active",
          industry: "Support"
        },
        {
          id: "3",
          name: "Project Management",
          description: "Internal project tracking and collaboration",
          modules: 6,
          users: 15,
          lastActivity: "3 days ago",
          status: "active",
          industry: "Operations"
        },
        {
          id: "4",
          name: "Inventory System",
          description: "Stock management and order processing",
          modules: 4,
          users: 6,
          lastActivity: "1 week ago",
          status: "inactive",
          industry: "Retail"
        }
      ]
      localStorage.setItem("workspaces", JSON.stringify(defaultWorkspaces))
      setWorkspaces(defaultWorkspaces)
    } else {
      setWorkspaces(savedWorkspaces)
    }
  }, [])

  const filteredWorkspaces = workspaces.filter(workspace =>
    workspace.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workspace.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-500/20 border-green-500/30 text-green-300" : "bg-gray-500/20 border-gray-500/30 text-gray-300"
  }

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
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Workspaces</span>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 border border-white/20 backdrop-blur-sm">
                    Back to Dashboard
                  </Button>
                </Link>
                <Link href="/workspaces/create">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Workspace
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Your Workspaces</h1>
            <p className="text-purple-200">
              Manage your CRM workspaces and collaborate with your team
            </p>
          </div>

          {/* Search and Stats */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search workspaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:border-purple-400 focus:ring-purple-400/20 backdrop-blur-sm"
              />
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{workspaces.length}</div>
                <div className="text-purple-200 text-sm">Total Workspaces</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{workspaces.filter(w => w.status === "active").length}</div>
                <div className="text-purple-200 text-sm">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{workspaces.reduce((sum, w) => sum + w.users, 0)}</div>
                <div className="text-purple-200 text-sm">Total Users</div>
              </div>
            </div>
          </div>

          {/* Workspaces Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkspaces.map((workspace) => (
              <Card key={workspace.id} className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 shadow-xl shadow-purple-500/10">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{workspace.name}</h3>
                      <p className="text-purple-200 text-sm mb-4">{workspace.description}</p>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${getStatusColor(workspace.status)}`}>
                        {workspace.status}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-white">{workspace.modules}</div>
                      <div className="text-purple-200 text-xs">Modules</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-white">{workspace.users}</div>
                      <div className="text-purple-200 text-xs">Users</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-white">{workspace.industry}</div>
                      <div className="text-purple-200 text-xs">Industry</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-purple-200 text-sm">Last activity: {workspace.lastActivity}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/workspaces/${workspace.id}`}>
                      <Button variant="outline" size="sm" className="flex-1 text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </Link>
                    <Link href={`/workspaces/${workspace.id}?ai=1`}>
                      <Button variant="outline" size="sm" className="text-white border-2 border-purple-400/50 hover:bg-purple-500/20 backdrop-blur-xl">
                        <Sparkles className="w-4 h-4 mr-2" />
                        AI
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredWorkspaces.length === 0 && (
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No workspaces found</h3>
                <p className="text-purple-200 mb-6">
                  {searchQuery ? "Try adjusting your search terms" : "Create your first workspace to get started"}
                </p>
                {!searchQuery && (
                  <Link href="/workspaces/create">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Workspace
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20 mt-8">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Link href="/workspaces/create">
                  <Button variant="outline" className="w-full text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl justify-between">
                    <span className="flex items-center">
                      <Plus className="w-4 h-4 mr-2" />
                      New Workspace
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/templates">
                  <Button variant="outline" className="w-full text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl justify-between">
                    <span className="flex items-center">
                      <Wrench className="w-4 h-4 mr-2" />
                      Browse Templates
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button variant="outline" className="w-full text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl justify-between">
                    <span className="flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Documentation
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/help">
                  <Button variant="outline" className="w-full text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl justify-between">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Get Help
                    </span>
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
