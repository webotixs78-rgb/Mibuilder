"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Wrench, ArrowRight, Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [googleEnabled, setGoogleEnabled] = useState(false)
  const [authConfigLoaded, setAuthConfigLoaded] = useState(false)
  const router = useRouter()
  const { register, loginWithGoogle, loading } = useAuth()

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required")
      return false
    }
    if (!formData.email.trim()) {
      setError("Email is required")
      return false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Email is invalid")
      return false
    }
    if (!formData.password) {
      setError("Password is required")
      return false
    } else if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return false
    }
    if (!formData.confirmPassword) {
      setError("Please confirm your password")
      return false
    } else if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return false
    }

    setError("")
    return true
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const result = await register(formData.email, formData.password, formData.name, formData.company)

    if (result.success) {
      router.push("/onboarding-new")
    } else {
      setError(result.error || "Registration failed. Please try again.")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (error) {
      setError("")
    }
  }

  const handleGoogleLogin = () => {
    loginWithGoogle()
  }

  useEffect(() => {
    const fetchAuthConfig = async () => {
      try {
        const response = await fetch('/api/auth/config')
        if (response.ok) {
          const data = await response.json()
          setGoogleEnabled(!!data.googleConfigured)
        }
      } catch (fetchError) {
        console.error('Failed to load auth config:', fetchError)
      } finally {
        setAuthConfigLoaded(true)
      }
    }

    fetchAuthConfig()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative flex items-center justify-center p-4">
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-600/30 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-radial from-pink-600/20 via-transparent to-transparent" style={{ backgroundPosition: '70% 30%' }} />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-indigo-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
            <Wrench className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-purple-200">Start building your custom CRM today</p>
        </div>

        {/* Registration Form */}
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/20">
          <CardContent className="p-8">
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-purple-300 focus:border-purple-400 focus:ring-purple-400/20 backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Company Field */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">Company (Optional)</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                  <Input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    placeholder="Enter your company name"
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-purple-300 focus:border-purple-400 focus:ring-purple-400/20 backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-purple-300 focus:border-purple-400 focus:ring-purple-400/20 backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Create a password"
                    className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder-purple-300 focus:border-purple-400 focus:ring-purple-400/20 backdrop-blur-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    placeholder="Confirm your password"
                    className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder-purple-300 focus:border-purple-400 focus:ring-purple-400/20 backdrop-blur-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-sm transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02] disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Creating account...
                  </div>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-purple-200">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-1 gap-4">
              <Button
                type="button"
                variant="outline"
                className="w-full inline-flex items-center justify-center gap-3 border border-white/20 bg-white/95 text-slate-950 hover:bg-slate-100 transition-all duration-200"
                onClick={handleGoogleLogin}
                disabled={loading || !googleEnabled}
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-white">
                  <svg viewBox="0 0 48 48" className="h-4 w-4" aria-hidden="true">
                    <path fill="#EA4335" d="M24 9.5c3.9 0 7.3 1.4 10 3.8l7.4-7.4C35.5 2.2 30.1 0 24 0 14 0 5.2 5.7 1.9 14l8.6 6.7C12.5 14.5 17.7 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.5 24.5c0-1.4-.1-2.8-.4-4.1H24v8h12.7c-.6 3.4-2.2 6.2-4.8 8.2l7.5 5.8c4.4-4.1 6.9-10 6.9-17.9z" />
                    <path fill="#FBBC05" d="M9.8 28.7c-.8-2.4-1.2-4.9-1.2-7.5s.4-5.1 1.2-7.5L1.9 7.3C.7 10.6 0 14.2 0 18c0 3.8.7 7.4 1.9 10.7l7.9-5.9z" />
                    <path fill="#34A853" d="M24 48c6.1 0 11.4-2 15.2-5.4l-7.5-5.8c-2.1 1.5-4.8 2.4-7.7 2.4-6.3 0-11.5-4-13.4-9.4L1.9 32.7C5.2 41.3 14 48 24 48z" />
                    <path fill="none" d="M0 0h48v48H0z" />
                  </svg>
                </span>
                Continue with Google
              </Button>
            </div>

            {authConfigLoaded && !googleEnabled && (
              <div className="mt-4 text-sm text-purple-200">
                Google login is currently unavailable until OAuth credentials are configured.
              </div>
            )}

            {/* Sign In Link */}
            <div className="text-center mt-6">
              <p className="text-purple-200">
                Already have an account?{" "}
                <Link href="/login" className="text-purple-300 hover:text-purple-200 transition-colors font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
