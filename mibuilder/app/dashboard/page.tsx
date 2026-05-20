"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Plus, BarChart3, Users, Settings, Wrench, Zap, Globe, Award, Rocket, Heart, Briefcase, Building, User, CheckCircle, LogOut, Sparkles } from "lucide-react"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { useAuth } from "@/contexts/AuthContext"
import Link from "next/link"

interface OnboardingData {
  howDidYouHear: string
  businessType: string
  industry: string
  teamSize: string
  primaryUseCase: string
  technicalExperience: string
}

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    workspaces: 0,
    modules: 0,
    records: 0,
    teamMembers: 0
  })

  useEffect(() => {
    // Load onboarding data from localStorage
    const savedData = localStorage.getItem("onboardingData")
    if (savedData) {
      setOnboardingData(JSON.parse(savedData))
    }

    // Load workspace stats from localStorage
    const loadStats = () => {
      const workspaces = JSON.parse(localStorage.getItem("workspaces") || "[]")
      const teamMembers = JSON.parse(localStorage.getItem("teamMembers") || "[]")
      
      // Calculate total modules across all workspaces
      const totalModules = workspaces.reduce((sum: number, w: any) => sum + (w.modules || 0), 0)
      
      // Calculate total records (rows) across all workspaces
      const totalRecords = workspaces.reduce((sum: number, w: any) => sum + (w.records || w.rows?.length || 0), 0)

      setStats({
        workspaces: workspaces.length,
        modules: totalModules,
        records: totalRecords,
        teamMembers: teamMembers.length + 1 // +1 for the current user
      })
    }

    loadStats()
    
    // Set up event listener for storage changes
    const handleStorageChange = () => {
      loadStats()
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    // Also refresh when window gains focus (user returns from another page)
    const handleFocus = () => {
      loadStats()
    }
    
    window.addEventListener('focus', handleFocus)
    setIsLoading(false)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  const getWelcomeMessage = () => {
    if (!onboardingData) return "Welcome to Mibuilder!"
    
    const businessTypeLabels = {
      business_owner: "Business Owner",
      freelancer: "Freelancer",
      self_use: "Personal User",
      student: "Student"
    }

    const businessType = businessTypeLabels[onboardingData.businessType as keyof typeof businessTypeLabels] || "User"
    return `Welcome to Mibuilder, ${businessType}!`
  }

  const getRecommendations = () => {
    if (!onboardingData) return []

    const recommendations = []

    // Based on business type
    if (onboardingData.businessType === "business_owner") {
      recommendations.push({
        title: "Team Collaboration",
        description: "Set up team workspaces and permissions",
        icon: Users,
        priority: "high"
      })
    }

    // Based on primary use case
    if (onboardingData.primaryUseCase === "sales") {
      recommendations.push({
        title: "Sales Pipeline Setup",
        description: "Create your first sales workflow",
        icon: Rocket,
        priority: "high"
      })
    } else if (onboardingData.primaryUseCase === "customer_support") {
      recommendations.push({
        title: "Support Ticket System",
        description: "Build a customer support workflow",
        icon: Heart,
        priority: "high"
      })
    }

    // Based on technical experience
    if (onboardingData.technicalExperience === "beginner") {
      recommendations.push({
        title: "Getting Started Tutorial",
        description: "Learn the basics of Mibuilder",
        icon: Award,
        priority: "medium"
      })
    }

    return recommendations
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

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
        {/* Navigation */}
        <nav className="border-b border-white/10 backdrop-blur-xl bg-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Mibuilder</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-8 h-8 rounded-full border-2 border-white/20"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className="hidden md:block">
                    <p className="text-white text-sm font-medium">{user?.name}</p>
                    <p className="text-purple-200 text-xs">{user?.email}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  className="text-white/80 hover:text-white hover:bg-white/10 border border-white/20 backdrop-blur-sm"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
                <Link href="/workspaces/create">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm">
                    <Plus className="w-4 h-4 mr-2" />
                    New Workspace
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {getWelcomeMessage()}
            </h1>
            <p className="text-xl text-purple-200">
              {onboardingData ? "Here's your personalized dashboard based on your preferences" : "Start building your custom CRM solution"}
            </p>
          </div>

          {/* Onboarding Complete Badge */}
          {onboardingData && (
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20 mb-8">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white">Onboarding Complete!</h3>
                    <p className="text-purple-200">Your profile has been set up successfully</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Link href="/workspaces" className="block group">
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10 hover:bg-white/15 hover:border-purple-400/50 transition-all cursor-pointer h-full">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{stats.workspaces}</div>
                  <p className="text-purple-200">Workspaces</p>
                  <p className="text-purple-400/60 text-xs mt-2">Click to view all</p>
                </CardContent>
              </Card>
            </Link>
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">{stats.modules}</div>
                <p className="text-purple-200">Modules</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">{stats.records}</div>
                <p className="text-purple-200">Records</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">{stats.teamMembers}</div>
                <p className="text-purple-200">Team Members</p>
              </CardContent>
            </Card>
          </div>

          <Link href="/app/ai" className="block mb-12">
            <Card className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-xl border border-purple-400/40 shadow-xl hover:border-purple-300/60 transition-all">
              <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-1">CRM AI Copilot</h2>
                    <p className="text-purple-100 text-sm max-w-xl">
                      Generate boards, fields, and automations from plain language. Open the hub under /app/ai or jump straight into a workspace from there.
                    </p>
                  </div>
                </div>
                <Button className="bg-white text-purple-900 hover:bg-purple-50 shrink-0">
                  Open AI hub
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Recommendations */}
          {getRecommendations().length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Recommended for You</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getRecommendations().map((rec, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/25">
                        <rec.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{rec.title}</h3>
                      <p className="text-purple-200 mb-4">{rec.description}</p>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02]">
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
                    <Plus className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Create Workspace</h3>
                  <p className="text-purple-200 text-sm mb-4">Start a new project</p>
                  <Button 
                    variant="outline" 
                    className="w-full text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl"
                    onClick={() => window.location.href = '/workspaces/create'}
                  >
                    Create
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Invite Team</h3>
                  <p className="text-purple-200 text-sm mb-4">Collaborate with others</p>
                  <Button 
                    variant="outline" 
                    className="w-full text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl"
                    onClick={() => {
                      const email = prompt("Enter team member email:")
                      if (email) {
                        // Save team member to localStorage
                        const teamMembers = JSON.parse(localStorage.getItem("teamMembers") || "[]")
                        teamMembers.push({
                          id: Date.now().toString(),
                          email: email,
                          name: email.split("@")[0],
                          role: "member",
                          invitedAt: new Date().toISOString()
                        })
                        localStorage.setItem("teamMembers", JSON.stringify(teamMembers))
                        alert(`Invitation sent to ${email}!`)
                      }
                    }}
                  >
                    Invite
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/25">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">View Analytics</h3>
                  <p className="text-purple-200 text-sm mb-4">Track your progress</p>
                  <Button 
                    variant="outline" 
                    className="w-full text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl"
                    onClick={() => {
                      // Create and show analytics data
                      const workspaces = JSON.parse(localStorage.getItem("workspaces") || "[]")
                      const teamMembers = JSON.parse(localStorage.getItem("teamMembers") || "[]")
                      const analytics = {
                        totalWorkspaces: workspaces.length,
                        totalTeamMembers: teamMembers.length,
                        totalModules: workspaces.reduce((sum: number, w: any) => sum + (w.modules || 0), 0),
                        activeWorkspaces: workspaces.filter((w: any) => w.status === "active").length,
                        createdAt: new Date().toISOString()
                      }
                      
                      const analyticsMessage = `
📊 Analytics Dashboard

Total Workspaces: ${analytics.totalWorkspaces}
Total Team Members: ${analytics.totalTeamMembers}
Total Modules: ${analytics.totalModules}
Active Workspaces: ${analytics.activeWorkspaces}

Last Updated: ${new Date().toLocaleString()}
                      `.trim()
                      
                      alert(analyticsMessage)
                    }}
                  >
                    View
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/25">
                    <Settings className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Settings</h3>
                  <p className="text-purple-200 text-sm mb-4">Configure your account</p>
                  <Button 
                    variant="outline" 
                    className="w-full text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl"
                    onClick={() => {
                      // Create settings modal/options
                      const settings = {
                        theme: "dark",
                        notifications: "enabled",
                        language: "english",
                        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                      }
                      
                      const settingsMessage = `
⚙️ Settings

Theme: ${settings.theme}
Notifications: ${settings.notifications}
Language: ${settings.language}
Timezone: ${settings.timezone}

Account Type: Premium
Storage Used: 2.3 GB / 10 GB
Member Since: ${new Date().toLocaleDateString()}
                      `.trim()
                      
                      alert(settingsMessage)
                    }}
                  >
                    Configure
                  </Button>
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
