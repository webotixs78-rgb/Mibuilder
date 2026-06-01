"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Wrench, 
  ArrowRight, 
  Sparkles, 
  Shield,
  Rocket,
  CheckCircle,
  Star,
  Users
} from "lucide-react"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      description: "Perfect for small teams",
      features: [
        "Up to 3 users",
        "2 custom modules",
        "Basic pipelines",
        "1 dashboard",
        "Email support"
      ],
      highlighted: false
    },
    {
      name: "Professional",
      price: "$49",
      period: "/mo",
      description: "For growing businesses",
      features: [
        "Up to 20 users",
        "Unlimited modules",
        "Advanced pipelines",
        "10 dashboards",
        "Forms builder",
        "Automations",
        "Priority support"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Unlimited users",
        "Everything in Pro",
        "Advanced security",
        "Custom integrations",
        "Dedicated support",
        "SLA guarantee",
        "Custom training"
      ],
      highlighted: false
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
                <Link href="/how-it-works" className="text-white/80 hover:text-white transition-colors">How it Works</Link>
                <Link href="/pricing" className="text-white font-medium">Pricing</Link>
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
              Pricing
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto mb-12">
              Start free and scale as you grow. No hidden fees or surprises.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-2xl shadow-2xl shadow-purple-500/10">
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card key={index} className={`bg-white/10 backdrop-blur-xl border ${plan.highlighted ? 'border-purple-400' : 'border-white/20'} hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10 relative`}>
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm px-4 py-2 rounded-full shadow-lg shadow-purple-500/25">
                        Most Popular
                      </div>
                    </div>
                  )}
                  <CardHeader className="text-center pt-8">
                    <CardTitle className="text-2xl font-bold text-white mb-2">{plan.name}</CardTitle>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      {plan.period && <span className="text-lg text-purple-200 ml-1">{plan.period}</span>}
                    </div>
                    <CardContent className="text-purple-200">
                      {plan.description}
                    </CardContent>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-purple-200 text-sm">{feature}</span>
                      </div>
                    ))}
                    <div className="pt-6">
                      {plan.name === "Enterprise" ? (
                        <Link href="/contact">
                          <Button variant="outline" className="w-full text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl">
                            Contact Sales
                          </Button>
                        </Link>
                      ) : (
                        <Link href="/register">
                          <Button className={`w-full ${plan.highlighted ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' : 'bg-white/20 hover:bg-white/30'} text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm`}>
                            {plan.name === "Starter" ? "Get Started" : "Start Free Trial"}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-slate-950/20 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl shadow-2xl shadow-purple-500/10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Frequently asked questions</h2>
            </div>

            <div className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Can I change plans anytime?</h3>
                  <p className="text-purple-200">
                    Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">What happens after my free trial?</h3>
                  <p className="text-purple-200">
                    After your 14-day free trial, you can choose to upgrade to a paid plan or continue with our free tier.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Do you offer refunds?</h3>
                  <p className="text-purple-200">
                    Yes, we offer a 30-day money-back guarantee for all paid plans.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[2rem] p-12 shadow-2xl shadow-purple-500/20">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
              <p className="text-xl text-purple-200 mb-8">
                Join thousands of businesses using Mibuilder to build their perfect CRM
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/features">
                  <Button size="lg" variant="outline" className="text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl">
                    View Features
                  </Button>
                </Link>
              </div>
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
