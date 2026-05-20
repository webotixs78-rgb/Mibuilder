"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Download, Star, Users, Zap, Wrench, Sparkles, Shield, Rocket, Target } from "lucide-react"
import Link from "next/link"

export default function TemplatesPage() {
  const templates = [
    {
      title: "Sales Pipeline",
      description: "Complete sales workflow from lead to close with automated follow-ups",
      category: "Sales",
      icon: Target,
      gradient: "from-purple-500 to-pink-500",
      features: ["Lead tracking", "Deal stages", "Automated follow-ups", "Sales analytics"],
      rating: 4.8,
      downloads: "2.5K"
    },
    {
      title: "Customer Support",
      description: "Streamlined ticket management and customer communication system",
      category: "Support",
      icon: Users,
      gradient: "from-blue-500 to-purple-500",
      features: ["Ticket tracking", "Priority management", "SLA monitoring", "Customer portal"],
      rating: 4.9,
      downloads: "1.8K"
    },
    {
      title: "Project Management",
      description: "Track projects, tasks, and team collaboration in one place",
      category: "Operations",
      icon: Zap,
      gradient: "from-green-500 to-blue-500",
      features: ["Task management", "Team collaboration", "Progress tracking", "Resource planning"],
      rating: 4.7,
      downloads: "3.2K"
    },
    {
      title: "Marketing Campaign",
      description: "Manage campaigns, leads, and marketing ROI effectively",
      category: "Marketing",
      icon: Rocket,
      gradient: "from-orange-500 to-red-500",
      features: ["Campaign tracking", "Lead scoring", "ROI analytics", "A/B testing"],
      rating: 4.6,
      downloads: "1.5K"
    },
    {
      title: "Inventory Management",
      description: "Track inventory, orders, and supply chain operations",
      category: "Operations",
      icon: Shield,
      gradient: "from-purple-500 to-indigo-500",
      features: ["Stock tracking", "Order management", "Supplier relations", "Forecasting"],
      rating: 4.8,
      downloads: "2.1K"
    },
    {
      title: "HR Management",
      description: "Complete HR solution for recruitment, onboarding, and employee management",
      category: "HR",
      icon: Star,
      gradient: "from-pink-500 to-purple-500",
      features: ["Recruitment", "Onboarding", "Performance reviews", "Time tracking"],
      rating: 4.9,
      downloads: "1.9K"
    }
  ]

  const categories = ["All", "Sales", "Support", "Operations", "Marketing", "HR"]

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
              <Sparkles className="w-4 h-4 mr-2" />
              Templates Gallery
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Start with proven
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"> CRM templates</span>
            </h1>
            <p className="text-xl text-purple-200 mb-8">
              Choose from our library of professionally designed templates and customize them to fit your unique business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/register">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02]">
                  Start Building
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="outline" className="text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  className={category === "All" 
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm"
                    : "text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {templates.map((template, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10 group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${template.gradient} rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform duration-300`}>
                        <template.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white text-sm">{template.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="w-4 h-4 text-purple-300" />
                          <span className="text-purple-300 text-sm">{template.downloads}</span>
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-200 text-xs backdrop-blur-xl mb-4">
                      {template.category}
                    </div>
                    <CardTitle className="text-xl text-white group-hover:text-purple-200 transition-colors mb-2">
                      {template.title}
                    </CardTitle>
                    <CardDescription className="text-purple-200">
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {template.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-purple-200 text-sm">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <span className="text-purple-300 text-sm">+{template.features.length - 3} more features</span>
                        <Button variant="ghost" className="text-purple-300 hover:text-white hover:bg-white/10 p-2 group-hover:bg-white/10">
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
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
                  Don't see what you need?
                  <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"> Build it yourself!</span>
                </h2>
                <p className="text-xl text-purple-200 mb-8">
                  With Mibuilder's no-code editor, you can create custom CRM solutions from scratch or modify any template to perfectly match your requirements.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/register">
                    <Button size="lg" className="text-xl px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02]">
                      Start Building
                    </Button>
                  </Link>
                  <Link href="/features">
                    <Button size="lg" variant="outline" className="text-xl px-12 py-6 text-white border-2 border-white/40 bg-white/10 hover:bg-white/20 hover:border-white/60 backdrop-blur-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-white/20 hover:shadow-white/30">
                      Explore Features
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
