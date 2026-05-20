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
  HelpCircle
} from "lucide-react"

export default function FAQPage() {
  const faqs = [
    {
      question: "Do I need coding skills to use Mibuilder?",
      answer: "No! Mibuilder is designed for non-technical users. Our visual builder lets you create custom CRM systems without writing any code."
    },
    {
      question: "Can I import my existing data?",
      answer: "Yes, you can import data from CSV files, and we're adding direct integrations with popular tools like Google Sheets and Excel."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use enterprise-grade security, encrypt all data, and comply with GDPR and other privacy regulations."
    },
    {
      question: "Can I customize the look and feel?",
      answer: "Yes! You can customize colors, logos, and layouts to match your brand identity."
    },
    {
      question: "What if I need help getting started?",
      answer: "We offer comprehensive documentation, video tutorials, and personalized onboarding for Professional and Enterprise plans."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. No questions asked and no hidden fees."
    },
    {
      question: "Do you offer API access?",
      answer: "Yes, Professional and Enterprise plans include full API access for custom integrations."
    },
    {
      question: "How many team members can I have?",
      answer: "Starter plan includes up to 3 users, Professional plan includes up to 20 users, and Enterprise plan has unlimited users."
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
                <Link href="/pricing" className="text-white/80 hover:text-white transition-colors">Pricing</Link>
                <Link href="/faq" className="text-white font-medium">FAQ</Link>
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
              <HelpCircle className="w-4 h-4 mr-2" />
              FAQ
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Frequently asked questions
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto mb-12">
              Everything you need to know about Mibuilder
            </p>
          </div>
        </section>

        {/* FAQ Items */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 shadow-xl shadow-purple-500/10">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                      {faq.question}
                    </h3>
                    <p className="text-purple-200 ml-8">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Help Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl shadow-purple-500/20">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Still have questions?</h2>
                <p className="text-xl text-purple-200 mb-8">
                  Can't find the answer you're looking for? Our support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm">
                      Contact Support
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/docs">
                    <Button variant="outline" className="text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl">
                      View Documentation
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Helpful Resources</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Wrench className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Getting Started Guide</h3>
                  <p className="text-purple-200 mb-4">
                    Learn the basics and set up your first CRM in minutes
                  </p>
                  <Link href="/docs/getting-started">
                    <Button variant="outline" className="text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-sm w-full">
                      Read Guide
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Video Tutorials</h3>
                  <p className="text-purple-200 mb-4">
                    Watch step-by-step video guides for advanced features
                  </p>
                  <Link href="/tutorials">
                    <Button variant="outline" className="text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-sm w-full">
                      Watch Videos
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Community Forum</h3>
                  <p className="text-purple-200 mb-4">
                    Connect with other users and share best practices
                  </p>
                  <Link href="/community">
                    <Button variant="outline" className="text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-sm w-full">
                      Join Community
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl shadow-purple-500/20">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to start building?</h2>
              <p className="text-xl text-purple-200 mb-8">
                Join thousands of businesses using Mibuilder to build their perfect CRM
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
