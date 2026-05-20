import { NextRequest, NextResponse } from "next/server"
import { CRM_SYSTEM_PROMPT, callOpenAIJSON, crmGenerationSchema } from "@/lib/ai/assistant"

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
      // Return mock data if no API key is provided (for testing without API)
      return NextResponse.json({
        success: true,
        data: generateMockCRM(prompt)
      })
    }
    const parsedContent = await callOpenAIJSON(prompt, CRM_SYSTEM_PROMPT, crmGenerationSchema, apiKey)

    return NextResponse.json({
      success: true,
      data: parsedContent
    })
  } catch (error) {
    logAIFailure({
      route: "/api/ai/generate-crm",
      promptLength,
      hasApiKey,
      error
    })
    return NextResponse.json({ error: "Failed to generate CRM structure" }, { status: 500 })
  }
}

// Mock CRM generator for testing without API
function generateMockCRM(prompt: string) {
  const promptLower = prompt.toLowerCase()
  
  // Detect common CRM types from prompt
  const isRealEstate = promptLower.includes("real estate") || promptLower.includes("property")
  const isSales = promptLower.includes("sales") || promptLower.includes("lead")
  const isSupport = promptLower.includes("support") || promptLower.includes("ticket")
  const isProject = promptLower.includes("project") || promptLower.includes("task")
  
  let boardName = "Main Board"
  let columns = []
  
  if (isRealEstate) {
    boardName = "Properties"
    columns = [
      {
        id: "col_property_name",
        name: "Property Name",
        type: { id: "text", name: "Text Input", type: "text", category: "basic", icon: "T", description: "Property name" },
        width: 200,
        visible: true,
        frozen: false,
        order: 0,
        settings: { placeholder: "Enter property name", maxLength: 255, required: true }
      },
      {
        id: "col_price",
        name: "Price",
        type: { id: "currency", name: "Currency", type: "currency", category: "advanced", icon: "💰", description: "Property price" },
        width: 150,
        visible: true,
        frozen: false,
        order: 1,
        settings: { required: true }
      },
      {
        id: "col_status",
        name: "Status",
        type: { id: "status", name: "Status", type: "status", category: "automation", icon: "📊", description: "Property status" },
        width: 150,
        visible: true,
        frozen: false,
        order: 2,
        settings: { options: ["Available", "Under Contract", "Sold", "Pending"], colorLabels: true }
      },
      {
        id: "col_agent",
        name: "Agent",
        type: { id: "user", name: "User Reference", type: "user", category: "relationship", icon: "👤", description: "Assigned agent" },
        width: 150,
        visible: true,
        frozen: false,
        order: 3,
        settings: {}
      }
    ]
  } else if (isSales) {
    boardName = "Leads"
    columns = [
      {
        id: "col_lead_name",
        name: "Lead Name",
        type: { id: "text", name: "Text Input", type: "text", category: "basic", icon: "T", description: "Lead name" },
        width: 200,
        visible: true,
        frozen: false,
        order: 0,
        settings: { placeholder: "Enter lead name", maxLength: 255, required: true }
      },
      {
        id: "col_email",
        name: "Email",
        type: { id: "email", name: "Email", type: "email", category: "basic", icon: "@", description: "Email address" },
        width: 200,
        visible: true,
        frozen: false,
        order: 1,
        settings: { placeholder: "email@example.com" }
      },
      {
        id: "col_status",
        name: "Status",
        type: { id: "status", name: "Status", type: "status", category: "automation", icon: "📊", description: "Lead status" },
        width: 150,
        visible: true,
        frozen: false,
        order: 2,
        settings: { options: ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"], colorLabels: true }
      },
      {
        id: "col_priority",
        name: "Priority",
        type: { id: "priority", name: "Priority", type: "priority", category: "automation", icon: "🔥", description: "Lead priority" },
        width: 120,
        visible: true,
        frozen: false,
        order: 3,
        settings: { options: ["Low", "Medium", "High", "Critical"], colorLabels: true }
      }
    ]
  } else if (isSupport) {
    boardName = "Tickets"
    columns = [
      {
        id: "col_subject",
        name: "Subject",
        type: { id: "text", name: "Text Input", type: "text", category: "basic", icon: "T", description: "Ticket subject" },
        width: 250,
        visible: true,
        frozen: false,
        order: 0,
        settings: { placeholder: "Enter ticket subject", maxLength: 255, required: true }
      },
      {
        id: "col_status",
        name: "Status",
        type: { id: "status", name: "Status", type: "status", category: "automation", icon: "📊", description: "Ticket status" },
        width: 150,
        visible: true,
        frozen: false,
        order: 1,
        settings: { options: ["Open", "In Progress", "Resolved", "Closed"], colorLabels: true }
      },
      {
        id: "col_priority",
        name: "Priority",
        type: { id: "priority", name: "Priority", type: "priority", category: "automation", icon: "🔥", description: "Ticket priority" },
        width: 120,
        visible: true,
        frozen: false,
        order: 2,
        settings: { options: ["Low", "Medium", "High", "Urgent"], colorLabels: true }
      },
      {
        id: "col_assigned",
        name: "Assigned To",
        type: { id: "user", name: "User Reference", type: "user", category: "relationship", icon: "👤", description: "Assigned agent" },
        width: 150,
        visible: true,
        frozen: false,
        order: 3,
        settings: {}
      }
    ]
  } else if (isProject) {
    boardName = "Tasks"
    columns = [
      {
        id: "col_task_name",
        name: "Task Name",
        type: { id: "text", name: "Text Input", type: "text", category: "basic", icon: "T", description: "Task name" },
        width: 200,
        visible: true,
        frozen: false,
        order: 0,
        settings: { placeholder: "Enter task name", maxLength: 255, required: true }
      },
      {
        id: "col_status",
        name: "Status",
        type: { id: "status", name: "Status", type: "status", category: "automation", icon: "📊", description: "Task status" },
        width: 150,
        visible: true,
        frozen: false,
        order: 1,
        settings: { options: ["To Do", "In Progress", "Review", "Done"], colorLabels: true }
      },
      {
        id: "col_due_date",
        name: "Due Date",
        type: { id: "date", name: "Date", type: "date", category: "datetime", icon: "📅", description: "Due date" },
        width: 150,
        visible: true,
        frozen: false,
        order: 2,
        settings: { format: "MM/DD/YYYY", defaultToday: false }
      },
      {
        id: "col_assignee",
        name: "Assignee",
        type: { id: "user", name: "User Reference", type: "user", category: "relationship", icon: "👤", description: "Task assignee" },
        width: 150,
        visible: true,
        frozen: false,
        order: 3,
        settings: {}
      }
    ]
  } else {
    // Default CRM structure
    boardName = "Contacts"
    columns = [
      {
        id: "col_name",
        name: "Name",
        type: { id: "text", name: "Text Input", type: "text", category: "basic", icon: "T", description: "Contact name" },
        width: 200,
        visible: true,
        frozen: false,
        order: 0,
        settings: { placeholder: "Enter name", maxLength: 255, required: true }
      },
      {
        id: "col_email",
        name: "Email",
        type: { id: "email", name: "Email", type: "email", category: "basic", icon: "@", description: "Email address" },
        width: 200,
        visible: true,
        frozen: false,
        order: 1,
        settings: { placeholder: "email@example.com" }
      },
      {
        id: "col_status",
        name: "Status",
        type: { id: "status", name: "Status", type: "status", category: "automation", icon: "📊", description: "Contact status" },
        width: 150,
        visible: true,
        frozen: false,
        order: 2,
        settings: { options: ["Active", "Inactive", "Prospect"], colorLabels: true }
      }
    ]
  }
  
  // Generate automations if prompt mentions automation keywords
  const automations = []
  if (promptLower.includes("follow-up") || promptLower.includes("automation")) {
    automations.push({
      name: "Auto Follow-up",
      description: "Automatically follow up when status changes",
      trigger: {
        type: "field_changed",
        fieldId: "col_status",
        boardId: "board_1"
      },
      conditions: [
        {
          fieldId: "col_status",
          operator: "equals",
          value: "New",
          logicalOperator: "AND"
        }
      ],
      actions: [
        {
          type: "update_field",
          targetBoardId: "board_1",
          fieldId: "col_status",
          value: "Contacted"
        }
      ],
      enabled: true,
      order: 0
    })
  }
  
  return {
    boards: [
      {
        id: `board_${Date.now()}`,
        name: boardName,
        description: `AI-generated ${boardName} board`,
        icon: "📋",
        color: "#8B5CF6",
        columns: columns,
        rows: [],
        automations: automations,
        relations: [],
        views: [],
        settings: {
          defaultView: "table",
          autoSave: true,
          pageSize: 50
        },
        order: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    fields: columns,
    pipelines: [],
    forms: [],
    automations: automations,
    insights: {
      usageSummary: `Generated starter CRM for prompt: "${prompt}"`,
      leadStatusSuggestions: ["New", "Contacted", "Qualified", "Won", "Lost"],
      analyticsExplanation: "Track lead conversion by status movement and response time."
    }
  }
}
