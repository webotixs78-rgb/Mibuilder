"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Database, Users, Settings, Zap, Globe, Shield, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function BasicConceptsPage() {
  const concepts = [
    {
      title: "Modules",
      icon: Database,
      description: "Building blocks of your CRM - custom data structures",
      examples: ["Customers", "Products", "Tasks", "Projects"]
    },
    {
      title: "Workflows",
      icon: Zap,
      description: "Automated processes that connect your modules",
      examples: ["Lead to Customer", "Task Assignment", "Email Notifications"]
    },
    {
      title: "Users & Teams",
      icon: Users,
      description: "Manage access and collaboration in your workspace",
      examples: ["Roles", "Permissions", "Team Structure"]
    },
    {
      title: "Integrations",
      icon: Globe,
      description: "Connect with external services and APIs",
      examples: ["Email Services", "Payment Gateways", "Third-party Apps"]
    },
    {
      title: "Security",
      icon: Shield,
      description: "Protect your data with enterprise-grade security",
      examples: ["Data Encryption", "Access Control", "Audit Logs"]
    },
    {
      title: "Analytics",
      icon: BarChart3,
      description: "Track performance and gain insights",
      examples: ["Reports", "Dashboards", "Metrics"]
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
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">Basic Concepts</span>
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
            <h1 className="text-4xl font-bold text-white mb-4">Basic Concepts</h1>
            <p className="text-xl text-purple-200">
              Understand the core concepts of Mibuilder to build powerful CRM solutions
            </p>
          </div>

          {/* Concepts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {concepts.map((concept, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 shadow-xl shadow-purple-500/10">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25 flex-shrink-0">
                      <concept.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{concept.title}</h3>
                      <p className="text-purple-200 mb-4">{concept.description}</p>
                      <div className="space-y-1">
                        <p className="text-purple-300 text-sm font-medium">Examples:</p>
                        <ul className="text-purple-200 text-sm space-y-1">
                          {concept.examples.map((example, idx) => (
                            <li key={idx} className="flex items-center">
                              <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Architecture Overview */}
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20 mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Architecture Overview</h2>
              <p className="text-purple-200 mb-6">
                Mibuilder follows a modular architecture that allows for unlimited customization while maintaining performance and security.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Frontend Layer</h4>
                  <p className="text-purple-200 text-sm">
                    React-based UI with real-time updates and responsive design
                  </p>
                </div>
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">API Layer</h4>
                  <p className="text-purple-200 text-sm">
                    RESTful API with GraphQL support for flexible data access
                  </p>
                </div>
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Database Layer</h4>
                  <p className="text-purple-200 text-sm">
                    Scalable database with automatic backups and replication
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Features */}
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20 mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">No-Code Builder</h4>
                      <p className="text-purple-200 text-sm">Visual interface for creating modules and workflows</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Real-time Collaboration</h4>
                      <p className="text-purple-200 text-sm">Work together with your team in real-time</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Enterprise Security</h4>
                      <p className="text-purple-200 text-sm">Bank-level security and compliance</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Scalable Infrastructure</h4>
                      <p className="text-purple-200 text-sm">Grows with your business needs</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">API First Design</h4>
                      <p className="text-purple-200 text-sm">Full API access for custom integrations</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Mobile Responsive</h4>
                      <p className="text-purple-200 text-sm">Works perfectly on all devices</p>
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
                <Link href="/docs/creating-modules">
                  <Button variant="outline" className="w-full text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl justify-between">
                    <span>Learn About Modules</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/docs/workflows">
                  <Button variant="outline" className="w-full text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl justify-between">
                    <span>Explore Workflows</span>
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
