"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProtectedRoute } from "@/components/ProtectedRoute"

interface WorkspaceItem {
  id: string
  name: string
  description?: string
}

interface TeamMember {
  id: string
  email: string
  name: string
  role: string
  invitedAt: string
  workspaceId: string
}

export default function InviteTeamPage() {
  const [workspaces, setWorkspaces] = useState<WorkspaceItem[]>([])
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>("")
  const [email, setEmail] = useState("")
  const [members, setMembers] = useState<TeamMember[]>([])
  const [feedback, setFeedback] = useState("")

  useEffect(() => {
    const savedWorkspaces = JSON.parse(localStorage.getItem("workspaces") || "[]")
    const normalizedWorkspaces = savedWorkspaces.map((workspace: any) => ({
      id: workspace.id,
      name: workspace.name || "Untitled Workspace",
      description: workspace.description || ""
    }))
    setWorkspaces(normalizedWorkspaces)

    if (normalizedWorkspaces.length > 0) {
      setSelectedWorkspaceId((prev) => prev || normalizedWorkspaces[0].id)
    }
  }, [])

  useEffect(() => {
    if (!selectedWorkspaceId) {
      setMembers([])
      return
    }

    const savedMembers = JSON.parse(localStorage.getItem(`workspace_members_${selectedWorkspaceId}`) || "[]")
    setMembers(savedMembers)
  }, [selectedWorkspaceId])

  const handleInvite = () => {
    if (!email.trim() || !selectedWorkspaceId) {
      setFeedback("Please choose a workspace and enter an email.")
      return
    }

    const newMember: TeamMember = {
      id: Date.now().toString(),
      email: email.trim(),
      name: email.split("@")[0],
      role: "Member",
      invitedAt: new Date().toISOString(),
      workspaceId: selectedWorkspaceId
    }

    const updatedMembers = [...members, newMember]
    localStorage.setItem(`workspace_members_${selectedWorkspaceId}`, JSON.stringify(updatedMembers))
    setMembers(updatedMembers)
    setEmail("")
    setFeedback(`Invitation sent to ${newMember.email}`)
  }

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
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">Invite Team</span>
                </div>
                <Link href="/dashboard" className="text-white/80 hover:text-white transition-colors">Back to Dashboard</Link>
              </div>
            </div>
          </nav>

          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
              <Card className="bg-white/10 border border-white/15 shadow-2xl shadow-purple-500/10">
                <CardHeader>
                  <CardTitle className="text-3xl text-white">Workspace Team Access</CardTitle>
                  <CardDescription className="text-purple-200">
                    Invite collaborators and assign access to workspaces.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-purple-200">Workspace</label>
                    <select
                      value={selectedWorkspaceId}
                      onChange={(event) => setSelectedWorkspaceId(event.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                    >
                      {workspaces.map((workspace) => (
                        <option key={workspace.id} value={workspace.id} className="bg-slate-900 text-white">
                          {workspace.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-purple-200">Team Member Email</label>
                    <div className="flex gap-3">
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="flex-1 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                      />
                      <Button onClick={handleInvite} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0">
                        Invite
                      </Button>
                    </div>
                    {feedback && <p className="text-sm text-emerald-300">{feedback}</p>}
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-purple-200">Assigned workspace</p>
                        <h2 className="text-xl font-semibold text-white">{workspaces.find((workspace) => workspace.id === selectedWorkspaceId)?.name || "No workspace selected"}</h2>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 px-3 py-2 text-sm text-white">
                        <CheckCircle className="w-4 h-4" />
                        Access control
                      </div>
                    </div>
                    <p className="text-purple-200">Team members invited here will be stored per workspace and visible on the workspace access panel.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border border-white/15 shadow-2xl shadow-purple-500/10">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Current Invitations</CardTitle>
                  <CardDescription className="text-purple-200">Manage members assigned to the selected workspace.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {members.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-8 text-center text-purple-200">
                      <p>No team members have been invited yet.</p>
                      <p className="mt-2 text-sm text-purple-300">Send the first invitation to grant access.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {members.map((member) => (
                        <div key={member.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="font-semibold text-white">{member.name}</p>
                              <p className="text-sm text-purple-200">{member.email}</p>
                            </div>
                            <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs text-purple-100">{member.role}</span>
                          </div>
                          <p className="mt-3 text-sm text-purple-300">Invited {new Date(member.invitedAt).toLocaleDateString()}</p>
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
