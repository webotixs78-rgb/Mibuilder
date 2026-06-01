"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Code, Database, Shield, Zap, Wrench, Sparkles, Rocket, Globe, Lock, FileText } from "lucide-react"
import Link from "next/link"

export default function APIPage() {
  const apiFeatures = [
    {
      title: "RESTful API",
      description: "Complete REST API with full CRUD operations for all CRM entities",
      icon: Globe,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Webhooks",
      description: "Real-time webhooks to integrate with your existing systems",
      icon: Zap,
      gradient: "from-blue-500 to-purple-500"
    },
    {
      title: "Authentication",
      description: "Secure OAuth 2.0 and API key authentication methods",
      icon: Lock,
      gradient: "from-green-500 to-blue-500"
    },
    {
      title: "Rate Limiting",
      description: "Fair usage policies with generous rate limits for all plans",
      icon: Shield,
      gradient: "from-orange-500 to-red-500"
    }
  ]

  const endpoints = [
    { method: "GET", path: "/workspaces", description: "List all workspaces" },
    { method: "POST", path: "/workspaces", description: "Create a new workspace" },
    { method: "GET", path: "/workspaces/{id}", description: "Get workspace details" },
    { method: "PUT", path: "/workspaces/{id}", description: "Update workspace" },
    { method: "DELETE", path: "/workspaces/{id}", description: "Delete workspace" },
    { method: "GET", path: "/modules", description: "List all modules" },
    { method: "POST", path: "/modules", description: "Create a new module" },
    { method: "GET", path: "/records", description: "List CRM records" },
    { method: "POST", path: "/records", description: "Create a new record" }
  ]

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
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-200 text-sm backdrop-blur-xl mb-6 shadow-lg shadow-purple-500/10">
              <Code className="w-4 h-4 mr-2" />
              Developer API
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Build powerful integrations with
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"> our API</span>
            </h1>
            <p className="text-xl text-purple-200 mb-8">
              Complete REST API documentation and tools to integrate Mibuilder with your existing systems and workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/register">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02]">
                  Get API Key
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" className="text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl">
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* API Features */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Powerful API Features
              </h2>
              <p className="text-xl text-purple-200 max-w-3xl mx-auto">
                Everything you need to build robust integrations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {apiFeatures.map((feature, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                    <CardDescription className="text-purple-200">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* API Endpoints */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Available Endpoints
              </h2>
              <p className="text-xl text-purple-200 max-w-3xl mx-auto">
                Comprehensive API coverage for all CRM operations
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {endpoints.map((endpoint, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 shadow-xl shadow-purple-500/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-mono ${
                          endpoint.method === 'GET' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                          endpoint.method === 'POST' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                          endpoint.method === 'PUT' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                          'bg-red-500/20 text-red-300 border border-red-500/30'
                        } backdrop-blur-sm`}>
                          {endpoint.method}
                        </span>
                        <code className="text-purple-300 font-mono">{endpoint.path}</code>
                      </div>
                    </div>
                    <p className="text-purple-200">{endpoint.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Quick Start Example
              </h2>
              <p className="text-xl text-purple-200">
                See how easy it is to get started with our API
              </p>
            </div>

            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Create a Workspace</h3>
                  <p className="text-purple-200">Use this example to create your first workspace via API</p>
                </div>
                <div className="bg-black/50 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm font-mono">
{`curl -X POST https://api.mibuilder.com/v1/workspaces \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "My CRM Workspace",
    "description": "Custom CRM for my business"
  }'`}
                  </pre>
                </div>
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-white mb-2">Response:</h4>
                  <div className="bg-black/50 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-blue-400 text-sm font-mono">
{`{
  "id": "ws_1234567890",
  "name": "My CRM Workspace",
  "description": "Custom CRM for my business",
  "created_at": "2024-03-15T10:30:00Z",
  "status": "active"
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Rate Limits */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Rate Limits & Pricing
              </h2>
              <p className="text-xl text-purple-200">
                Fair usage limits that scale with your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">Free Plan</h3>
                  <div className="text-3xl font-bold text-white mb-4">1,000</div>
                  <p className="text-purple-200 mb-4">requests per hour</p>
                  <p className="text-purple-200 text-sm">Perfect for testing and small projects</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">Professional</h3>
                  <div className="text-3xl font-bold text-white mb-4">10,000</div>
                  <p className="text-purple-200 mb-4">requests per hour</p>
                  <p className="text-purple-200 text-sm">Great for growing businesses</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
                  <div className="text-3xl font-bold text-white mb-4">Unlimited</div>
                  <p className="text-purple-200 mb-4">requests per hour</p>
                  <p className="text-purple-200 text-sm">For large-scale applications</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to start building?
                  <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"> Get your API key</span>
                </h2>
                <p className="text-xl text-purple-200 mb-8">
                  Join thousands of developers building amazing integrations with Mibuilder.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/register">
                    <Button size="lg" className="text-xl px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02]">
                      Get Started Free
                    </Button>
                  </Link>
                  <Link href="/docs">
                    <Button size="lg" variant="outline" className="text-xl px-12 py-6 text-white border-2 border-white/40 bg-white/10 hover:bg-white/20 hover:border-white/60 backdrop-blur-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-white/20 hover:shadow-white/30">
                      Read Docs
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
                  <li><Link href="/docs/api" className="hover:text-white transition-colors">API</Link></li>
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
