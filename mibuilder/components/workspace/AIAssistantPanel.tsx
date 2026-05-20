"use client"

import React, { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sparkles, Loader2, AlertCircle } from "lucide-react"

type AssistantMode = "crm" | "automation" | "insights"

interface AIAssistantPanelProps {
  onApply: (payload: any, mode: AssistantMode) => void
  /** Merged onto root; use e.g. `w-full border-0` when embedding outside the purple builder. */
  className?: string
}

export function AIAssistantPanel({ onApply, className = "" }: AIAssistantPanelProps) {
  const [mode, setMode] = useState<AssistantMode>("crm")
  const [prompt, setPrompt] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<any>(null)

  const endpoint = useMemo(() => {
    if (mode === "automation") return "/api/ai/generate-automation"
    return "/api/ai/generate-crm"
  }, [mode])

  const summary = useMemo(() => {
    if (!result || typeof result !== "object") return null

    const boards = Array.isArray(result.boards) ? result.boards.length : 0
    const fields = Array.isArray(result.fields) ? result.fields.length : 0
    const automations = Array.isArray(result.automations) ? result.automations.length : 0
    const pipelines = Array.isArray(result.pipelines) ? result.pipelines.length : 0
    const forms = Array.isArray(result.forms) ? result.forms.length : 0
    const hasInsights = result.insights && typeof result.insights === "object"

    return { boards, fields, automations, pipelines, forms, hasInsights }
  }, [result])

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a request.")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const finalPrompt =
        mode === "insights"
          ? `${prompt}\n\nReturn lightweight CRM insights in the insights object and keep other arrays empty unless needed.`
          : prompt

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: finalPrompt,
          apiKey: apiKey.trim() || undefined
        })
      })

      const data = await response.json()
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Failed to generate AI output")
      }

      if (typeof data.data !== "object" || data.data === null) {
        throw new Error("AI output is not valid JSON")
      }

      setResult(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected AI error")
      setResult(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={cn(
        "w-[420px] border-l border-white/10 bg-white/5 p-4 overflow-y-auto",
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-300" />
          AI Assistant Panel
        </h3>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={mode === "crm" ? "default" : "ghost"}
            className="text-xs text-white"
            onClick={() => setMode("crm")}
          >
            CRM
          </Button>
          <Button
            variant={mode === "automation" ? "default" : "ghost"}
            className="text-xs text-white"
            onClick={() => setMode("automation")}
          >
            Automation
          </Button>
          <Button
            variant={mode === "insights" ? "default" : "ghost"}
            className="text-xs text-white"
            onClick={() => setMode("insights")}
          >
            Insights
          </Button>
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='Example: "Create a CRM for real estate leads with auto follow-up and agent assignment"'
          className="w-full min-h-[110px] p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300/60 text-sm focus:outline-none focus:border-purple-500"
        />

        <input
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          type="password"
          placeholder="Optional OpenAI API key (uses env key if empty)"
          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300/60 text-sm focus:outline-none focus:border-purple-500"
        />

        <Button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
        >
          {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
          Generate
        </Button>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-200 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{error} Please retry.</span>
          </div>
        )}

        <div>
          {summary && (
            <div className="mb-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-2 text-[11px] text-emerald-200">
              Planned apply: +{summary.boards} boards, +{summary.fields} fields, +{summary.automations} automations, +{summary.pipelines} pipelines, +{summary.forms} forms{summary.hasInsights ? ", insights included" : ""}
            </div>
          )}
          <p className="text-purple-200 text-xs mb-2">Output Preview (JSON)</p>
          <pre className="bg-black/30 border border-white/10 rounded-lg p-3 text-[11px] text-purple-100 overflow-auto max-h-[320px]">
            {result ? JSON.stringify(result, null, 2) : "{ }"}
          </pre>
        </div>

        <Button
          disabled={!result}
          onClick={() => onApply(result, mode)}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50"
        >
          Apply to CRM
        </Button>
      </div>
    </div>
  )
}
