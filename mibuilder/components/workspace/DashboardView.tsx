"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, PieChart, TrendingUp, Users, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface DashboardViewProps {
  columns: any[]
  rows: any[]
}

export function DashboardView({ columns, rows }: DashboardViewProps) {
  const totalRows = rows.length
  const statusColumn = columns.find(c => c.type.type === 'status')
  
  const statusCounts: Record<string, number> = statusColumn ? rows.reduce((acc, row) => {
    const status = row.data[statusColumn.id] || 'Unknown'
    acc[status] = (acc[status] || 0) + 1
    return acc
  }, {} as Record<string, number>) : {}

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/5 backdrop-blur-xl border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-purple-300 text-sm font-medium">Total Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-white">{totalRows}</span>
              <Users className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-purple-300 text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-white">{statusCounts['Completed'] || 0}</span>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-purple-300 text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-white">{statusCounts['In Progress'] || 0}</span>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border-white/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-purple-300 text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-white">{statusCounts['Not Started'] || 0}</span>
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/5 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              <span>Status Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(statusCounts).map(([status, count]) => (
                <div key={status}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-purple-200">{status}</span>
                    <span className="text-white">{count}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                      style={{ width: `${(count / totalRows) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <PieChart className="w-5 h-5 text-purple-400" />
              <span>Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <TrendingUp className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <p className="text-purple-200">Dashboard analytics coming soon</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
