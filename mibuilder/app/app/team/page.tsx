"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Plus, 
  Mail, 
  MoreHorizontal,
  Crown,
  Shield,
  UserCheck
} from "lucide-react"

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@acme.com",
    role: "Owner",
    avatar: "JD",
    status: "active",
    lastActive: "2 minutes ago",
    joined: "2024-01-15"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@acme.com",
    role: "Admin",
    avatar: "JS",
    status: "active",
    lastActive: "1 hour ago",
    joined: "2024-01-20"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@acme.com",
    role: "Manager",
    avatar: "MJ",
    status: "active",
    lastActive: "30 minutes ago",
    joined: "2024-02-01"
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@acme.com",
    role: "Member",
    avatar: "SW",
    status: "away",
    lastActive: "2 hours ago",
    joined: "2024-02-15"
  },
]

const roleIcons = {
  "Owner": <Crown className="w-4 h-4 text-yellow-500" />,
  "Admin": <Shield className="w-4 h-4 text-blue-500" />,
  "Manager": <UserCheck className="w-4 h-4 text-green-500" />,
  "Member": <Users className="w-4 h-4 text-gray-500" />,
}

const roleColors = {
  "Owner": "bg-yellow-100 text-yellow-800",
  "Admin": "bg-blue-100 text-blue-800",
  "Manager": "bg-green-100 text-green-800",
  "Member": "bg-gray-100 text-gray-800",
}

export default function TeamPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team</h1>
          <p className="text-muted-foreground">Manage team members and permissions</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      {/* Team Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.length}</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Currently online</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invites</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">With admin access</p>
          </CardContent>
        </Card>
      </div>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            All members of your workspace and their roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-foreground">
                      {member.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      {roleIcons[member.role as keyof typeof roleIcons]}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColors[member.role as keyof typeof roleColors]}`}>
                        {member.role}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Last active {member.lastActive}
                    </p>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pending Invites */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Invitations</CardTitle>
          <CardDescription>
            Team members who haven't accepted their invitation yet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { email: "alex@company.com", invited: "2024-03-14", role: "Member" },
              { email: "emma@company.com", invited: "2024-03-12", role: "Manager" },
            ].map((invite, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{invite.email}</p>
                  <p className="text-sm text-muted-foreground">
                    Invited {invite.invited} as {invite.role}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">Resend</Button>
                  <Button variant="ghost" size="sm">Cancel</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
