"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Target,
  FileText,
  Clock
} from "lucide-react"

const stats = [
  {
    title: "Total Leads",
    value: "2,453",
    change: "+12.5%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Active Deals",
    value: "48",
    change: "+8.2%",
    trend: "up", 
    icon: Target,
  },
  {
    title: "Revenue",
    value: "$124,563",
    change: "+23.1%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "-2.4%",
    trend: "down",
    icon: TrendingUp,
  },
]

const recentActivities = [
  {
    id: 1,
    type: "lead",
    title: "New lead from website",
    description: "Sarah Johnson from Tech Corp submitted a contact form",
    time: "2 minutes ago",
    icon: Users,
  },
  {
    id: 2,
    type: "deal",
    title: "Deal moved to negotiation",
    description: "Enterprise deal with Global Tech advanced to negotiation stage",
    time: "15 minutes ago",
    icon: Target,
  },
  {
    id: 3,
    type: "task",
    title: "Task completed",
    description: "Follow-up call with ABC Company completed successfully",
    time: "1 hour ago",
    icon: FileText,
  },
  {
    id: 4,
    type: "meeting",
    title: "Meeting scheduled",
    description: "Product demo with StartupXYZ scheduled for tomorrow",
    time: "2 hours ago",
    icon: Calendar,
  },
]

const upcomingTasks = [
  {
    id: 1,
    title: "Follow up with Tech Corp",
    due: "Today, 3:00 PM",
    priority: "high",
  },
  {
    id: 2,
    title: "Prepare proposal for Global Tech",
    due: "Tomorrow, 10:00 AM",
    priority: "medium",
  },
  {
    id: 3,
    title: "Review Q3 pipeline",
    due: "Friday, 2:00 PM",
    priority: "low",
  },
  {
    id: 4,
    title: "Team sync meeting",
    due: "Monday, 9:00 AM",
    priority: "medium",
  },
]

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your business today.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 days
          </Button>
          <Button>
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-3 h-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 text-red-500 mr-1" />
                )}
                <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                  {stat.change}
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest updates from your CRM modules
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <activity.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Upcoming Tasks
            </CardTitle>
            <CardDescription>
              Your next action items
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className={cn(
                  "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                  task.priority === "high" && "bg-red-500",
                  task.priority === "medium" && "bg-yellow-500", 
                  task.priority === "low" && "bg-green-500"
                )} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{task.title}</p>
                  <p className="text-xs text-muted-foreground">{task.due}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to get you started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col">
              <Users className="w-6 h-6 mb-2" />
              Add Lead
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Target className="w-6 h-6 mb-2" />
              Create Deal
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="w-6 h-6 mb-2" />
              New Task
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="w-6 h-6 mb-2" />
              Schedule Meeting
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}
