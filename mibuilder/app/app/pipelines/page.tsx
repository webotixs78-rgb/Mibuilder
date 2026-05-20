"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Plus, 
  Search, 
  MoreHorizontal,
  Target,
  DollarSign,
  Calendar,
  User,
  Building,
  GitBranch
} from "lucide-react"

const pipelineStages = [
  { id: 1, name: "Prospecting", color: "bg-gray-500", deals: 8 },
  { id: 2, name: "Qualification", color: "bg-blue-500", deals: 5 },
  { id: 3, name: "Proposal", color: "bg-purple-500", deals: 3 },
  { id: 4, name: "Negotiation", color: "bg-orange-500", deals: 2 },
  { id: 5, name: "Closed Won", color: "bg-green-500", deals: 12 },
  { id: 6, name: "Closed Lost", color: "bg-red-500", deals: 4 },
]

const dealsData = [
  {
    id: 1,
    name: "Enterprise Software Deal",
    company: "Tech Corp",
    value: "$150,000",
    stage: "Qualification",
    probability: 75,
    assignedTo: "John Doe",
    expectedClose: "2024-04-30",
    avatar: "TC"
  },
  {
    id: 2,
    name: "Marketing Automation",
    company: "Global Tech",
    value: "$75,000",
    stage: "Proposal",
    probability: 60,
    assignedTo: "Jane Smith",
    expectedClose: "2024-05-15",
    avatar: "GT"
  },
  {
    id: 3,
    name: "CRM Implementation",
    company: "StartupXYZ",
    value: "$25,000",
    stage: "Prospecting",
    probability: 25,
    assignedTo: "John Doe",
    expectedClose: "2024-06-01",
    avatar: "SX"
  },
  {
    id: 4,
    name: "Cloud Migration",
    company: "Enterprise Inc",
    value: "$200,000",
    stage: "Negotiation",
    probability: 90,
    assignedTo: "Jane Smith",
    expectedClose: "2024-04-20",
    avatar: "EI"
  },
  {
    id: 5,
    name: "Mobile App Development",
    company: "Innovate Co",
    value: "$50,000",
    stage: "Prospecting",
    probability: 30,
    assignedTo: "John Doe",
    expectedClose: "2024-05-30",
    avatar: "IC"
  },
]

export default function PipelinesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPipeline, setSelectedPipeline] = useState("Sales Pipeline")

  const getDealsByStage = (stageName: string) => {
    return dealsData.filter(deal => deal.stage === stageName)
  }

  const getStageColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      "bg-gray-500": "bg-gray-100 text-gray-800 border-gray-200",
      "bg-blue-500": "bg-blue-100 text-blue-800 border-blue-200",
      "bg-purple-500": "bg-purple-100 text-purple-800 border-purple-200",
      "bg-orange-500": "bg-orange-100 text-orange-800 border-orange-200",
      "bg-green-500": "bg-green-100 text-green-800 border-green-200",
      "bg-red-500": "bg-red-100 text-red-800 border-red-200",
    }
    return colorMap[color] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pipelines</h1>
          <p className="text-muted-foreground">Manage your sales processes and deal flow</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <GitBranch className="w-4 h-4 mr-2" />
            New Pipeline
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Deal
          </Button>
        </div>
      </div>

      {/* Pipeline Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dealsData.length}</div>
            <p className="text-xs text-muted-foreground">+3 this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$500K</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Deal Size</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$100K</div>
            <p className="text-xs text-muted-foreground">+5% increase</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs text-muted-foreground">+8% improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search deals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          
          <select className="px-3 py-2 border rounded-md bg-background">
            <option>{selectedPipeline}</option>
            <option>Support Pipeline</option>
            <option>Onboarding Pipeline</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">View Settings</Button>
          <Button variant="outline" size="sm">Export</Button>
        </div>
      </div>

      {/* Pipeline Board */}
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {pipelineStages.map((stage) => (
          <div key={stage.id} className="flex-shrink-0 w-80">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                    <CardTitle className="text-sm font-medium">{stage.name}</CardTitle>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {stage.deals}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {getDealsByStage(stage.name).map((deal) => (
                  <Card key={deal.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-primary">
                              {deal.avatar}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{deal.name}</h4>
                            <p className="text-xs text-muted-foreground">{deal.company}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreHorizontal className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{deal.value}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStageColor(stage.color)}`}>
                            {deal.probability}%
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <User className="w-3 h-3" />
                          <span>{deal.assignedTo}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{deal.expectedClose}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {getDealsByStage(stage.name).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No deals in this stage</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Pipeline Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Performance</CardTitle>
          <CardDescription>
            Overview of your sales pipeline metrics and conversion rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h4 className="font-medium mb-3">Stage Conversion</h4>
              <div className="space-y-2">
                {pipelineStages.slice(0, -2).map((stage, index) => (
                  <div key={stage.id} className="flex items-center justify-between">
                    <span className="text-sm">{stage.name}</span>
                    <span className="text-sm font-medium">
                      {Math.round(Math.random() * 30 + 60)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Top Performers</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">John Doe</span>
                  <span className="text-sm font-medium">$180K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Jane Smith</span>
                  <span className="text-sm font-medium">$275K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Mike Johnson</span>
                  <span className="text-sm font-medium">$95K</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Forecast</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">This Month</span>
                  <span className="text-sm font-medium">$125K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Next Month</span>
                  <span className="text-sm font-medium">$180K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Quarter</span>
                  <span className="text-sm font-medium">$450K</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
