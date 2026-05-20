"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BarChart3, Users, Target, FileText, Zap, Settings } from "lucide-react"

export default function AppHomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to Mibuilder</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your no-code CRM platform is ready to use
          </p>
          <Button size="lg" onClick={() => router.push("/app/dashboard")}>
            Go to Dashboard
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push("/app/dashboard")}>
            <CardHeader>
              <BarChart3 className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>
                View analytics and insights
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push("/app/modules")}>
            <CardHeader>
              <FileText className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Modules</CardTitle>
              <CardDescription>
                Manage CRM modules
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push("/app/pipelines")}>
            <CardHeader>
              <Target className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Pipelines</CardTitle>
              <CardDescription>
                Track sales processes
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push("/app/forms")}>
            <CardHeader>
              <FileText className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Forms</CardTitle>
              <CardDescription>
                Create lead capture forms
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push("/app/automations")}>
            <CardHeader>
              <Zap className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Automations</CardTitle>
              <CardDescription>
                Build workflows
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push("/app/team")}>
            <CardHeader>
              <Users className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Team</CardTitle>
              <CardDescription>
                Manage team members
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push("/app/settings")}>
            <CardHeader>
              <Settings className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Configure workspace
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}
