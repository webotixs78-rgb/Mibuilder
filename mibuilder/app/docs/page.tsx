"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Rocket, Book, FileText, Code, Settings, Users, Database, Shield, Zap, ArrowRight, ChevronRight, Clock, Tag, Star } from "lucide-react"
import Link from "next/link"

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const sections = [
    {
      title: "Getting Started",
      icon: Rocket,
      description: "Quick start guide and basic concepts",
      links: [
        { title: "Installation", href: "/docs/installation", time: "5 min" },
        { title: "First Workspace", href: "/docs/first-workspace", time: "10 min" },
        { title: "Basic Concepts", href: "/docs/basic-concepts", time: "8 min" },
        { title: "UI Overview", href: "/docs/ui-overview", time: "6 min" }
      ]
    },
    {
      title: "Building CRM",
      icon: Database,
      description: "Create custom CRM modules and workflows",
      links: [
        { title: "Creating Modules", href: "/docs/creating-modules", time: "12 min" },
        { title: "Custom Fields", href: "/docs/custom-fields", time: "8 min" },
        { title: "Workflows", href: "/docs/workflows", time: "15 min" },
        { title: "Automations", href: "/docs/automations", time: "10 min" }
      ]
    },
    {
      title: "User Management",
      icon: Users,
      description: "Manage users, teams, and permissions",
      links: [
        { title: "User Roles", href: "/docs/user-roles", time: "7 min" },
        { title: "Team Management", href: "/docs/team-management", time: "10 min" },
        { title: "Permissions", href: "/docs/permissions", time: "9 min" },
        { title: "Access Control", href: "/docs/access-control", time: "11 min" }
      ]
    },
    {
      title: "API & Integrations",
      icon: Code,
      description: "API documentation and third-party integrations",
      links: [
        { title: "API Reference", href: "/docs/api-reference", time: "15 min" },
        { title: "Webhooks", href: "/docs/webhooks", time: "8 min" },
        { title: "Third-party Apps", href: "/docs/third-party-apps", time: "12 min" },
        { title: "Custom Integrations", href: "/docs/custom-integrations", time: "18 min" }
      ]
    }
  ]

  const popularArticles = [
    {
      title: "Creating Your First Workspace",
      category: "Getting Started",
      time: "5 min",
      href: "/docs/first-workspace"
    },
    {
      title: "Building Custom CRM Modules",
      category: "Building CRM",
      time: "12 min",
      href: "/docs/creating-modules"
    },
    {
      title: "Setting Up User Permissions",
      category: "User Management",
      time: "9 min",
      href: "/docs/permissions"
    },
    {
      title: "API Authentication Guide",
      category: "API & Integrations",
      time: "10 min",
      href: "/docs/api-reference"
    }
  ]

  const videoTutorials = [
    {
      title: "Getting Started with Mibuilder",
      duration: "12:45",
      thumbnail: "🎥",
      href: "/docs/videos/getting-started"
    },
    {
      title: "Building Your First CRM Module",
      duration: "18:30",
      thumbnail: "🎬",
      href: "/docs/videos/first-module"
    },
    {
      title: "Advanced Workflows & Automations",
      duration: "25:15",
      thumbnail: "📹",
      href: "/docs/videos/advanced-workflows"
    },
    {
      title: "API Integration Examples",
      duration: "15:20",
      thumbnail: "🎦",
      href: "/docs/videos/api-integration"
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
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Book className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Documentation</span>
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

        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Documentation
            </h1>
            <p className="text-xl text-purple-200 mb-8">
              Everything you need to build amazing CRM solutions with Mibuilder
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:border-purple-400 focus:ring-purple-400/20 backdrop-blur-sm"
              />
            </div>
          </div>
        </section>

        {/* Documentation Sections */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sections.map((section, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
                        <section.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-semibold tracking-tight text-xl text-white mb-2">{section.title}</h3>
                      <p className="text-sm text-purple-200 mb-4">{section.description}</p>
                    </div>
                    <div className="space-y-2">
                      {section.links.map((link, linkIndex) => (
                        <Link key={linkIndex} href={link.href} className="block text-purple-300 hover:text-white transition-colors text-sm">
                          {link.title}
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Popular Articles</h2>
              <p className="text-xl text-purple-200">Most read documentation and tutorials</p>
            </div>
            
            <div className="space-y-6">
              {popularArticles.map((article, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 shadow-xl shadow-purple-500/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <Link href={article.href} className="text-lg font-semibold text-white mb-2 hover:text-purple-200 transition-colors cursor-pointer">
                          {article.title}
                        </Link>
                        <div className="flex items-center space-x-4 text-purple-200 text-sm">
                          <span className="inline-flex items-center px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs">
                            {article.category}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {article.time}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-purple-300 hover:text-white transition-colors cursor-pointer" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Video Tutorials */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Video Tutorials</h2>
              <p className="text-xl text-purple-200">Learn by watching step-by-step guides</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videoTutorials.map((video, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 shadow-xl shadow-purple-500/10">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-3xl shadow-lg shadow-purple-500/25">
                        {video.thumbnail}
                      </div>
                      <div className="flex-1">
                        <Link href={video.href} className="text-lg font-semibold text-white mb-2 hover:text-purple-200 transition-colors cursor-pointer">
                          {video.title}
                        </Link>
                        <div className="flex items-center text-purple-200 text-sm">
                          <Clock className="w-3 h-3 mr-1" />
                          {video.duration}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-purple-300 hover:text-white transition-colors cursor-pointer" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Need More Help?
                </h2>
                <p className="text-xl text-purple-200 mb-8">
                  Our support team is here to help you succeed with Mibuilder
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/help">
                    <Button size="lg" className="text-xl px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02]">
                      Visit Help Center
                    </Button>
                  </Link>
                  <Link href="/community">
                    <Button size="lg" variant="outline" className="text-xl px-12 py-6 text-white border-2 border-white/40 bg-white/10 hover:bg-white/20 hover:border-white/60 backdrop-blur-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-white/20 hover:shadow-white/30">
                      Join Community
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white/5 backdrop-blur-xl border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <Book className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">Mibuilder Docs</span>
                </div>
                <p className="text-purple-200">
                  Comprehensive documentation for building amazing CRM solutions.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-white">Documentation</h4>
                <ul className="space-y-2 text-purple-200">
                  <li><Link href="/docs" className="hover:text-white transition-colors">Getting Started</Link></li>
                  <li><Link href="/docs/api" className="hover:text-white transition-colors">API Reference</Link></li>
                  <li><Link href="/docs/tutorials" className="hover:text-white transition-colors">Tutorials</Link></li>
                  <li><Link href="/docs/examples" className="hover:text-white transition-colors">Examples</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-white">Support</h4>
                <ul className="space-y-2 text-purple-200">
                  <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link href="/community" className="hover:text-white transition-colors">Community</Link></li>
                  <li><Link href="/status" className="hover:text-white transition-colors">System Status</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-white">Resources</h4>
                <ul className="space-y-2 text-purple-200">
                  <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/templates" className="hover:text-white transition-colors">Templates</Link></li>
                  <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-white/10 mt-8 pt-8 text-center text-purple-200">
              <p>&copy; 2024 Mibuilder. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
