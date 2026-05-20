"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AIAssistantPanel } from "@/components/workspace/AIAssistantPanel"
import { MI_AI_PENDING_APPLY_KEY } from "@/lib/ai/pendingApply"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, ArrowRight, MessageSquare } from "lucide-react"

export default function AIPage() {
  const router = useRouter()
  const [workspaceIds, setWorkspaceIds] = useState<{ id: string; name: string }[]>([])
  const [selectedId, setSelectedId] = useState("")

  useEffect(() => {
    try {
      const list = JSON.parse(localStorage.getItem("workspaces") || "[]") as { id: string; name: string }[]
      const mapped = list.map((w) => ({ id: String(w.id), name: w.name || "Workspace" }))
      setWorkspaceIds(mapped)
      setSelectedId((prev) => prev || mapped[0]?.id || "")
    } catch {
      setWorkspaceIds([])
    }
  }, [])

  const handleApplyFromHub = (payload: unknown, mode: "crm" | "automation" | "insights") => {
    if (!selectedId) {
      alert("Select a workspace above (or create one under Workspaces), then apply again.")
      return
    }
    sessionStorage.setItem(MI_AI_PENDING_APPLY_KEY, JSON.stringify({ payload, mode }))
    router.push(`/workspaces/${selectedId}?ai=1&apply=1`)
  }

  const builderLink = selectedId ? `/workspaces/${selectedId}?ai=1` : "/workspaces"

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-purple-600" />
          CRM AI Copilot
        </h1>
        <p className="text-gray-600 mt-1">
          Generate boards, fields, and automations from plain language. Preview JSON here, then apply into your CRM builder.
        </p>
      </div>

      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Where to apply changes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            AI configuration is merged into a workspace&apos;s CRM builder. Pick the workspace that should receive the generated structure.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <label className="text-sm font-medium text-gray-700 shrink-0">Workspace</label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
            >
              {workspaceIds.length === 0 ? (
                <option value="">No workspaces yet</option>
              ) : (
                workspaceIds.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name}
                  </option>
                ))
              )}
            </select>
            <Button asChild variant="outline" className="shrink-0">
              <Link href="/workspaces">
                Manage workspaces
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
            <Button asChild className="bg-purple-600 hover:bg-purple-700 shrink-0">
              <Link href={builderLink}>
                Open builder + AI panel
                <Sparkles className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
          <div className="border-b border-gray-100 px-4 py-3 bg-gray-50">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-600" />
              Generate configuration
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Uses the same APIs as the CRM builder. Click Apply to jump to the workspace and merge (with your existing confirmations).
            </p>
          </div>
          <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 min-h-[520px]">
            <AIAssistantPanel className="w-full max-w-none border-0 min-h-[480px]" onApply={handleApplyFromHub} />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tips</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 space-y-2">
            <p>
              <strong className="text-gray-800">Apply</strong> saves your JSON temporarily and opens the workspace to finish merging — nothing is changed until you confirm in the builder.
            </p>
            <p>
              Prefer working entirely in the builder? Use{" "}
              <strong className="text-gray-800">Open builder + AI panel</strong> for the full purple CRM UI.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
