"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Users, 
  Plus, 
  Settings, 
  Star,
  Building,
  Globe,
  Shield,
  BarChart3,
  Sparkles,
  Zap,
  Rocket,
  Wrench,
  ArrowRight,
  CheckCircle
} from "lucide-react"

const workspaces = [
  {
    id: 1,
    name: "Acme Corporation",
    description: "Main company workspace",
    members: 24,
    projects: 12,
    avatar: "AC",
    isOwner: true,
    lastActive: "2 hours ago",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    name: "Marketing Team",
    description: "Marketing projects and campaigns",
    members: 8,
    projects: 6,
    avatar: "MT",
    isOwner: true,
    lastActive: "1 day ago",
    gradient: "from-blue-500 to-purple-500"
  },
  {
    id: 3,
    name: "Product Development",
    description: "Software development and R&D",
    members: 15,
    projects: 18,
    avatar: "PD",
    isOwner: false,
    lastActive: "3 hours ago",
    gradient: "from-green-500 to-blue-500"
  },
]

export default function WorkspacesPage() {
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

      <div className="relative z-10 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Workspaces</h1>
                <p className="text-purple-200">Manage your workspaces and team collaboration</p>
              </div>
            </div>
          </div>
          <Link href="/app/workspaces/create">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02] backdrop-blur-sm">
              <Plus className="w-4 h-4 mr-2" />
              Create Workspace
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-200">Total Workspaces</p>
                  <p className="text-2xl font-bold text-white">{workspaces.length}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Building className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-200">Team Members</p>
                  <p className="text-2xl font-bold text-white">47</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-200">Total Projects</p>
                  <p className="text-2xl font-bold text-white">36</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-200">Active Users</p>
                  <p className="text-2xl font-bold text-white">32</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                  <Globe className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workspaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.map((workspace) => (
            <Card key={workspace.id} className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] shadow-xl shadow-purple-500/10">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${workspace.gradient} rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25`}>
                      <span className="text-white font-bold text-sm">{workspace.avatar}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{workspace.name}</h3>
                      <p className="text-sm text-purple-200">{workspace.description}</p>
                    </div>
                  </div>
                  {workspace.isOwner && (
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs text-yellow-300">Owner</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-purple-200">Members</span>
                    <span className="font-medium text-white">{workspace.members}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-purple-200">Projects</span>
                    <span className="font-medium text-white">{workspace.projects}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-purple-200">Last active</span>
                    <span className="font-medium text-white">{workspace.lastActive}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-4 border-t border-white/10">
                  <Button variant="outline" size="sm" className="flex-1 text-purple-200 border-white/20 hover:bg-white/10 hover:text-white backdrop-blur-sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-purple-200 border-white/20 hover:bg-white/10 hover:text-white backdrop-blur-sm">
                    <Users className="w-4 h-4 mr-2" />
                    Members
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-purple-200 border-white/20 hover:bg-white/10 hover:text-white backdrop-blur-sm">
                    <Shield className="w-4 h-4 mr-2" />
                    Permissions
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Invite Section */}
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-purple-500/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
              Invite to Workspace
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <input
                type="email"
                placeholder="Enter email addresses"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:border-purple-400 focus:ring-purple-400/20 backdrop-blur-sm focus:outline-none"
              />
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm">
                <Plus className="w-4 h-4 mr-2" />
                Invite
              </Button>
            </div>
          </CardContent>
        </Card>
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
