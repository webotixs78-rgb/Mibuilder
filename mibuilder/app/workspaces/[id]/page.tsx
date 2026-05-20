"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useParams, useRouter } from "next/navigation"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { WorkspaceBuilder, Workspace } from "@/components/workspace/WorkspaceBuilder"

export default function WorkspaceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [workspace, setWorkspace] = useState<Workspace | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadWorkspace()
  }, [params.id])

  const loadWorkspace = () => {
    try {
      // Load workspace from localStorage
      const workspaces = JSON.parse(localStorage.getItem("workspaces") || "[]")
      const foundWorkspace = workspaces.find((w: any) => w.id === params.id)
      
      if (foundWorkspace) {
        // Load workspace builder data
        const workspaceData = loadWorkspaceData(foundWorkspace.id)
        setWorkspace(workspaceData)
      } else {
        // Create default workspace if not found
        const defaultWorkspace: Workspace = createDefaultWorkspace(params.id as string)
        setWorkspace(defaultWorkspace)
      }
    } catch (error) {
      console.error("Error loading workspace:", error)
      // Create default workspace on error
      const defaultWorkspace: Workspace = createDefaultWorkspace(params.id as string)
      setWorkspace(defaultWorkspace)
    }
    setLoading(false)
  }

  const loadWorkspaceData = (workspaceId: string): Workspace => {
    try {
      const savedData = localStorage.getItem(`workspace_data_${workspaceId}`)
      
      if (savedData) {
        const parsed = JSON.parse(savedData)
        
        // Migrate old workspace structure to new multi-board structure
        if (!parsed.boards && (parsed.columns || parsed.rows)) {
          console.log("Migrating old workspace structure to new multi-board structure")
          const migrated = {
            id: parsed.id,
            name: parsed.name,
            description: parsed.description || "",
            boards: [
              {
                id: `board_${Date.now()}`,
                name: "Main Board",
                icon: "📋",
                color: "#8B5CF6",
                columns: parsed.columns || [],
                rows: parsed.rows || [],
                automations: [],
                relations: [],
                views: [],
                settings: {
                  defaultView: "table" as const,
                  autoSave: true,
                  pageSize: 50
                },
                order: 0,
                isActive: true,
                createdAt: parsed.createdAt || new Date().toISOString(),
                updatedAt: parsed.updatedAt || new Date().toISOString()
              }
            ],
            settings: parsed.settings || {
              viewMode: "table",
              frozenColumns: 0,
              pageSize: 25,
              autoSave: true
            },
            createdAt: parsed.createdAt || new Date().toISOString(),
            updatedAt: parsed.updatedAt || new Date().toISOString()
          }
          // Save migrated data
          localStorage.setItem(`workspace_data_${workspaceId}`, JSON.stringify(migrated))
          return migrated
        }
        
        // Ensure boards array exists
        if (!parsed.boards) {
          console.log("Workspace missing boards array, creating default")
          const withBoards = {
            ...parsed,
            boards: [
              {
                id: `board_${Date.now()}`,
                name: "Main Board",
                icon: "📋",
                color: "#8B5CF6",
                columns: parsed.columns || [],
                rows: parsed.rows || [],
                automations: [],
                relations: [],
                views: [],
                settings: {
                  defaultView: "table" as const,
                  autoSave: true,
                  pageSize: 50
                },
                order: 0,
                isActive: true,
                createdAt: parsed.createdAt || new Date().toISOString(),
                updatedAt: parsed.updatedAt || new Date().toISOString()
              }
            ]
          }
          localStorage.setItem(`workspace_data_${workspaceId}`, JSON.stringify(withBoards))
          return withBoards
        }
        
        return parsed
      } else {
        // Create default workspace data
        return createDefaultWorkspace(workspaceId)
      }
    } catch (error) {
      console.error("Error loading workspace data:", error)
      return createDefaultWorkspace(workspaceId)
    }
  }

  const createDefaultWorkspace = (workspaceId: string): Workspace => {
    const defaultWorkspace: Workspace = {
      id: workspaceId,
      name: "New CRM Workspace",
      description: "Custom CRM workspace with dynamic tables",
      boards: [
        {
          id: `board_${Date.now()}`,
          name: "Main Board",
          icon: "📋",
          color: "#8B5CF6",
          columns: [
            {
              id: "col_name",
              name: "Name",
              type: {
                id: "text",
                name: "Text Input",
                type: "text",
                category: "basic",
                icon: "T",
                description: "Single line text input"
              },
              width: 200,
              visible: true,
              frozen: false,
              order: 0,
              settings: {
                placeholder: "Enter name...",
                maxLength: 255,
                required: false
              }
            },
            {
              id: "col_email",
              name: "Email",
              type: {
                id: "email",
                name: "Email",
                type: "email",
                category: "basic",
                icon: "@",
                description: "Email address"
              },
              width: 250,
              visible: true,
              frozen: false,
              order: 1,
              settings: {
                placeholder: "email@example.com"
              }
            },
            {
              id: "col_status",
              name: "Status",
              type: {
                id: "status",
                name: "Status",
                type: "status",
                category: "automation",
                icon: "📊",
                description: "Status workflow"
              },
              width: 150,
              visible: true,
              frozen: false,
              order: 2,
              settings: {
                options: ["New", "In Progress", "Completed", "On Hold"],
                colorLabels: true
              }
            },
            {
              id: "col_priority",
              name: "Priority",
              type: {
                id: "priority",
                name: "Priority",
                type: "priority",
                category: "automation",
                icon: "🔥",
                description: "Priority levels"
              },
              width: 120,
              visible: true,
              frozen: false,
              order: 3,
              settings: {
                options: ["Low", "Medium", "High", "Critical"],
                colorLabels: true
              }
            },
            {
              id: "col_date",
              name: "Created Date",
              type: {
                id: "date",
                name: "Date",
                type: "date",
                category: "datetime",
                icon: "📅",
                description: "Date picker"
              },
              width: 150,
              visible: true,
              frozen: false,
              order: 4,
              settings: {
                format: "MM/DD/YYYY",
                defaultToday: true
              }
            }
          ],
          rows: [
            {
              id: "row_1",
              data: {
                col_name: "John Doe",
                col_email: "john@example.com",
                col_status: "New",
                col_priority: "Medium",
                col_date: new Date().toISOString().split('T')[0]
              }
            },
            {
              id: "row_2",
              data: {
                col_name: "Jane Smith",
                col_email: "jane@example.com",
                col_status: "In Progress",
                col_priority: "High",
                col_date: new Date().toISOString().split('T')[0]
              }
            }
          ],
          automations: [],
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
      settings: {
        viewMode: "table",
        frozenColumns: 0,
        pageSize: 25,
        autoSave: true
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Save to localStorage
    localStorage.setItem(`workspace_data_${workspaceId}`, JSON.stringify(defaultWorkspace))
    return defaultWorkspace
  }

  const handleWorkspaceChange = (updatedWorkspace: Workspace) => {
    setWorkspace(updatedWorkspace)
    // Auto-save if enabled
    if (updatedWorkspace.settings.autoSave) {
      localStorage.setItem(`workspace_data_${updatedWorkspace.id}`, JSON.stringify(updatedWorkspace))
    }
  }

  const handleSave = () => {
    if (workspace) {
      const updatedWorkspace = {
        ...workspace,
        updatedAt: new Date().toISOString()
      }
      localStorage.setItem(`workspace_data_${workspace.id}`, JSON.stringify(updatedWorkspace))
      setWorkspace(updatedWorkspace)
      
      // Show success message (you could add a toast notification here)
      console.log("Workspace saved successfully!")
    }
  }

  const handleBack = () => {
    router.push("/dashboard")
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading workspace...</p>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  if (!workspace) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Workspace not found</h1>
            <button
              onClick={handleBack}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-lg"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <Suspense
        fallback={
          <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
            <div className="text-center text-white">Loading builder…</div>
          </div>
        }
      >
        <WorkspaceBuilder
          workspace={workspace}
          onWorkspaceChange={handleWorkspaceChange}
          onSave={handleSave}
          onBack={handleBack}
        />
      </Suspense>
    </ProtectedRoute>
  )
}
