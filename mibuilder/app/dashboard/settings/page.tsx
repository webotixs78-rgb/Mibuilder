"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Settings, Globe, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProtectedRoute } from "@/components/ProtectedRoute"

interface DashboardSettings {
  theme: string
  notifications: boolean
  language: string
  defaultView: string
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<DashboardSettings>({
    theme: "dark",
    notifications: true,
    language: "english",
    defaultView: "Table"
  })

  useEffect(() => {
    const saved = localStorage.getItem("dashboardSettings")
    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("dashboardSettings", JSON.stringify(settings))
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
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/25">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">Dashboard Settings</span>
                </div>
                <Link href="/dashboard" className="text-white/80 hover:text-white transition-colors">Back to Dashboard</Link>
              </div>
            </div>
          </nav>

          <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white/10 border border-white/10 shadow-xl shadow-purple-500/10">
                  <CardHeader>
                    <CardTitle>Account Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-purple-200 mb-2">Default Workspace View</label>
                      <select
                        value={settings.defaultView}
                        onChange={(event) => setSettings({ ...settings, defaultView: event.target.value })}
                        className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                      >
                        <option value="Table">Table</option>
                        <option value="Kanban">Kanban</option>
                        <option value="Calendar">Calendar</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-purple-200 mb-2">Language</label>
                      <select
                        value={settings.language}
                        onChange={(event) => setSettings({ ...settings, language: event.target.value })}
                        className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                      >
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="german">German</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-4">
                      <div>
                        <p className="font-semibold text-white">Notifications</p>
                        <p className="text-sm text-purple-200">Receive workspace alerts and updates.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications}
                          onChange={(event) => setSettings({ ...settings, notifications: event.target.checked })}
                          className="sr-only"
                        />
                        <span className="w-11 h-6 bg-white/10 rounded-full shadow-inner transition-colors duration-200"></span>
                        <span className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${settings.notifications ? "translate-x-5" : "translate-x-0"}`} />
                      </label>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 border border-white/10 shadow-xl shadow-purple-500/10">
                  <CardHeader>
                    <CardTitle>Security & Access</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <Globe className="w-5 h-5 text-purple-300" />
                        <div>
                          <p className="font-medium text-white">Workspace sharing</p>
                          <p className="text-sm text-purple-200">Control who can join workspaces and what they can access.</p>
                        </div>
                      </div>
                      <p className="text-sm text-purple-200">Use the invite panel to assign team members to specific workspaces and maintain private access per board.</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <Bell className="w-5 h-5 text-purple-300" />
                        <div>
                          <p className="font-medium text-white">Alert preferences</p>
                          <p className="text-sm text-purple-200">Set up email and activity notifications for workspace events.</p>
                        </div>
                      </div>
                      <p className="text-sm text-purple-200">Saved preferences will be available next time you log in.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/10 border border-white/10 shadow-xl shadow-purple-500/10">
                <CardHeader>
                  <CardTitle>Save Changes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-purple-200">Apply your dashboard preferences and retain them across sessions.</p>
                  <Button onClick={handleSave} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0">
                    Save Settings
                  </Button>
                  <Button asChild variant="outline" className="w-full text-white border-white/20">
                    <Link href="/dashboard" className="inline-flex items-center justify-center gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Back to dashboard
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
