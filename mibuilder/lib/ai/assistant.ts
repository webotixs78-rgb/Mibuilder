import { z } from "zod"

const columnTypeSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  type: z.string().optional(),
  category: z
    .enum(["basic", "selection", "datetime", "media", "advanced", "relationship", "automation"])
    .optional(),
  icon: z.any().optional(),
  description: z.string().optional()
})

const columnSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  type: columnTypeSchema.optional(),
  width: z.number().optional(),
  visible: z.boolean().optional(),
  frozen: z.boolean().optional(),
  order: z.number().optional(),
  settings: z.record(z.any()).optional()
})

const boardSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  description: z.string().optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
  columns: z.array(columnSchema).optional(),
  rows: z.array(z.any()).optional(),
  automations: z.array(z.any()).optional(),
  relations: z.array(z.any()).optional(),
  views: z.array(z.any()).optional(),
  settings: z
    .object({
      defaultView: z.enum(["table", "kanban", "calendar", "dashboard"]).optional(),
      autoSave: z.boolean().optional(),
      pageSize: z.number().optional()
    })
    .optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional()
})

const automationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  description: z.string().optional(),
  trigger: z
    .object({
      type: z.string(),
      boardId: z.string().optional(),
      field: z.string().optional(),
      fieldId: z.string().optional(),
      value: z.any().optional(),
      schedule: z.string().optional()
    })
    .optional(),
  conditions: z
    .array(
      z.object({
        id: z.string().optional(),
        field: z.string().optional(),
        fieldId: z.string().optional(),
        operator: z.string().optional(),
        value: z.any().optional(),
        logicalOperator: z.string().optional()
      })
    )
    .optional(),
  actions: z
    .array(
      z.object({
        id: z.string().optional(),
        type: z.string(),
        config: z.record(z.any()).optional(),
        targetBoardId: z.string().optional(),
        fieldId: z.string().optional(),
        value: z.any().optional(),
        delay: z.number().optional()
      })
    )
    .optional(),
  enabled: z.boolean().optional(),
  isActive: z.boolean().optional(),
  order: z.number().optional()
})

export const crmGenerationSchema = z.object({
  boards: z.array(boardSchema).default([]),
  fields: z.array(columnSchema).default([]),
  pipelines: z.array(z.record(z.any())).default([]),
  forms: z.array(z.record(z.any())).default([]),
  automations: z.array(automationSchema).default([]),
  insights: z
    .object({
      usageSummary: z.string().optional(),
      leadStatusSuggestions: z.array(z.string()).optional(),
      analyticsExplanation: z.string().optional()
    })
    .optional()
})

export const automationGenerationSchema = z.object({
  automations: z.array(automationSchema).default([])
})

export type CRMGenerationResult = z.infer<typeof crmGenerationSchema>
export type AutomationGenerationResult = z.infer<typeof automationGenerationSchema>

export const CRM_SYSTEM_PROMPT = `You are an AI CRM Builder assistant. Convert user requests into structured CRM configurations. Output only valid JSON.

Return STRICT JSON in this shape:
{
  "boards": [],
  "fields": [],
  "pipelines": [],
  "forms": [],
  "automations": [],
  "insights": {
    "usageSummary": "",
    "leadStatusSuggestions": [],
    "analyticsExplanation": ""
  }
}

Rules:
- JSON only. No markdown. No explanation text.
- Keep values practical for a production CRM builder.
- Use automation triggers, conditions, and actions that are directly executable.
- If user asks for insights, fill "insights"; otherwise leave it empty or omit.
`

export const AUTOMATION_SYSTEM_PROMPT = `You are an AI CRM automation assistant. Convert user requests into structured automation JSON. Output only valid JSON.

Return STRICT JSON in this shape:
{
  "automations": []
}

Rules:
- JSON only. No markdown. No explanation text.
- Each automation should include trigger, optional conditions, and actions.
- Prefer actions like send_email, assign_user, update_field, create_record, move_row.
`

export async function callOpenAIJSON<T>(
  prompt: string,
  systemPrompt: string,
  schema: z.ZodSchema<T>,
  apiKey?: string
): Promise<T> {
  const openaiApiKey = apiKey || process.env.OPENAI_API_KEY

  if (!openaiApiKey) {
    throw new Error("OpenAI API key is missing")
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiApiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      temperature: 0.2,
      max_tokens: 2200,
      response_format: { type: "json_object" }
    })
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`OpenAI request failed: ${errorBody}`)
  }

  const body = await response.json()
  const content = body?.choices?.[0]?.message?.content

  if (!content || typeof content !== "string") {
    throw new Error("Empty AI response")
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(content)
  } catch {
    throw new Error("Invalid JSON from AI")
  }

  const validated = schema.safeParse(parsed)
  if (!validated.success) {
    throw new Error("AI JSON does not match expected schema")
  }

  return validated.data
}
