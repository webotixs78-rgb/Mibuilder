"use client"

import React, { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // If not authenticated, redirect to login (unless already on login page)
        if (pathname !== '/login') {
          router.push("/login")
        }
      } else {
        // If authenticated and on login page, redirect to dashboard
        if (pathname === '/login') {
          router.push("/dashboard")
        }
      }
    }
  }, [user, loading, router, pathname])

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  // If on login page and authenticated, show loading while redirecting
  if (pathname === '/login' && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  // If not authenticated and not on login page, show fallback or null
  if (!user && pathname !== '/login') {
    return fallback || null
  }

  // If on login page and not authenticated, show children (login form)
  if (pathname === '/login' && !user) {
    return <>{children}</>
  }

  // If authenticated and not on login page, show children
  if (user && pathname !== '/login') {
    return <>{children}</>
  }

  // Default case
  return <>{children}</>
}
