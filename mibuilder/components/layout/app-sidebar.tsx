"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CreateModuleModal } from "@/components/crm-builder/create-module-modal"
import { 
  LayoutDashboard, 
  Database, 
  GitBranch, 
  FileText, 
  Zap, 
  BarChart3, 
  Settings, 
  Users, 
  Package,
  Plus,
  ChevronDown,
  Search
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/app/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Modules",
    href: "/app/modules",
    icon: Database,
  },
  {
    name: "Pipelines",
    href: "/app/pipelines",
    icon: GitBranch,
  },
  {
    name: "Forms",
    href: "/app/forms",
    icon: FileText,
  },
  {
    name: "Automations",
    href: "/app/automations",
    icon: Zap,
  },
  {
    name: "Reports",
    href: "/app/reports",
    icon: BarChart3,
  },
  {
    name: "Team",
    href: "/app/team",
    icon: Users,
  },
  {
    name: "Settings",
    href: "/app/settings",
    icon: Settings,
  },
]

const modules = [
  { name: "Leads", href: "/app/modules/leads", count: 24 },
  { name: "Contacts", href: "/app/modules/contacts", count: 156 },
  { name: "Companies", href: "/app/modules/companies", count: 42 },
  { name: "Deals", href: "/app/modules/deals", count: 18 },
  { name: "Tasks", href: "/app/modules/tasks", count: 67 },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [modulesExpanded, setModulesExpanded] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <div className="w-64 bg-card border-r flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Mibuilder</h1>
            <p className="text-xs text-muted-foreground">Acme Corp</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6">
        {/* Main Navigation */}
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>

        {/* Modules Section */}
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-between px-3"
            onClick={() => setModulesExpanded(!modulesExpanded)}
          >
            <span className="text-sm font-medium">Quick Access</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform", modulesExpanded && "rotate-180")} />
          </Button>
          
          {modulesExpanded && (
            <div className="space-y-1">
              {modules.map((module) => (
                <Link
                  key={module.name}
                  href={module.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors",
                    pathname.startsWith(module.href)
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span>{module.name}</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded-full">
                    {module.count}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Add Module Button */}
      <div className="p-4 border-t">
        <Button className="w-full" size="sm" onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Module
        </Button>
      </div>

      {/* Create Module Modal */}
      <CreateModuleModal 
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  )
}
