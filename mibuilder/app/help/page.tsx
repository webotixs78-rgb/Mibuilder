"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, HelpCircle, Search, MessageCircle, Mail, Phone, Book, Users, Zap, Wrench, Sparkles, Shield, Rocket, FileText, Video } from "lucide-react"
import Link from "next/link"

export default function HelpCenterPage() {
  const helpCategories = [
    {
      title: "Getting Started",
      description: "New to Mibuilder? Start here",
      icon: Rocket,
      gradient: "from-purple-500 to-pink-500",
      articles: 24
    },
    {
      title: "Account & Billing",
      description: "Manage your account and subscription",
      icon: Shield,
      gradient: "from-blue-500 to-purple-500",
      articles: 18
    },
    {
      title: "Building Workspaces",
      description: "Create and customize your CRM",
      icon: Wrench,
      gradient: "from-green-500 to-blue-500",
      articles: 32
    },
    {
      title: "Integrations",
      description: "Connect with other tools and services",
      icon: Zap,
      gradient: "from-orange-500 to-red-500",
      articles: 15
    },
    {
      title: "Troubleshooting",
      description: "Common issues and solutions",
      icon: HelpCircle,
      gradient: "from-purple-500 to-indigo-500",
      articles: 28
    },
    {
      title: "API & Developers",
      description: "Technical documentation and API help",
      icon: Book,
      gradient: "from-pink-500 to-purple-500",
      articles: 21
    }
  ]

  const popularArticles = [
    { title: "How to create your first workspace", category: "Getting Started", views: "2.3K" },
    { title: "Understanding workspace permissions", category: "Account & Billing", views: "1.8K" },
    { title: "Building custom modules", category: "Building Workspaces", views: "3.1K" },
    { title: "Slack integration setup", category: "Integrations", views: "1.5K" },
    { title: "Common login issues", category: "Troubleshooting", views: "2.7K" },
    { title: "API authentication guide", category: "API & Developers", views: "1.9K" }
  ]

  const contactOptions = [
    {
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      icon: MessageCircle,
      available: "Available 24/7",
      action: "Start Chat"
    },
    {
      title: "Email Support",
      description: "Send us an email and we'll respond within 24 hours",
      icon: Mail,
      available: "Response within 24h",
      action: "Send Email"
    },
    {
      title: "Phone Support",
      description: "Call us for immediate assistance",
      icon: Phone,
      available: "Mon-Fri 9am-6pm EST",
      action: "Call Now"
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
              <HelpCircle className="w-4 h-4 mr-2" />
              Help Center
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              How can we
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"> help you today?</span>
            </h1>
            <p className="text-xl text-purple-200 mb-8">
              Find answers, get support, and learn how to make the most of Mibuilder.
            </p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:border-purple-400 focus:ring-purple-400/20 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {helpCategories.map((category, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10 cursor-pointer">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25`}>
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white">{category.title}</CardTitle>
                    <CardDescription className="text-purple-200">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="flex items-center justify-center space-x-2 text-purple-300">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm">{category.articles} articles</span>
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
                Popular Help Articles
              </h2>
              <p className="text-xl text-purple-200">
                Most viewed help articles and guides
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
                          <span>{article.views} views</span>
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

        {/* Contact Support */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Still need help?
              </h2>
              <p className="text-xl text-purple-200">
                Our support team is here to assist you
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactOptions.map((option, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
                      <option.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{option.title}</h3>
                    <p className="text-purple-200 mb-4">{option.description}</p>
                    <div className="text-purple-300 text-sm mb-4">{option.available}</div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02]">
                      {option.action}
                    </Button>
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Video Tutorials
              </h2>
              <p className="text-xl text-purple-200">
                Learn visually with our step-by-step video guides
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                <CardContent className="p-6">
                  <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg mb-4 flex items-center justify-center border border-white/20">
                    <Video className="w-12 h-12 text-purple-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Quick Start Guide</h3>
                  <p className="text-purple-200 text-sm mb-2">Get up and running in 10 minutes</p>
                  <span className="text-purple-300 text-sm">10:30</span>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                <CardContent className="p-6">
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg mb-4 flex items-center justify-center border border-white/20">
                    <Video className="w-12 h-12 text-purple-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Advanced Features</h3>
                  <p className="text-purple-200 text-sm mb-2">Master advanced functionality</p>
                  <span className="text-purple-300 text-sm">25:45</span>
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
                  Join our community
                  <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"> Get help from peers</span>
                </h2>
                <p className="text-xl text-purple-200 mb-8">
                  Connect with other Mibuilder users, share experiences, and get help from our amazing community.
                </p>
                <Link href="/community">
                  <Button size="lg" className="text-xl px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02]">
                    Join Community
                  </Button>
                </Link>
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
