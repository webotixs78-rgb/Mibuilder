"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Settings, 
  Building, 
  Globe, 
  Bell,
  Shield,
  Database,
  Palette,
  Save
} from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your workspace and preferences</p>
        </div>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Building className="w-4 h-4 mr-2" />
                General
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Palette className="w-4 h-4 mr-2" />
                Branding
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Security
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Database className="w-4 h-4 mr-2" />
                Data & Privacy
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Globe className="w-4 h-4 mr-2" />
                Integrations
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic information about your workspace
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="workspace-name">Workspace Name</Label>
                  <Input id="workspace-name" defaultValue="Acme Corp" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workspace-slug">Workspace Slug</Label>
                  <Input id="workspace-slug" defaultValue="acme-corp" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your workspace..."
                  defaultValue="Building innovative CRM solutions for modern businesses"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" defaultValue="Technology" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-size">Company Size</Label>
                  <Input id="company-size" defaultValue="11-50" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" defaultValue="UTC-5 (Eastern Time)" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input id="currency" defaultValue="USD ($)" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Branding Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Branding</CardTitle>
              <CardDescription>
                Customize the look and feel of your workspace
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo">Logo</Label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                    <Building className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <Button variant="outline">Upload Logo</Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      Recommended: 200x200px, max 2MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <div className="flex items-center space-x-4">
                  <Input id="primary-color" defaultValue="#3B82F6" />
                  <div className="w-8 h-8 rounded" style={{ backgroundColor: "#3B82F6" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {[
                  { title: "Email Notifications", description: "Receive email updates about your workspace" },
                  { title: "Push Notifications", description: "Get browser notifications for important updates" },
                  { title: "Weekly Reports", description: "Receive weekly summary reports" },
                  { title: "Mentions", description: "Get notified when someone mentions you" },
                ].map((setting, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{setting.title}</p>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                    <input type="checkbox" className="rounded" defaultChecked={index < 2} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions for your workspace
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Delete Workspace</p>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your workspace and all data
                  </p>
                </div>
                <Button variant="destructive">Delete Workspace</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
