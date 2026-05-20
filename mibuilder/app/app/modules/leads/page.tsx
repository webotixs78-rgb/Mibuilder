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
  Eye,
  Phone,
  Mail,
  Building,
  Calendar,
  Users
} from "lucide-react"

const leadsData = [
  {
    id: 1,
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.j@techcorp.com",
    phone: "+1 (555) 123-4567",
    company: "Tech Corp",
    source: "Website",
    status: "New",
    value: "$50,000",
    created: "2024-03-15",
    assignedTo: "John Doe"
  },
  {
    id: 2,
    firstName: "Michael",
    lastName: "Chen",
    email: "m.chen@globaltech.com",
    phone: "+1 (555) 234-5678",
    company: "Global Tech",
    source: "Referral",
    status: "Contacted",
    value: "$75,000",
    created: "2024-03-14",
    assignedTo: "Jane Smith"
  },
  {
    id: 3,
    firstName: "Emily",
    lastName: "Davis",
    email: "emily@startupxyz.com",
    phone: "+1 (555) 345-6789",
    company: "StartupXYZ",
    source: "Cold Call",
    status: "Qualified",
    value: "$25,000",
    created: "2024-03-13",
    assignedTo: "John Doe"
  },
  {
    id: 4,
    firstName: "Robert",
    lastName: "Wilson",
    email: "rwilson@enterprise.com",
    phone: "+1 (555) 456-7890",
    company: "Enterprise Inc",
    source: "Email",
    status: "Proposal Sent",
    value: "$150,000",
    created: "2024-03-12",
    assignedTo: "Jane Smith"
  },
  {
    id: 5,
    firstName: "Lisa",
    lastName: "Anderson",
    email: "lisa.anderson@innovate.com",
    phone: "+1 (555) 567-8901",
    company: "Innovate Co",
    source: "Social",
    status: "New",
    value: "$35,000",
    created: "2024-03-11",
    assignedTo: "John Doe"
  },
]

const statusColors = {
  "New": "bg-blue-100 text-blue-800",
  "Contacted": "bg-yellow-100 text-yellow-800", 
  "Qualified": "bg-green-100 text-green-800",
  "Proposal Sent": "bg-purple-100 text-purple-800",
  "Lost": "bg-red-100 text-red-800",
}

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLeads, setSelectedLeads] = useState<number[]>([])

  const filteredLeads = leadsData.filter(lead =>
    `${lead.firstName} ${lead.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([])
    } else {
      setSelectedLeads(filteredLeads.map(lead => lead.id))
    }
  }

  const handleSelectLead = (id: number) => {
    setSelectedLeads(prev =>
      prev.includes(id)
        ? prev.filter(leadId => leadId !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>
          <p className="text-muted-foreground">Manage and track your potential customers</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leadsData.length}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qualified</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Ready for follow-up</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$335K</div>
            <p className="text-xs text-muted-foreground">Total potential value</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          
          {selectedLeads.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedLeads.length} selected
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

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
          <CardDescription>
            A list of all your leads including their contact information and status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedLeads.length === filteredLeads.length}
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => handleSelectLead(lead.id)}
                      className="rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {lead.firstName} {lead.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Created {lead.created}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="w-3 h-3 mr-1 text-muted-foreground" />
                        {lead.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="w-3 h-3 mr-1 text-muted-foreground" />
                        {lead.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[lead.status as keyof typeof statusColors]}`}>
                      {lead.status}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">{lead.value}</TableCell>
                  <TableCell>{lead.assignedTo}</TableCell>
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
      {filteredLeads.length === 0 && (
        <Card className="text-center py-12">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No leads found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first lead"}
          </p>
          {!searchTerm && (
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Lead
            </Button>
          )}
        </Card>
      )}
    </div>
  )
}
