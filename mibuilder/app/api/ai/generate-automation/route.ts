import { NextRequest, NextResponse } from "next/server"
import { AUTOMATION_SYSTEM_PROMPT, automationGenerationSchema, callOpenAIJSON } from "@/lib/ai/assistant"

function logAIFailure(context: {
  route: string
  promptLength: number
  hasApiKey: boolean
  error: unknown
}) {
  console.error("[AI_ASSISTANT_FAILURE]", {
    route: context.route,
    promptLength: context.promptLength,
    hasApiKey: context.hasApiKey,
    timestamp: new Date().toISOString(),
    errorMessage: context.error instanceof Error ? context.error.message : String(context.error)
  })
}

function generateMockAutomations(prompt: string) {
  const isFollowUp = prompt.toLowerCase().includes("follow")

  return {
    automations: [
      {
        name: isFollowUp ? "Auto Follow-up" : "Smart Lead Assignment",
        description: isFollowUp
          ? "Send and track follow-up when a new lead is created."
          : "Auto-assign incoming leads to available agents.",
        trigger: {
          type: "record_created"
        },
        conditions: [],
        actions: isFollowUp
          ? [
              {
                type: "send_email",
                config: {
                  subject: "Thanks for your inquiry",
                  body: "We received your request and will contact you shortly."
                }
              },
              {
                type: "update_field",
                config: {
                  field: "status",
                  value: "Contacted"
                }
              }
            ]
          : [
              {
                type: "assign_user",
                config: {
                  strategy: "round_robin"
                }
              }
            ]
      }
    ]
  }
}

export async function POST(request: NextRequest) {
  let promptLength = 0
  let hasApiKey = Boolean(process.env.OPENAI_API_KEY)
  try {
    const { prompt, apiKey } = await request.json()
    promptLength = typeof prompt === "string" ? prompt.length : 0
    hasApiKey = Boolean(apiKey || process.env.OPENAI_API_KEY)

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    if (!apiKey && !process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        success: true,
        data: generateMockAutomations(prompt)
      })
    }

    const data = await callOpenAIJSON(prompt, AUTOMATION_SYSTEM_PROMPT, automationGenerationSchema, apiKey)

    return NextResponse.json({
      success: true,
      data
    })
  } catch (error) {
    logAIFailure({
      route: "/api/ai/generate-automation",
      promptLength,
      hasApiKey,
      error
    })
    return NextResponse.json({ error: "Failed to generate automations" }, { status: 500 })
  }
}
