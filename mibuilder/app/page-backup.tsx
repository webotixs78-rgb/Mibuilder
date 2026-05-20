"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BarChart3, Wrench, Users, Zap, CheckCircle, Star, MessageSquare, Calendar, FileText, Settings, Lock, Sparkles, Shield, Rocket, Target } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
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
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl animate-float" />
            <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-pink-400/10 rounded-full blur-2xl animate-float-delayed" />
            <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-indigo-400/10 rounded-full blur-2xl animate-float-delayed-2" />
            <div className="absolute top-1/2 right-1/3 w-36 h-36 bg-purple-400/10 rounded-full blur-2xl animate-float" />
          </div>
          
          <div className="max-w-7xl mx-auto text-center relative z-10">
            {/* Badge */}
            <div className="mb-8">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-200 text-sm backdrop-blur-xl mb-8 hover:scale-105 transition-transform duration-300 shadow-lg shadow-purple-500/10">
                <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                <span className="font-semibold">Revolutionary CRM Builder Platform</span>
                <Rocket className="w-5 h-5 ml-2 animate-bounce" />
              </div>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight animate-fade-in-up">
              Build your CRM<br />
              <span className="relative">
                your way
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-grow-width" />
              </span>
              <br />
              <span className="text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                — without code
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-xl md:text-2xl text-purple-200 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up-delayed">
              Mibuilder lets businesses create custom CRM workflows, pipelines, dashboards, and automations 
              without hiring developers. <span className="text-purple-100 font-semibold">Turn your unique processes into powerful business systems.</span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up-delayed-2">
              <Link href="/register">
                <Button size="lg" className="text-xl px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-2xl shadow-purple-500/30 transition-all duration-500 hover:shadow-purple-500/50 hover:scale-105 hover:shadow-3xl group relative overflow-hidden backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  <span className="relative flex items-center">
                    <Zap className="w-5 h-5 mr-2 animate-pulse" />
                    Start Free
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>
              <Link href="/register?demo=true">
                <Button size="lg" variant="outline" className="text-xl px-12 py-6 text-white border-2 border-white/40 bg-white/10 hover:bg-white/20 hover:border-white/60 backdrop-blur-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-white/20 hover:shadow-white/30">
                  <span className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Demo
                  </span>
                </Button>
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-8 text-purple-200 animate-fade-in-up-delayed-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <span className="text-sm">14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <Rocket className="w-5 h-5 text-purple-400" />
                <span className="text-sm">Setup in minutes</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-200 text-sm backdrop-blur-xl mb-4 shadow-lg shadow-purple-500/10">
                <Star className="w-4 h-4 mr-2" />
                Powerful Features
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Everything you need to build
                <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"> your perfect CRM</span>
              </h2>
              <p className="text-xl text-purple-200 max-w-3xl mx-auto">
                From custom fields to automated workflows, Mibuilder gives you all the tools 
                to create a CRM that fits your unique business processes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] group shadow-xl shadow-purple-500/10">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform duration-300">
                    <Wrench className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">No-Code Builder</CardTitle>
                  <CardDescription className="text-purple-200">
                    Create custom modules, fields, and workflows with drag-and-drop simplicity
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] group shadow-xl shadow-purple-500/10">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">Team Collaboration</CardTitle>
                  <CardDescription className="text-purple-200">
                    Work together with your team in real-time with role-based permissions
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] group shadow-xl shadow-purple-500/10">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/25 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">Automated Workflows</CardTitle>
                  <CardDescription className="text-purple-200">
                    Set up automated processes to save time and reduce manual errors
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] group shadow-xl shadow-purple-500/10">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/25 group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">Real-time Analytics</CardTitle>
                  <CardDescription className="text-purple-200">
                    Get instant insights with customizable dashboards and reports
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] group shadow-xl shadow-purple-500/10">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">Smart Communication</CardTitle>
                  <CardDescription className="text-purple-200">
                    Integrated messaging and notifications to keep everyone aligned
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] group shadow-xl shadow-purple-500/10">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-500/25 group-hover:scale-110 transition-transform duration-300">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">Enterprise Security</CardTitle>
                  <CardDescription className="text-purple-200">
                    Bank-level encryption and compliance to keep your data safe
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-200 text-sm backdrop-blur-xl mb-4 shadow-lg shadow-purple-500/10">
                <Rocket className="w-4 h-4 mr-2" />
                How It Works
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                From idea to
                <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"> working CRM</span>
                in minutes
              </h2>
              <p className="text-xl text-purple-200 max-w-3xl mx-auto">
                Get started quickly with our intuitive no-code builder and powerful templates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/25">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Choose Template</h3>
                <p className="text-purple-200">Start with one of our proven templates or build from scratch</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/25">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Customize Fields</h3>
                <p className="text-purple-200">Add custom fields, modules, and workflows with drag-and-drop</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/25">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Configure Workflows</h3>
                <p className="text-purple-200">Set up automated processes and business rules</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/25">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Launch & Scale</h3>
                <p className="text-purple-200">Invite your team and start using your custom CRM immediately</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-200 text-sm backdrop-blur-xl mb-4 shadow-lg shadow-purple-500/10">
                <Target className="w-4 h-4 mr-2" />
                Pricing Plans
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Simple pricing for
                <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"> every business</span>
              </h2>
              <p className="text-xl text-purple-200 max-w-3xl mx-auto">
                Start free and scale as you grow. No hidden fees or surprise charges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-white">Starter</CardTitle>
                  <div className="text-4xl font-bold text-white mt-4">
                    $0
                    <span className="text-lg text-purple-200">/month</span>
                  </div>
                  <CardDescription className="text-purple-200">
                    Perfect for small teams getting started
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-purple-200">Up to 5 users</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-purple-200">Basic CRM features</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-purple-200">1 GB storage</span>
                    </div>
                  </div>
                  <Link href="/register">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02]">
                      Start Free
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-white">Professional</CardTitle>
                  <div className="text-4xl font-bold text-white mt-4">
                    $49
                    <span className="text-lg text-purple-200">/month</span>
                  </div>
                  <CardDescription className="text-purple-200">
                    For growing businesses and teams
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-purple-200">Up to 50 users</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-purple-200">Advanced CRM features</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-purple-200">50 GB storage</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-purple-200">Priority support</span>
                    </div>
                  </div>
                  <Link href="/register">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02]">
                      Start Free Trial
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-white">Enterprise</CardTitle>
                  <div className="text-4xl font-bold text-white mt-4">
                    Custom
                    <span className="text-lg text-purple-200">/month</span>
                  </div>
                  <CardDescription className="text-purple-200">
                    For large organizations with custom needs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-purple-200">Unlimited users</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-purple-200">Custom features</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-purple-200">Unlimited storage</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-purple-200">Dedicated support</span>
                    </div>
                  </div>
                  <Link href="/register?enterprise=true">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02]">
                      Contact Sales
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-200 text-sm backdrop-blur-xl mb-4 shadow-lg shadow-purple-500/10">
                <MessageSquare className="w-4 h-4 mr-2" />
                Frequently Asked Questions
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Got questions?
                <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"> We have answers</span>
              </h2>
            </div>

            <div className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">What is Mibuilder?</h3>
                  <p className="text-purple-200">
                    Mibuilder is a no-code CRM platform that allows businesses to create custom workflows, 
                    modules, and automations without writing any code. It's designed to be flexible and 
                    adaptable to your unique business processes.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Do I need technical skills to use Mibuilder?</h3>
                  <p className="text-purple-200">
                    No! Mibuilder is designed for business users. Our drag-and-drop interface and 
                    intuitive builder make it easy for anyone to create powerful CRM solutions without 
                    any technical knowledge.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Can I integrate with other tools?</h3>
                  <p className="text-purple-200">
                    Yes! Mibuilder integrates with popular business tools like Slack, Google Workspace, 
                    Microsoft 365, and more. We also provide a REST API for custom integrations.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Is my data secure?</h3>
                  <p className="text-purple-200">
                    Absolutely. We use bank-level encryption, regular security audits, and comply with 
                    industry standards like GDPR and SOC 2. Your data is always safe and secure.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20">
              <CardContent className="p-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to build your
                  <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"> perfect CRM?</span>
                </h2>
                <p className="text-xl text-purple-200 mb-8">
                  Join thousands of businesses that have transformed their processes with Mibuilder.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/register">
                    <Button size="lg" className="text-xl px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02]">
                      Start Free Trial
                    </Button>
                  </Link>
                  <Link href="/register?demo=true">
                    <Button size="lg" variant="outline" className="text-xl px-12 py-6 text-white border-2 border-white/40 bg-white/10 hover:bg-white/20 hover:border-white/60 backdrop-blur-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-white/20 hover:shadow-white/30">
                      Schedule Demo
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
                  <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-white">Company</h4>
                <ul className="space-y-2 text-purple-200">
                  <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
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
