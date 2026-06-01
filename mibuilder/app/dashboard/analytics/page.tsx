"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, BarChart3, Users, Activity, TrendingUp, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProtectedRoute } from "@/components/ProtectedRoute"

interface WorkspaceData {
  id: string
  name: string
  status?: string
  modules?: number
  boards?: any[]
}

export default function AnalyticsPage() {
  const [workspaces, setWorkspaces] = useState<WorkspaceData[]>([])
  const [teamMembers, setTeamMembers] = useState<number>(0)
  const [stats, setStats] = useState({
    activeWorkspaces: 0,
    totalWorkspaces: 0,
    totalModules: 0,
    totalRecords: 0
  })

  useEffect(() => {
    const savedWorkspaces = JSON.parse(localStorage.getItem("workspaces") || "[]")
    setWorkspaces(savedWorkspaces)

    const savedTeamMembers = JSON.parse(localStorage.getItem("teamMembers") || "[]")
    setTeamMembers(savedTeamMembers.length)

    const totalModules = savedWorkspaces.reduce((sum: number, workspace: any) => sum + (workspace.modules || workspace.boards?.length || 0), 0)
    const totalRecords = savedWorkspaces.reduce((sum: number, workspace: any) => {
      if (Array.isArray(workspace.boards)) {
        return sum + workspace.boards.reduce((subSum: number, board: any) => subSum + (Array.isArray(board.rows) ? board.rows.length : 0), 0)
      }
      return sum
    }, 0)

    setStats({
      activeWorkspaces: savedWorkspaces.filter((workspace: any) => workspace.status === "active").length,
      totalWorkspaces: savedWorkspaces.length,
      totalModules,
      totalRecords
    })
  }, [])

  const progress = Math.min(100, Math.round((stats.totalRecords / Math.max(1, stats.totalWorkspaces)) * 10))

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative text-white">
        <div className="absolute inset-0 bg-gradient-radial from-purple-600/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-radial from-pink-600/20 via-transparent to-transparent" style={{ backgroundPosition: '70% 30%' }} />
        <div className="relative z-10">
          <nav className="border-b border-white/10 backdrop-blur-xl bg-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/25">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">Analytics</span>
                </div>
                <Link href="/dashboard" className="text-white/80 hover:text-white transition-colors">Back to Dashboard</Link>
              </div>
            </div>
          </nav>

          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-purple-300">Performance overview</p>
                <h1 className="text-4xl font-bold">Workspace analytics</h1>
                <p className="text-purple-200 max-w-2xl mt-4">
                  Review the most important metrics for your CRM workspaces and team activity.
                </p>
              </div>
              <Button asChild>
                <Link href="/dashboard" className="bg-white/10 text-white hover:bg-white/20 rounded-xl px-5 py-3 inline-flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Return
                </Link>
              </Button>
            </div>

            <div className="grid gap-6 mt-10 md:grid-cols-2 xl:grid-cols-4">
              <Card className="bg-white/10 border border-white/10 shadow-xl shadow-purple-500/10">
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-purple-200">Workspaces</span>
                    <Database className="w-5 h-5 text-purple-300" />
                  </div>
                  <p className="text-4xl font-semibold text-white">{stats.totalWorkspaces}</p>
                  <p className="text-sm text-purple-300 mt-3">Active: {stats.activeWorkspaces}</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 border border-white/10 shadow-xl shadow-purple-500/10">
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-purple-200">Team Members</span>
                    <Users className="w-5 h-5 text-purple-300" />
                  </div>
                  <p className="text-4xl font-semibold text-white">{teamMembers || 0}</p>
                  <p className="text-sm text-purple-300 mt-3">Invited members across workspaces</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 border border-white/10 shadow-xl shadow-purple-500/10">
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-purple-200">Modules</span>
                    <TrendingUp className="w-5 h-5 text-purple-300" />
                  </div>
                  <p className="text-4xl font-semibold text-white">{stats.totalModules}</p>
                  <p className="text-sm text-purple-300 mt-3">Configured boards and modules</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 border border-white/10 shadow-xl shadow-purple-500/10">
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-purple-200">Records</span>
                    <Activity className="w-5 h-5 text-purple-300" />
                  </div>
                  <p className="text-4xl font-semibold text-white">{stats.totalRecords}</p>
                  <p className="text-sm text-purple-300 mt-3">Entries across active boards</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Card className="bg-white/10 border border-white/10 shadow-xl shadow-purple-500/10">
                <CardHeader>
                  <CardTitle>Team adoption</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm text-purple-200 mb-2">
                        <span>Invites accepted</span>
                        <span>{teamMembers} invited</span>
                      </div>
                      <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${Math.min(100, teamMembers * 10)}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm text-purple-200 mb-2">
                        <span>Average row growth</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-green-500 to-blue-500" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border border-white/10 shadow-xl shadow-purple-500/10">
                <CardHeader>
                  <CardTitle>Workspace health</CardTitle>
                </CardHeader>
                <CardContent>
                  {workspaces.length === 0 ? (
                    <p className="text-purple-200">No workspaces found. Create a workspace to begin tracking analytics.</p>
                  ) : (
                    <div className="space-y-4">
                      {workspaces.slice(0, 3).map((workspace) => (
                        <div key={workspace.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-semibold text-white">{workspace.name || "Unnamed workspace"}</p>
                            <span className="text-xs text-purple-300">{workspace.status || "Active"}</span>
                          </div>
                          <p className="text-sm text-purple-200">Modules: {workspace.modules || workspace.boards?.length || 0}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
