"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Plus, BarChart3, Users, Settings, Wrench, Zap, Globe, Award, Rocket, Heart, Briefcase, Building, User, CheckCircle } from "lucide-react"

interface OnboardingData {
  howDidYouHear: string
  businessType: string
  industry: string
  teamSize: string
  primaryUseCase: string
  technicalExperience: string
}

export default function DashboardPage() {
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load onboarding data from localStorage
    const savedData = localStorage.getItem("onboardingData")
    if (savedData) {
      setOnboardingData(JSON.parse(savedData))
    }
    setIsLoading(false)
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative">
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-600/30 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-radial from-pink-600/20 via-transparent to-transparent" style={{ backgroundPosition: '70% 30%' }} />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-indigo-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse animation-delay-4000" />
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
                <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 border border-white/20 backdrop-blur-sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Workspace
                </Button>
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
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">0</div>
                <p className="text-purple-200">Workspaces</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">0</div>
                <p className="text-purple-200">Modules</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">0</div>
                <p className="text-purple-200">Records</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">0</div>
                <p className="text-purple-200">Team Members</p>
              </CardContent>
            </Card>
          </div>

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
                  <Button variant="outline" className="w-full text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl">
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
                  <Button variant="outline" className="w-full text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl">
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
                  <Button variant="outline" className="w-full text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl">
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
                  <Button variant="outline" className="w-full text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl">
                    Configure
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
  )
}
