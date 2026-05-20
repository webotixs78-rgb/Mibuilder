"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle, AlertCircle, Clock, Wrench, Sparkles, Shield, Rocket, Activity, Zap } from "lucide-react"
import Link from "next/link"

export default function StatusPage() {
  const services = [
    {
      name: "Web Application",
      status: "operational",
      description: "Main Mibuilder web application",
      uptime: "99.9%",
      responseTime: "120ms"
    },
    {
      name: "API Services",
      status: "operational",
      description: "REST API and GraphQL endpoints",
      uptime: "99.8%",
      responseTime: "85ms"
    },
    {
      name: "Database",
      status: "operational",
      description: "Primary database and replication",
      uptime: "99.9%",
      responseTime: "45ms"
    },
    {
      name: "Authentication",
      status: "operational",
      description: "User authentication and authorization",
      uptime: "99.7%",
      responseTime: "95ms"
    },
    {
      name: "File Storage",
      status: "operational",
      description: "File uploads and CDN services",
      uptime: "99.8%",
      responseTime: "200ms"
    },
    {
      name: "Email Services",
      status: "degraded",
      description: "Email notifications and communications",
      uptime: "98.5%",
      responseTime: "350ms"
    }
  ]

  const incidents = [
    {
      title: "Email Service Degradation",
      status: "investigating",
      time: "2 hours ago",
      description: "We're investigating reports of delayed email notifications."
    },
    {
      title: "Scheduled Maintenance",
      status: "resolved",
      time: "1 day ago",
      description: "Database maintenance completed successfully."
    },
    {
      title: "API Rate Limiting",
      status: "resolved",
      time: "3 days ago",
      description: "Improved rate limiting to handle increased traffic."
    }
  ]

  const metrics = [
    { label: "Uptime (30 days)", value: "99.9%", status: "good" },
    { label: "Average Response Time", value: "125ms", status: "good" },
    { label: "Error Rate", value: "0.1%", status: "good" },
    { label: "API Requests Today", value: "2.3M", status: "normal" }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-400 bg-green-400/20 border-green-400/30"
      case "degraded":
        return "text-yellow-400 bg-yellow-400/20 border-yellow-400/30"
      case "down":
        return "text-red-400 bg-red-400/20 border-red-400/30"
      default:
        return "text-gray-400 bg-gray-400/20 border-gray-400/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="w-4 h-4" />
      case "degraded":
        return <AlertCircle className="w-4 h-4" />
      case "down":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
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
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/features" className="text-white/80 hover:text-white transition-colors">Features</Link>
                <Link href="/how-it-works" className="text-white/80 hover:text-white transition-colors">How it Works</Link>
                <Link href="/pricing" className="text-white/80 hover:text-white transition-colors">Pricing</Link>
                <Link href="/faq" className="text-white/80 hover:text-white transition-colors">FAQ</Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/login">
                  <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 border border-white/20 backdrop-blur-sm">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm">Start Free</Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-full text-green-300 text-sm backdrop-blur-xl mb-6 shadow-lg shadow-green-500/10">
              <Activity className="w-4 h-4 mr-2" />
              All Systems Operational
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              System Status
              <span className="bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent"> & Performance</span>
            </h1>
            <p className="text-xl text-purple-200 mb-8">
              Real-time status of all Mibuilder services and system performance metrics.
            </p>
            <div className="flex items-center justify-center space-x-4 text-purple-200">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Live Status</span>
              </div>
              <span>•</span>
              <span>Last updated: 2 minutes ago</span>
            </div>
          </div>
        </section>

        {/* System Metrics */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {metrics.map((metric, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                    <p className="text-purple-200">{metric.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Service Status */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Service Status
              </h2>
              <p className="text-xl text-purple-200">
                Current status of all Mibuilder services
              </p>
            </div>

            <div className="space-y-6">
              {services.map((service, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs border backdrop-blur-sm ${getStatusColor(service.status)}`}>
                            {getStatusIcon(service.status)}
                            <span className="ml-1 capitalize">{service.status}</span>
                          </div>
                        </div>
                        <p className="text-purple-200 mb-2">{service.description}</p>
                        <div className="flex items-center space-x-6 text-purple-300 text-sm">
                          <span>Uptime: {service.uptime}</span>
                          <span>Response: {service.responseTime}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Incidents */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Recent Incidents
              </h2>
              <p className="text-xl text-purple-200">
                Latest system incidents and maintenance updates
              </p>
            </div>

            <div className="space-y-6">
              {incidents.map((incident, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        incident.status === 'investigating' ? 'bg-yellow-400/20 border border-yellow-400/30' :
                        incident.status === 'resolved' ? 'bg-green-400/20 border border-green-400/30' :
                        'bg-red-400/20 border border-red-400/30'
                      } backdrop-blur-sm`}>
                        {incident.status === 'investigating' && <AlertCircle className="w-4 h-4 text-yellow-400" />}
                        {incident.status === 'resolved' && <CheckCircle className="w-4 h-4 text-green-400" />}
                        {incident.status === 'monitoring' && <Clock className="w-4 h-4 text-blue-400" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-white">{incident.title}</h3>
                          <span className="text-purple-300 text-sm">{incident.time}</span>
                        </div>
                        <p className="text-purple-200">{incident.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Subscribe Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Stay informed
                  <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"> Get status updates</span>
                </h2>
                <p className="text-xl text-purple-200 mb-8">
                  Subscribe to receive notifications about system status and incidents.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:border-purple-400 focus:ring-purple-400/20 backdrop-blur-sm"
                  />
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02]">
                    Subscribe
                  </Button>
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
                    <Wrench className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">Mibuilder</span>
                </div>
                <p className="text-purple-200">
                  Build your CRM your way - without code.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-white">Product</h4>
                <ul className="space-y-2 text-purple-200">
                  <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                  <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link href="/templates" className="hover:text-white transition-colors">Templates</Link></li>
                  <li><Link href="/api" className="hover:text-white transition-colors">API</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-white">Company</h4>
                <ul className="space-y-2 text-purple-200">
                  <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                  <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-white">Support</h4>
                <ul className="space-y-2 text-purple-200">
                  <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                  <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link href="/community" className="hover:text-white transition-colors">Community</Link></li>
                  <li><Link href="/status" className="hover:text-white transition-colors">Status</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-white/10 mt-8 pt-8 text-center text-purple-200">
              <p>&copy; 2024 Mibuilder. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
