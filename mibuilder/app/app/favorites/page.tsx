"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Bookmark, 
  Star, 
  Heart,
  Clock,
  Users,
  Target
} from "lucide-react"

const favoriteItems = [
  {
    id: 1,
    title: "Q1 Marketing Campaign",
    type: "Project",
    description: "Annual marketing strategy and execution plan",
    priority: "High",
    dueDate: "2024-03-30",
    team: "Marketing Team",
    isFavorite: true
  },
  {
    id: 2,
    title: "Product Launch Roadmap",
    type: "Board",
    description: "Timeline for new product features and releases",
    priority: "Medium",
    dueDate: "2024-04-15",
    team: "Product Team",
    isFavorite: true
  },
  {
    id: 3,
    title: "Customer Onboarding Flow",
    type: "Process",
    description: "Standardized customer onboarding workflow",
    priority: "High",
    dueDate: "2024-03-25",
    team: "Customer Success",
    isFavorite: true
  },
  {
    id: 4,
    title: "Sales Pipeline Template",
    type: "Template",
    description: "Reusable sales process template for new clients",
    priority: "Medium",
    dueDate: "Ongoing",
    team: "Sales Team",
    isFavorite: true
  }
]

export default function FavoritesPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Favorites</h1>
          <p className="text-gray-600">Quick access to your most important items</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Bookmark className="w-4 h-4 mr-2" />
          Add to Favorites
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Favorites</p>
                <p className="text-2xl font-bold text-gray-900">{favoriteItems.length}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Projects</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Templates</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
              <Bookmark className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processes</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Favorite Items */}
      <div className="space-y-4">
        {favoriteItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-2 h-2 rounded-full ${
                      item.type === 'Project' ? 'bg-purple-600' :
                      item.type === 'Board' ? 'bg-blue-600' :
                      item.type === 'Process' ? 'bg-green-600' :
                      'bg-orange-600'
                    }`}></div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.type === 'Project' ? 'bg-purple-100 text-purple-800' :
                      item.type === 'Board' ? 'bg-blue-100 text-blue-800' :
                      item.type === 'Process' ? 'bg-green-100 text-green-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {item.type}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{item.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4" />
                      <span>{item.priority}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{item.dueDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{item.team}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-yellow-500 hover:text-yellow-600">
                    <Star className="w-5 h-5 fill-current" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State for when no favorites */}
      {favoriteItems.length === 0 && (
        <Card className="text-center py-12">
          <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorites yet</h3>
          <p className="text-gray-600 mb-4">
            Start marking items as favorites for quick access
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Bookmark className="w-4 h-4 mr-2" />
            Browse Items
          </Button>
        </Card>
      )}
    </div>
  )
}
