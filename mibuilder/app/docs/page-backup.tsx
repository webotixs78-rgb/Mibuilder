"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Book, Code, FileText, Users, Zap, Wrench, Sparkles, Shield, Rocket, Search, Video } from "lucide-react"
import Link from "next/link"

export default function DocsPage() {
  const docSections = [
    {
      title: "Getting Started",
      description: "Quick start guide and basic concepts",
      icon: Rocket,
      gradient: "from-purple-500 to-pink-500",
      articles: ["Installation", "First Workspace", "Basic Concepts", "UI Overview"]
    },
    {
      title: "API Reference",
      description: "Complete API documentation and examples",
      icon: Code,
      gradient: "from-blue-500 to-purple-500",
      articles: ["Authentication", "Endpoints", "Webhooks", "Rate Limits"]
    },
    {
      title: "Tutorials",
      description: "Step-by-step guides for common tasks",
      icon: Book,
      gradient: "from-green-500 to-blue-500",
      articles: ["Building Modules", "Custom Fields", "Workflows", "Dashboards"]
    },
    {
      title: "Best Practices",
      description: "Tips and tricks for optimal usage",
      icon: Shield,
      gradient: "from-orange-500 to-red-500",
      articles: ["Security", "Performance", "Design Patterns", "Troubleshooting"]
    }
  ]

  const popularArticles = [
    { title: "Creating Your First Workspace", category: "Getting Started", readTime: "5 min" },
    { title: "Building Custom Modules", category: "Tutorials", readTime: "10 min" },
    { title: "API Authentication Guide", category: "API Reference", readTime: "7 min" },
    { title: "Workflow Automation", category: "Tutorials", readTime: "12 min" },
    { title: "Security Best Practices", category: "Best Practices", readTime: "8 min" },
    { title: "Custom Field Types", category: "Getting Started", readTime: "6 min" }
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
              <FileText className="w-4 h-4 mr-2" />
              Documentation
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Everything you need to
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"> master Mibuilder</span>
            </h1>
            <p className="text-xl text-purple-200 mb-8">
              Comprehensive guides, API reference, and tutorials to help you build amazing CRM solutions.
            </p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:border-purple-400 focus:ring-purple-400/20 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Documentation Sections */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {docSections.map((section, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${section.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25`}>
                      <section.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white">{section.title}</CardTitle>
                    <CardDescription className="text-purple-200">
                      {section.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {section.articles.map((article, idx) => (
                        <Link key={idx} href="#" className="block text-purple-300 hover:text-white transition-colors text-sm">
                          {article}
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Popular Articles
              </h2>
              <p className="text-xl text-purple-200">
                Most read documentation and tutorials
              </p>
            </div>

            <div className="space-y-6">
              {popularArticles.map((article, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 shadow-xl shadow-purple-500/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2 hover:text-purple-200 transition-colors cursor-pointer">
                          {article.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-purple-200 text-sm">
                          <span className="inline-flex items-center px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs">
                            {article.category}
                          </span>
                          <span>{article.readTime}</span>
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
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Video Tutorials
              </h2>
              <p className="text-xl text-purple-200">
                Learn by watching step-by-step video guides
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                <CardContent className="p-6">
                  <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg mb-4 flex items-center justify-center border border-white/20">
                    <Video className="w-12 h-12 text-purple-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Getting Started</h3>
                  <p className="text-purple-200 text-sm mb-2">Complete beginner's guide</p>
                  <span className="text-purple-300 text-sm">15:30</span>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                <CardContent className="p-6">
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg mb-4 flex items-center justify-center border border-white/20">
                    <Video className="w-12 h-12 text-purple-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Building Modules</h3>
                  <p className="text-purple-200 text-sm mb-2">Create custom modules</p>
                  <span className="text-purple-300 text-sm">22:45</span>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                <CardContent className="p-6">
                  <div className="aspect-video bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg mb-4 flex items-center justify-center border border-white/20">
                    <Video className="w-12 h-12 text-purple-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">API Integration</h3>
                  <p className="text-purple-200 text-sm mb-2">Connect with external tools</p>
                  <span className="text-purple-300 text-sm">18:20</span>
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
                  Need more help?
                  <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"> We're here for you</span>
                </h2>
                <p className="text-xl text-purple-200 mb-8">
                  Get help from our community or reach out to our support team.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/community">
                    <Button size="lg" className="text-xl px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02]">
                      Join Community
                    </Button>
                  </Link>
                  <Link href="/help">
                    <Button size="lg" variant="outline" className="text-xl px-12 py-6 text-white border-2 border-white/40 bg-white/10 hover:bg-white/20 hover:border-white/60 backdrop-blur-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-white/20 hover:shadow-white/30">
                      Get Support
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
  )
}
