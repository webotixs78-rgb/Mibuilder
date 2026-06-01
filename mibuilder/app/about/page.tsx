"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Users, Target, Award, Globe, Heart, Wrench, Sparkles, Shield, Rocket } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
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
              <Heart className="w-4 h-4 mr-2" />
              Our Story
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Building the future of
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"> no-code CRM</span>
            </h1>
            <p className="text-xl text-purple-200 mb-8">
              We're on a mission to empower businesses to create custom CRM solutions without writing a single line of code.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/register">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02]">
                  Start Your Journey
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-purple-200 mb-6">
                  To democratize CRM development by providing powerful no-code tools that enable businesses of all sizes to create custom solutions tailored to their unique needs.
                </p>
                <p className="text-lg text-purple-200 mb-6">
                  We believe that every business deserves a CRM that works exactly the way they do, without the complexity and cost of traditional development.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-purple-400" />
                    <span className="text-purple-200">Mission-driven</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-purple-400" />
                    <span className="text-purple-200">Customer-focused</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-white mb-2">10K+</div>
                    <p className="text-purple-200">Active Users</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-white mb-2">50+</div>
                    <p className="text-purple-200">Countries</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                    <p className="text-purple-200">Uptime</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-white mb-2">24/7</div>
                    <p className="text-purple-200">Support</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Values
              </h2>
              <p className="text-xl text-purple-200 max-w-3xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">Innovation</CardTitle>
                  <CardDescription className="text-purple-200">
                    Constantly pushing boundaries to create better solutions for our users
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">Trust</CardTitle>
                  <CardDescription className="text-purple-200">
                    Building reliable, secure solutions that our customers can depend on
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/25">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">Community</CardTitle>
                  <CardDescription className="text-purple-200">
                    Fostering a supportive environment where everyone can succeed
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/25">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">Growth</CardTitle>
                  <CardDescription className="text-purple-200">
                    Helping our customers grow while we grow together
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">Accessibility</CardTitle>
                  <CardDescription className="text-purple-200">
                    Making powerful tools available to everyone, regardless of technical background
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-500/25">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">Excellence</CardTitle>
                  <CardDescription className="text-purple-200">
                    Delivering the highest quality in everything we build and support
                  </CardDescription>
                </CardHeader>
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
                  Join us in building the
                  <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"> future of CRM</span>
                </h2>
                <p className="text-xl text-purple-200 mb-8">
                  Whether you're a business looking to transform your processes or a developer wanting to build amazing solutions, Mibuilder is for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/register">
                    <Button size="lg" className="text-xl px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02]">
                      Get Started Free
                    </Button>
                  </Link>
                  <Link href="/careers">
                    <Button size="lg" variant="outline" className="text-xl px-12 py-6 text-white border-2 border-white/40 bg-white/10 hover:bg-white/20 hover:border-white/60 backdrop-blur-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-white/20 hover:shadow-white/30">
                      Join Our Team
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

