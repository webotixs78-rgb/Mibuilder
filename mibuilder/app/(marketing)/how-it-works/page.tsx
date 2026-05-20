"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Wrench, 
  Users, 
  ArrowRight, 
  Sparkles, 
  Shield,
  Rocket,
  CheckCircle,
  Zap
} from "lucide-react"

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      title: "Sign Up",
      description: "Create your free account and workspace",
      icon: Users
    },
    {
      number: 2,
      title: "Choose Template",
      description: "Start with a template or from scratch",
      icon: Wrench
    },
    {
      number: 3,
      title: "Customize",
      description: "Build modules, fields, and workflows",
      icon: Zap
    },
    {
      number: 4,
      title: "Launch",
      description: "Invite your team and start managing",
      icon: Rocket
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
                <Link href="/" className="text-xl font-bold text-white">Mibuilder</Link>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/features" className="text-white/80 hover:text-white transition-colors">Features</Link>
                <Link href="/how-it-works" className="text-white font-medium">How it Works</Link>
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
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-200 text-sm backdrop-blur-xl mb-6 shadow-lg shadow-purple-500/10">
              <Sparkles className="w-4 h-4 mr-2" />
              How it Works
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Get started in minutes, not months
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto mb-12">
              Building your custom CRM has never been easier. Follow these simple steps to get up and running.
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6 shadow-lg shadow-purple-500/25">
                    {step.number}
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-purple-200">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Steps */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-8">
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">1. Sign Up</h3>
                      <p className="text-purple-200 mb-4">
                        Create your free account in seconds. No credit card required. Just enter your email and you're ready to start building.
                      </p>
                      <div className="flex items-center space-x-2 text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm">Takes less than 30 seconds</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Wrench className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">2. Choose Template</h3>
                      <p className="text-purple-200 mb-4">
                        Start with one of our pre-built templates for common use cases like sales, recruiting, or project management, or start from scratch.
                      </p>
                      <div className="flex items-center space-x-2 text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm">50+ professional templates</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">3. Customize</h3>
                      <p className="text-purple-200 mb-4">
                        Use our drag-and-drop builder to create custom modules, fields, workflows, and automations. No coding required.
                      </p>
                      <div className="flex items-center space-x-2 text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm">Visual drag-and-drop interface</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">4. Launch</h3>
                      <p className="text-purple-200 mb-4">
                        Invite your team members and start using your custom CRM immediately. All data is securely stored and backed up.
                      </p>
                      <div className="flex items-center space-x-2 text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm">Unlimited team members</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl shadow-purple-500/20">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to build your CRM?</h2>
              <p className="text-xl text-purple-200 mb-8">
                Start your free trial today and see how Mibuilder can transform your business
              </p>
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
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
