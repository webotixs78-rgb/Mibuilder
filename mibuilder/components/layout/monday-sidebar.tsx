"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { 
  Home, 
  Briefcase, 
  Sparkles, 
  Users, 
  Plus,
  Search,
  ChevronDown,
  Settings,
  HelpCircle,
  Star,
  Bell,
  Bookmark,
  Folder,
  Calendar
} from "lucide-react"
import { AddTaskModal } from "@/components/modals/add-task-modal"
import { AddProjectModal } from "@/components/modals/add-project-modal"
import { AddTeamMemberModal } from "@/components/modals/add-team-member-modal"

const navigation = [
  {
    name: "Home",
    href: "/app",
    icon: Home,
  },
  {
    name: "My Work",
    href: "/app/my-work",
    icon: Briefcase,
  },
  {
    name: "CRM AI",
    href: "/app/ai",
    icon: Sparkles,
  },
  {
    name: "Workspaces",
    href: "/app/workspaces",
    icon: Users,
  },
]

const quickActions = [
  {
    name: "Favorites",
    href: "/app/favorites",
    icon: Bookmark,
  },
  {
    name: "Calendar",
    href: "/app/calendar",
    icon: Calendar,
  },
  {
    name: "Inbox",
    href: "/app/inbox",
    icon: Bell,
  },
]

export function MondaySidebar() {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)
  const [showAddMenu, setShowAddMenu] = useState(false)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [showTeamMemberModal, setShowTeamMemberModal] = useState(false)

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-900">Mibuilder</h1>
            <p className="text-xs text-gray-500">Acme Corp</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          {searchOpen && (
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              autoFocus
              onBlur={() => setSearchOpen(false)}
            />
          )}
          {!searchOpen && (
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          )}
          {searchOpen && (
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors",
                isActive
                  ? "bg-purple-50 text-purple-700 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          )
        })}

        {/* Quick Actions */}
        <div className="pt-2 mt-2 border-t border-gray-200">
          <p className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Quick Actions
          </p>
          {quickActions.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors",
                  isActive
                    ? "bg-purple-50 text-purple-700 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
                {item.name === "Inbox" && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                    3
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Add Button */}
      <div className="p-3 border-t border-gray-200">
        <div className="relative">
          <button 
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
            onClick={() => setShowAddMenu(!showAddMenu)}
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
          
          {showAddMenu && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="py-1">
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setShowAddMenu(false)
                    setShowTaskModal(true)
                  }}
                >
                  Task
                </button>
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setShowAddMenu(false)
                    setShowProjectModal(true)
                  }}
                >
                  Project
                </button>
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setShowAddMenu(false)
                    setShowTeamMemberModal(true)
                  }}
                >
                  Team Member
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-gray-200 space-y-1">
        <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
          <HelpCircle className="w-4 h-4" />
          <span>Help Center</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
          <Star className="w-4 h-4" />
          <span>What's new</span>
        </button>
      </div>

      {/* Modals */}
      <AddTaskModal 
        open={showTaskModal}
        onOpenChange={setShowTaskModal}
      />
      <AddProjectModal 
        open={showProjectModal}
        onOpenChange={setShowProjectModal}
      />
      <AddTeamMemberModal 
        open={showTeamMemberModal}
        onOpenChange={setShowTeamMemberModal}
      />
    </div>
  )
}
