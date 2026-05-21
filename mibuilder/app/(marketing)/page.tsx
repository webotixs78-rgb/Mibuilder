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
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 left-1/2 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl" />
            <div className="absolute top-20 right-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid gap-16 lg:grid-cols-[1.2fr_0.9fr] items-center">
              <div className="space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center justify-center lg:justify-start gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-purple-100 shadow-lg shadow-purple-500/10 backdrop-blur-xl">
                  <Sparkles className="w-5 h-5 text-purple-300" />
                  <span className="font-semibold">Revolutionary CRM Builder Platform</span>
                </div>

                <div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                    Build your CRM <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">your way</span>
                  </h1>
                  <p className="mt-4 text-lg lg:text-xl text-purple-200 max-w-3xl leading-relaxed">
                    Launch beautiful CRM workflows, dashboards, automations, and team processes with a no-code platform built for modern businesses.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center lg:justify-start gap-4">
                  <Link href="/register">
                    <Button className="min-w-[180px] bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-2xl shadow-purple-500/25 transition-transform duration-300 hover:-translate-y-0.5">
                      Start Free
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button variant="outline" className="min-w-[180px] text-white border border-white/20 hover:bg-white/10 backdrop-blur-xl">
                      View Pricing
                    </Button>
                  </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 mt-10 text-left">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white shadow-xl shadow-purple-500/10">
                    <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Fast setup</h3>
                    <p className="mt-2 text-sm text-purple-300">Get started in minutes with prebuilt CRM templates.</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white shadow-xl shadow-purple-500/10">
                    <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Team-ready</h3>
                    <p className="mt-2 text-sm text-purple-300">Share workflows and manage permissions across teams.</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white shadow-xl shadow-purple-500/10">
                    <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-blue-500 text-white">
                      <BarChart3 className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Real metrics</h3>
                    <p className="mt-2 text-sm text-purple-300">Track performance with dashboards built for growth.</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-4 mb-8">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-purple-300">Live CRM preview</p>
                      <h2 className="mt-3 text-3xl font-bold text-white">Workflow intelligence</h2>
                    </div>
                    <div className="rounded-2xl bg-white/10 px-4 py-2 text-sm text-purple-100">Beta</div>
                  </div>

                  <div className="space-y-6">
                    <div className="rounded-3xl bg-white/5 p-5 border border-white/10">
                      <div className="flex items-center justify-between text-sm text-purple-200">
                        <span>Pipeline velocity</span>
                        <span className="font-semibold text-white">+28%</span>
                      </div>
                      <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                      </div>
                    </div>
                    <div className="rounded-3xl bg-white/5 p-5 border border-white/10">
                      <div className="flex items-center justify-between text-sm text-purple-200">
                        <span>Active deals</span>
                        <span className="font-semibold text-white">136</span>
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        {['New','In progress','Won'].map((label) => (
                          <div key={label} className="rounded-2xl bg-slate-900/70 px-3 py-2 text-center text-xs text-purple-100">{label}</div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-3xl bg-white/5 p-5 border border-white/10">
                      <p className="text-sm text-purple-200">Automations triggered</p>
                      <p className="mt-3 text-2xl font-bold text-white">24</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-200 text-sm backdrop-blur-xl mb-6 shadow-lg shadow-purple-500/10">
              <Sparkles className="w-4 h-4 mr-2" />
              Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Everything you need to build your perfect CRM
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Powerful features that adapt to your business, not the other way around
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <CardTitle className="text-xl text-white">Pipeline Management</CardTitle>
                <CardDescription className="text-purple-200">
                  Visual sales pipelines with drag-and-drop stage management
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] group shadow-xl shadow-purple-500/10">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/25 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">Smart Dashboards</CardTitle>
                <CardDescription className="text-purple-200">
                  Real-time analytics and custom reporting dashboards
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] group shadow-xl shadow-purple-500/10">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/25 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">Forms Builder</CardTitle>
                <CardDescription className="text-purple-200">
                  Capture leads and data with custom web forms
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] group shadow-xl shadow-purple-500/10">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-500/25 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">Automations</CardTitle>
                <CardDescription className="text-purple-200">
                  Set up workflows that save time and reduce errors
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] group shadow-xl shadow-purple-500/10">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/25 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">Team Collaboration</CardTitle>
                <CardDescription className="text-purple-200">
                  Roles, permissions, and activity tracking for teams
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get started in minutes, not months
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Sign Up</h3>
              <p className="text-muted-foreground">Create your free account and workspace</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Choose Template</h3>
              <p className="text-muted-foreground">Start with a template or from scratch</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Customize</h3>
              <p className="text-muted-foreground">Build modules, fields, and workflows</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold mb-2">Launch</h3>
              <p className="text-muted-foreground">Invite your team and start managing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for every business</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Perfect for startups, agencies, and growing companies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Startups & SaaS",
              "Sales Teams", 
              "Real Estate",
              "Service Agencies",
              "Consultants",
              "Clinics & Healthcare",
              "Recruitment",
              "Project Management"
            ].map((useCase) => (
              <Card key={useCase} className="text-center">
                <CardContent className="pt-6">
                  <h3 className="font-semibold">{useCase}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Start free and scale as you grow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Starter</CardTitle>
                <div className="text-3xl font-bold">$0</div>
                <CardDescription>Perfect for small teams</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Up to 3 users",
                  "2 custom modules",
                  "Basic pipelines",
                  "1 dashboard",
                  "Email support"
                ].map((feature) => (
                  <div key={feature} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
                <Button className="w-full mt-6">Get Started</Button>
              </CardContent>
            </Card>

            <Card className="border-primary">
              <CardHeader className="text-center">
                <div className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full inline-block mb-2">
                  Most Popular
                </div>
                <CardTitle>Professional</CardTitle>
                <div className="text-3xl font-bold">$49<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                <CardDescription>For growing businesses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Up to 20 users",
                  "Unlimited modules",
                  "Advanced pipelines",
                  "10 dashboards",
                  "Forms builder",
                  "Automations",
                  "Priority support"
                ].map((feature) => (
                  <div key={feature} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
                <Button className="w-full mt-6">Start Free Trial</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle>Enterprise</CardTitle>
                <div className="text-3xl font-bold">Custom</div>
                <CardDescription>For large organizations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Unlimited users",
                  "Everything in Pro",
                  "Advanced security",
                  "Custom integrations",
                  "Dedicated support",
                  "SLA guarantee",
                  "Custom training"
                ].map((feature) => (
                  <div key={feature} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-6">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently asked questions</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "Do I need coding skills to use Mibuilder?",
                a: "No! Mibuilder is designed for non-technical users. Our visual builder lets you create custom CRM systems without writing any code."
              },
              {
                q: "Can I import my existing data?",
                a: "Yes, you can import data from CSV files, and we're adding direct integrations with popular tools like Google Sheets and Excel."
              },
              {
                q: "Is my data secure?",
                a: "Absolutely. We use enterprise-grade security, encrypt all data, and comply with GDPR and other privacy regulations."
              },
              {
                q: "Can I customize the look and feel?",
                a: "Yes! You can customize colors, logos, and layouts to match your brand identity."
              },
              {
                q: "What if I need help getting started?",
                a: "We offer comprehensive documentation, video tutorials, and personalized onboarding for Professional and Enterprise plans."
              }
            ].map((faq) => (
              <Card key={faq.q}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to build your perfect CRM?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of businesses that have transformed their operations with Mibuilder
          </p>
          <Button size="lg" className="text-lg px-8 py-3">
            Start Your Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="text-sm text-muted-foreground mt-4">14-day free trial • No credit card required</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">Mibuilder</span>
              </div>
              <p className="text-muted-foreground">
                Build your CRM your way — without code.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Features</a></li>
                <li><a href="#" className="hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground">Templates</a></li>
                <li><a href="#" className="hover:text-foreground">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground">Community</a></li>
                <li><a href="#" className="hover:text-foreground">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Mibuilder. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  )
}
