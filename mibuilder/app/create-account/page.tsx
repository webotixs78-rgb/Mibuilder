"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Check, 
  ArrowRight, 
  Briefcase, 
  Building, 
  Zap, 
  Globe, 
  Shield, 
  BarChart3, 
  Star,
  Sparkles,
  Rocket,
  Target,
  Award,
  LogOut
} from "lucide-react"

interface AccountData {
  name: string
  email: string
  password: string
  confirmPassword: string
  businessName: string
  industry: string
  teamSize: string
}

const industries = [
  { value: "technology", label: "Technology", icon: <Globe className="w-5 h-5" /> },
  { value: "healthcare", label: "Healthcare", icon: <Shield className="w-5 h-5" /> },
  { value: "finance", label: "Finance", icon: <BarChart3 className="w-5 h-5" /> },
  { value: "retail", label: "Retail", icon: <Building className="w-5 h-5" /> },
  { value: "education", label: "Education", icon: <Star className="w-5 h-5" /> },
  { value: "consulting", label: "Consulting", icon: <Target className="w-5 h-5" /> },
  { value: "manufacturing", label: "Manufacturing", icon: <Zap className="w-5 h-5" /> },
  { value: "other", label: "Other", icon: <Sparkles className="w-5 h-5" /> }
]

const teamSizes = [
  { value: "1-10", label: "Just Me" },
  { value: "11-50", label: "Small Team" },
  { value: "51-200", label: "Medium Team" },
  { value: "201-500", label: "Large Team" },
  { value: "500+", label: "Enterprise" }
]

export default function CreateAccountPage() {
  const [accountData, setAccountData] = useState<AccountData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    industry: "",
    teamSize: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<AccountData>>({})
  const router = useRouter()

  const updateAccountData = (field: keyof AccountData, value: any) => {
    setAccountData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field as keyof Partial<AccountData>]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = () => {
    const newErrors: Partial<AccountData> = {}
    
    if (!accountData.name.trim()) {
      newErrors.name = "Name is required"
    }
    
    if (!accountData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(accountData.email)) {
      newErrors.email = "Invalid email format"
    }
    
    if (!accountData.password) {
      newErrors.password = "Password is required"
    } else if (accountData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }
    
    if (!accountData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (accountData.password !== accountData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    
    if (!accountData.businessName.trim()) {
      newErrors.businessName = "Business name is required"
    }
    
    if (!accountData.industry) {
      newErrors.industry = "Please select an industry"
    }
    
    if (!accountData.teamSize) {
      newErrors.teamSize = "Please select team size"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCreateAccount = async () => {
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Store account data (in real app, this would be sent to backend)
      console.log("Account created:", accountData)
      
      // Redirect to onboarding
      router.push("/onboarding-new")
    } catch (error) {
      console.error("Error creating account:", error)
      setErrors({ email: "Failed to create account. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-indigo-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md">
          <Card className="border-white/20 bg-white/10 backdrop-blur-lg shadow-2xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-white mb-2">
                Create Your Account
              </CardTitle>
              <CardDescription className="text-purple-200">
                Start building your custom CRM workspace
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                    <Input
                      placeholder="John Doe"
                      value={accountData.name}
                      onChange={(e) => updateAccountData('name', e.target.value)}
                      className="w-full pl-10"
                      type="text"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                    <Input
                      placeholder="john@example.com"
                      value={accountData.email}
                      onChange={(e) => updateAccountData('email', e.target.value)}
                      className="w-full pl-10"
                      type="email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                    <Input
                      placeholder="••••••••••"
                      value={accountData.password}
                      onChange={(e) => updateAccountData('password', e.target.value)}
                      className="w-full pl-10 pr-10"
                      type={showPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-purple-400 hover:text-purple-200"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                    <Input
                      placeholder="••••••••••"
                      value={accountData.confirmPassword}
                      onChange={(e) => updateAccountData('confirmPassword', e.target.value)}
                      className="w-full pl-10 pr-10"
                      type={showConfirmPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-purple-400 hover:text-purple-200"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              <div className="border-t border-white/20 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Business Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">
                      Business Name
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                      <Input
                        placeholder="Your Company"
                        value={accountData.businessName}
                        onChange={(e) => updateAccountData('businessName', e.target.value)}
                        className="w-full pl-10"
                        type="text"
                      />
                    </div>
                    {errors.businessName && (
                      <p className="text-red-400 text-sm mt-1">{errors.businessName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">
                      Industry
                    </label>
                    <div className="relative">
                      <select
                        value={accountData.industry}
                        onChange={(e) => updateAccountData('industry', e.target.value)}
                        className="w-full appearance-none bg-white/5 border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      >
                        <option value="" disabled>Select your industry</option>
                        {industries.map(industry => (
                          <option key={industry.value} value={industry.value}>
                            {industry.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.industry && (
                      <p className="text-red-400 text-sm mt-1">{errors.industry}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">
                      Team Size
                    </label>
                    <div className="relative">
                      <select
                        value={accountData.teamSize}
                        onChange={(e) => updateAccountData('teamSize', e.target.value)}
                        className="w-full appearance-none bg-white/5 border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      >
                        <option value="" disabled>Select team size</option>
                        {teamSizes.map(size => (
                          <option key={size.value} value={size.value}>
                            {size.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.teamSize && (
                      <p className="text-red-400 text-sm mt-1">{errors.teamSize}</p>
                    )}
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleCreateAccount}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Create Account
                    <Rocket className="w-5 h-5 ml-2" />
                  </div>
                )}
              </Button>

              <div className="text-center mt-6">
                <p className="text-purple-200 text-sm">
                  Already have an account?{" "}
                  <button 
                    onClick={() => router.push("/login")}
                    className="text-purple-300 hover:text-purple-200 underline transition-colors"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
