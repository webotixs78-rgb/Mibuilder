"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Eye,
  DollarSign,
  Building,
  Calendar,
  Target,
  TrendingUp
} from "lucide-react"

const dealsData = [
  {
    id: 1,
    name: "Enterprise Software Deal",
    company: "Tech Corp",
    value: "$150,000",
    stage: "Negotiation",
    probability: 90,
    expectedClose: "2024-04-30",
    assignedTo: "John Doe",
    created: "2024-03-15"
  },
  {
    id: 2,
    name: "Marketing Automation",
    company: "Global Tech",
    value: "$75,000",
    stage: "Proposal",
    probability: 60,
    expectedClose: "2024-05-15",
    assignedTo: "Jane Smith",
    created: "2024-03-14"
  },
  {
    id: 3,
    name: "CRM Implementation",
    company: "StartupXYZ",
    value: "$25,000",
    stage: "Qualification",
    probability: 40,
    expectedClose: "2024-06-01",
    assignedTo: "John Doe",
    created: "2024-03-13"
  },
  {
    id: 4,
    name: "Cloud Migration",
    company: "Enterprise Inc",
    value: "$200,000",
    stage: "Negotiation",
    probability: 85,
    expectedClose: "2024-04-20",
    assignedTo: "Jane Smith",
    created: "2024-03-12"
  },
]

const stageColors = {
  "Prospecting": "bg-gray-100 text-gray-800",
  "Qualification": "bg-blue-100 text-blue-800", 
  "Proposal": "bg-purple-100 text-purple-800",
  "Negotiation": "bg-orange-100 text-orange-800",
  "Closed Won": "bg-green-100 text-green-800",
  "Closed Lost": "bg-red-100 text-red-800",
}

export default function DealsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDeals, setSelectedDeals] = useState<number[]>([])

  const filteredDeals = dealsData.filter(deal =>
    deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectAll = () => {
    if (selectedDeals.length === filteredDeals.length) {
      setSelectedDeals([])
    } else {
      setSelectedDeals(filteredDeals.map(deal => deal.id))
    }
  }

  const handleSelectDeal = (id: number) => {
    setSelectedDeals(prev =>
      prev.includes(id)
        ? prev.filter(dealId => dealId !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Deals</h1>
          <p className="text-muted-foreground">Track and manage your sales opportunities</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Deal
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
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
            <div className="text-2xl font-bold">$450K</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Deal Size</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$112K</div>
            <p className="text-xs text-muted-foreground">+5% increase</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <p className="text-xs text-muted-foreground">+8% improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
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
          
          {selectedDeals.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedDeals.length} selected
              </span>
              <Button variant="outline" size="sm">Bulk Edit</Button>
              <Button variant="outline" size="sm">Bulk Delete</Button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">Export</Button>
          <Button variant="outline" size="sm">Import</Button>
        </div>
      </div>

      {/* Deals Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Deals</CardTitle>
          <CardDescription>
            A list of all your deals including their value, stage, and probability.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedDeals.length === filteredDeals.length}
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                </TableHead>
                <TableHead>Deal Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Probability</TableHead>
                <TableHead>Expected Close</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedDeals.includes(deal.id)}
                      onChange={() => handleSelectDeal(deal.id)}
                      className="rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{deal.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Created {deal.created}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{deal.company}</TableCell>
                  <TableCell className="font-medium">{deal.value}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stageColors[deal.stage as keyof typeof stageColors]}`}>
                      {deal.stage}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${deal.probability}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{deal.probability}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{deal.expectedClose}</TableCell>
                  <TableCell>{deal.assignedTo}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Empty State */}
      {filteredDeals.length === 0 && (
        <Card className="text-center py-12">
          <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No deals found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first deal"}
          </p>
          {!searchTerm && (
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Deal
            </Button>
          )}
        </Card>
      )}
    </div>
  )
}
