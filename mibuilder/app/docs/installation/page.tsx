"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Download, Rocket, CheckCircle, AlertCircle, Terminal, Globe, Server } from "lucide-react"
import Link from "next/link"

export default function InstallationPage() {
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
                    <Download className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">Installation</span>
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
            <h1 className="text-4xl font-bold text-white mb-4">Installation Guide</h1>
            <p className="text-xl text-purple-200">
              Get Mibuilder up and running in minutes with our simple installation process
            </p>
          </div>

          {/* Prerequisites */}
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20 mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <AlertCircle className="w-6 h-6 mr-2 text-yellow-400" />
                Prerequisites
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium">Node.js 18+</h3>
                    <p className="text-purple-200 text-sm">Node.js version 18.0 or higher</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium">npm or yarn</h3>
                    <p className="text-purple-200 text-sm">Package manager for dependencies</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium">Git</h3>
                    <p className="text-purple-200 text-sm">For version control</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium">Modern Browser</h3>
                    <p className="text-purple-200 text-sm">Chrome, Firefox, Safari, or Edge</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Installation Methods */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-white">Installation Methods</h2>
            
            {/* Quick Start */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Rocket className="w-6 h-6 mr-2 text-purple-400" />
                  Quick Start (Recommended)
                </h3>
                <p className="text-purple-200 mb-6">
                  Get started immediately with our hosted solution
                </p>
                <div className="bg-black/30 rounded-lg p-4 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
                    <code>npx create-mibuilder-app my-crm</code>
                  </pre>
                </div>
                <div className="flex items-center space-x-4">
                  <Link href="/register">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm">
                      Start Free Trial
                    </Button>
                  </Link>
                  <Button variant="outline" className="text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl">
                    View Pricing
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Self-Hosted */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Server className="w-6 h-6 mr-2 text-blue-400" />
                  Self-Hosted Installation
                </h3>
                <p className="text-purple-200 mb-6">
                  Install Mibuilder on your own servers
                </p>
                <div className="space-y-4">
                  <div className="bg-black/30 rounded-lg p-4">
                    <pre className="text-green-400 font-mono text-sm">
                      <code># Clone the repository
git clone https://github.com/mibuilder/mibuilder.git
cd mibuilder

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start the development server
npm run dev</code>
                    </pre>
                  </div>
                  <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                    <p className="text-purple-200 text-sm">
                      <strong>Note:</strong> Make sure to configure your database connection in the .env file
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Docker */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Terminal className="w-6 h-6 mr-2 text-orange-400" />
                  Docker Installation
                </h3>
                <p className="text-purple-200 mb-6">
                  Deploy using Docker containers
                </p>
                <div className="bg-black/30 rounded-lg p-4 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
                    <code># Pull the latest image
docker pull mibuilder/mibuilder:latest

# Run the container
docker run -p 3000:3000 mibuilder/mibuilder:latest</code>
                  </pre>
                </div>
                <p className="text-purple-200">
                  For production deployments, use Docker Compose with our provided configuration files.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20 mt-8">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Next Steps</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/docs/first-workspace">
                  <Button variant="outline" className="w-full text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl justify-between">
                    <span>Create Your First Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/docs/basic-concepts">
                  <Button variant="outline" className="w-full text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl justify-between">
                    <span>Learn Basic Concepts</span>
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
