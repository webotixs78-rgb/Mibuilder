"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Users, MessageCircle, Heart, Star, Wrench, Sparkles, Shield, Rocket, Globe, Award, Calendar } from "lucide-react"
import Link from "next/link"

export default function CommunityPage() {
  const communityStats = [
    { number: "10K+", label: "Active Members" },
    { number: "5K+", label: "Discussions" },
    { number: "2K+", label: "Solutions Shared" },
    { number: "24/7", label: "Community Support" }
  ]

  const featuredTopics = [
    {
      title: "Getting Started Tips",
      description: "Share your tips and tricks for new users",
      icon: Rocket,
      gradient: "from-purple-500 to-pink-500",
      posts: 156,
      members: 234
    },
    {
      title: "API Integrations",
      description: "Discuss API usage and integrations",
      icon: Globe,
      gradient: "from-blue-500 to-purple-500",
      posts: 89,
      members: 167
    },
    {
      title: "Best Practices",
      description: "Share workflows and optimization strategies",
      icon: Award,
      gradient: "from-green-500 to-blue-500",
      posts: 203,
      members: 312
    },
    {
      title: "Feature Requests",
      description: "Suggest and vote on new features",
      icon: Star,
      gradient: "from-orange-500 to-red-500",
      posts: 145,
      members: 189
    }
  ]

  const recentPosts = [
    {
      title: "How I automated my sales pipeline with Mibuilder",
      author: "Sarah Chen",
      avatar: "SC",
      category: "Success Story",
      replies: 23,
      likes: 145,
      time: "2 hours ago"
    },
    {
      title: "New integration with Slack - setup guide",
      author: "Mike Rodriguez",
      avatar: "MR",
      category: "Integration",
      replies: 18,
      likes: 89,
      time: "5 hours ago"
    },
    {
      title: "Custom field types you might not know about",
      author: "Emily Watson",
      avatar: "EW",
      category: "Tips & Tricks",
      replies: 31,
      likes: 201,
      time: "1 day ago"
    },
    {
      title: "Performance optimization for large datasets",
      author: "Alex Kim",
      avatar: "AK",
      category: "Performance",
      replies: 15,
      likes: 67,
      time: "2 days ago"
    }
  ]

  const topContributors = [
    { name: "Sarah Chen", avatar: "SC", posts: 234, reputation: 2847 },
    { name: "Mike Rodriguez", avatar: "MR", posts: 189, reputation: 2156 },
    { name: "Emily Watson", avatar: "EW", posts: 167, reputation: 1923 },
    { name: "Alex Kim", avatar: "AK", posts: 145, reputation: 1678 }
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
              <Users className="w-4 h-4 mr-2" />
              Community
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Join our amazing
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"> community</span>
            </h1>
            <p className="text-xl text-purple-200 mb-8">
              Connect with thousands of Mibuilder users, share experiences, and get help from peers around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/register">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02]">
                  Join Community
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" className="text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-xl">
                  Browse Discussions
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Community Stats */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {communityStats.map((stat, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 text-center shadow-xl shadow-purple-500/10">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                    <p className="text-purple-200">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Topics */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Popular Topics
              </h2>
              <p className="text-xl text-purple-200 max-w-3xl mx-auto">
                Join discussions that matter to you
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredTopics.map((topic, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10 cursor-pointer">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${topic.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25`}>
                      <topic.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white">{topic.title}</CardTitle>
                    <CardDescription className="text-purple-200">
                      {topic.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="flex items-center justify-center space-x-4 text-purple-200 text-sm">
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{topic.posts}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{topic.members}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Posts */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Recent Discussions
              </h2>
              <p className="text-xl text-purple-200">
                Latest posts from our community
              </p>
            </div>

            <div className="space-y-6">
              {recentPosts.map((post, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 shadow-xl shadow-purple-500/10">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg shadow-purple-500/25">
                        {post.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-white hover:text-purple-200 transition-colors cursor-pointer">
                            {post.title}
                          </h3>
                          <span className="text-purple-300 text-sm">{post.time}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-purple-200 text-sm mb-2">
                          <span>{post.author}</span>
                          <span className="inline-flex items-center px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs">
                            {post.category}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-purple-300 text-sm">
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.replies}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Top Contributors */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Top Contributors
              </h2>
              <p className="text-xl text-purple-200">
                Recognizing our most active community members
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {topContributors.map((contributor, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-xl mx-auto mb-4 shadow-lg shadow-purple-500/25">
                      {contributor.avatar}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{contributor.name}</h3>
                    <div className="space-y-2 text-purple-200 text-sm">
                      <div className="flex items-center justify-center space-x-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>{contributor.posts} posts</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Star className="w-4 h-4" />
                        <span>{contributor.reputation} rep</span>
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
                  Ready to join the conversation?
                  <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"> Sign up now</span>
                </h2>
                <p className="text-xl text-purple-200 mb-8">
                  Share your knowledge, learn from others, and help shape the future of Mibuilder.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/register">
                    <Button size="lg" className="text-xl px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02]">
                      Join Community
                    </Button>
                  </Link>
                  <Link href="/help">
                    <Button size="lg" variant="outline" className="text-xl px-12 py-6 text-white border-2 border-white/40 bg-white/10 hover:bg-white/20 hover:border-white/60 backdrop-blur-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-white/20 hover:shadow-white/30">
                      Get Help
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
