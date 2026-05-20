"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Bell, 
  Search, 
  Settings, 
  HelpCircle, 
  User,
  ChevronDown,
  Plus
} from "lucide-react"

export function TopNavbar() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left side - Search */}
        <div className="flex items-center space-x-4 flex-1">
          {searchOpen && (
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search modules, records, or help..."
                className="w-full pl-10 pr-4 py-2 bg-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
                onBlur={() => setSearchOpen(false)}
              />
            </div>
          )}
          {!searchOpen && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchOpen(true)}
              className="text-muted-foreground"
            >
              <Search className="w-4 h-4 mr-2" />
              Search...
            </Button>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          {/* Quick Actions */}
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Quick Add
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </Button>

          {/* Help */}
          <Button variant="ghost" size="sm">
            <HelpCircle className="w-4 h-4" />
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>

          {/* User Menu */}
          <div className="flex items-center space-x-2 pl-3 border-l">
            <div className="text-right">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john@acme.com</p>
            </div>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  )
}
