"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Building, 
  Users, 
  Database, 
  Settings, 
  MoreVertical, 
  ArrowRight, 
  Zap, 
  Globe, 
  Shield, 
  BarChart3, 
  Mail, 
  Lock, 
  User, 
  Check, 
  Star,
  Phone,
  Book,
  MessageCircle,
  Video,
  Heart,
  Briefcase,
  ChevronDown,
  Rocket,
  Target,
  Sparkles,
  Award,
  LogOut
} from "lucide-react"

interface OnboardingData {
  businessName: string
  industry: string
  teamSize: string
  goals: string[]
  features: string[]
  setupPreference: string
  userInfo: {
    name: string
    email: string
    role: string
  }
}

const industries = [
  { value: "technology", label: "Technology", icon: <Globe className="w-5 h-5" /> },
  { value: "healthcare", label: "Healthcare", icon: <Heart className="w-5 h-5" /> },
  { value: "finance", label: "Finance", icon: <BarChart3 className="w-5 h-5" /> },
  { value: "retail", label: "Retail", icon: <Building className="w-5 h-5" /> },
  { value: "education", label: "Education", icon: <Book className="w-5 h-5" /> },
  { value: "consulting", label: "Consulting", icon: <Users className="w-5 h-5" /> },
  { value: "manufacturing", label: "Manufacturing", icon: <Settings className="w-5 h-5" /> },
  { value: "real-estate", label: "Real Estate", icon: <Shield className="w-5 h-5" /> },
  { value: "other", label: "Other", icon: <MoreVertical className="w-5 h-5" /> }
]

const teamSizes = [
  { value: "1-10", label: "Just Me" },
  { value: "11-50", label: "Small Team" },
  { value: "51-200", label: "Medium Team" },
  { value: "201-500", label: "Large Team" },
  { value: "500+", label: "Enterprise" }
]

const goals = [
  { id: "leads", label: "Manage Leads", icon: <Database className="w-5 h-5" />, description: "Track and nurture leads effectively" },
  { id: "workflows", label: "Automate Workflows", icon: <Zap className="w-5 h-5" />, description: "Streamline business processes" },
  { id: "sales", label: "Track Sales", icon: <Target className="w-5 h-5" />, description: "Monitor sales performance" },
  { id: "communication", label: "Client Communication", icon: <MessageCircle className="w-5 h-5" />, description: "Stay connected with clients" },
  { id: "other", label: "Custom", icon: <Sparkles className="w-5 h-5" />, description: "Build custom solutions" }
]

const features = [
  { id: "email", label: "Email Automation", icon: <Mail className="w-5 h-5" />, description: "Automated email campaigns" },
  { id: "sms", label: "SMS Notifications", icon: <Phone className="w-5 h-5" />, description: "Real-time SMS alerts" },
  { id: "ai", label: "AI Voice Calls", icon: <Video className="w-5 h-5" />, description: "AI-powered calling" },
  { id: "workflow", label: "Workflow Automation", icon: <Zap className="w-5 h-5" />, description: "Smart workflow builder" }
]

export default function OnboardingNewPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    businessName: "",
    industry: "",
    teamSize: "",
    goals: [],
    features: [],
    setupPreference: "",
    userInfo: {
      name: "",
      email: "",
      role: ""
    }
  })
  const router = useRouter()

  const totalSteps = 7
  const progress = (currentStep / totalSteps) * 100

  const updateOnboardingData = (field: keyof OnboardingData, value: any) => {
    setOnboardingData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToDashboard = () => {
    // Mark onboarding as completed
    localStorage.setItem("hasCompletedOnboarding", "true")
    // Store onboarding data
    localStorage.setItem("onboardingData", JSON.stringify(onboardingData))
    // Ensure user state is maintained
    const mockUser = localStorage.getItem("mockUser")
    if (!mockUser) {
      // Set a default user if not present
      const defaultUser = {
        _id: "1",
        email: "user@mibuilder.com",
        name: "Mibuilder User",
        company: onboardingData.businessName || "Mibuilder",
        role: "admin",
        provider: "mock",
        isActive: true,
        createdAt: new Date().toISOString()
      }
      localStorage.setItem("mockUser", JSON.stringify(defaultUser))
    }
    // Small delay to ensure localStorage is set
    setTimeout(() => {
      router.push("/dashboard")
    }, 100)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Welcome onboardingData={onboardingData} updateOnboardingData={updateOnboardingData} nextStep={nextStep} />
      case 2:
        return <Step2Business onboardingData={onboardingData} updateOnboardingData={updateOnboardingData} nextStep={nextStep} prevStep={prevStep} />
      case 3:
        return <Step3Goals onboardingData={onboardingData} updateOnboardingData={updateOnboardingData} nextStep={nextStep} prevStep={prevStep} />
      case 4:
        return <Step4Features onboardingData={onboardingData} updateOnboardingData={updateOnboardingData} nextStep={nextStep} prevStep={prevStep} />
      case 5:
        return <Step5Setup onboardingData={onboardingData} updateOnboardingData={updateOnboardingData} nextStep={nextStep} prevStep={prevStep} />
      case 6:
        return <Step6UserInfo onboardingData={onboardingData} updateOnboardingData={updateOnboardingData} nextStep={nextStep} prevStep={prevStep} />
      case 7:
        return <Step7Complete onboardingData={onboardingData} goToDashboard={goToDashboard} />
      default:
        return <div>Step not found</div>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-purple-200">
              Step {currentStep} of {totalSteps}
            </div>
            <div className="text-sm text-purple-200">
              {Math.round(progress)}% Complete
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4 py-8 pt-24">
        <div className="w-full max-w-2xl">
          {renderStep()}
        </div>
      </div>
    </div>
  )
}

// Step Components
function Step1Welcome({ onboardingData, updateOnboardingData, nextStep }: { 
  onboardingData: OnboardingData
  updateOnboardingData: (field: keyof OnboardingData, value: any) => void
  nextStep: () => void
}) {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white text-center">
            Welcome to Mibuilder
          </CardTitle>
          <CardDescription className="text-purple-200 text-center">
            Let's set up your CRM workspace
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-purple-200 text-center mb-8">
            This will take less than 2 minutes
          </p>
          <div className="flex justify-center">
            <Button 
              onClick={nextStep}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Step2Business({ onboardingData, updateOnboardingData, nextStep, prevStep }: { 
  onboardingData: OnboardingData
  updateOnboardingData: (field: keyof OnboardingData, value: any) => void
  nextStep: () => void
  prevStep: () => void
}) {
  return (
    <div className="w-full max-w-lg mx-auto">
      <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white flex items-center">
            <Button
              variant="ghost"
              onClick={prevStep}
              className="text-purple-200 hover:text-purple-100 p-2 rounded-lg"
            >
              ← Back
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Business Name
              </label>
              <Input
                placeholder="Enter your business name"
                value={onboardingData.businessName}
                onChange={(e) => updateOnboardingData('businessName', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Industry
              </label>
              <div className="relative">
                <select
                  value={onboardingData.industry}
                  onChange={(e) => updateOnboardingData('industry', e.target.value)}
                  className="w-full appearance-none bg-purple-800/90 border-white/30 rounded-lg px-4 py-3 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400/50 hover:bg-purple-700/90"
                >
                  <option value="" disabled>Select your industry</option>
                  {industries.map(industry => (
                    <option key={industry.value} value={industry.value}>
                      {industry.icon}
                      {industry.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Team Size
              </label>
              <div className="relative">
                <select
                  value={onboardingData.teamSize}
                  onChange={(e) => updateOnboardingData('teamSize', e.target.value)}
                  className="w-full appearance-none bg-purple-800/90 border-white/30 rounded-lg px-4 py-3 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400/50 hover:bg-purple-700/90"
                >
                  <option value="" disabled>Select team size</option>
                  {teamSizes.map(size => (
                    <option key={size.value} value={size.value}>
                      {size.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="ghost"
              onClick={prevStep}
              className="text-purple-200 hover:text-purple-100"
            >
              ← Back
            </Button>
            <Button 
              onClick={nextStep}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Step3Goals({ onboardingData, updateOnboardingData, nextStep, prevStep }: { 
  onboardingData: OnboardingData
  updateOnboardingData: (field: keyof OnboardingData, value: any) => void
  nextStep: () => void
  prevStep: () => void
}) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-white mb-2">
            What are your main goals?
          </CardTitle>
          <p className="text-purple-200">
            Select all that apply to help us customize your experience
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {goals.map(goal => (
              <div key={goal.id} className="relative">
                <input
                  type="checkbox"
                  id={goal.id}
                  checked={onboardingData.goals.includes(goal.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateOnboardingData('goals', [...onboardingData.goals, goal.id])
                    } else {
                      updateOnboardingData('goals', onboardingData.goals.filter(g => g !== goal.id))
                    }
                  }}
                  className="sr-only"
                />
                <label 
                  htmlFor={goal.id}
                  className={`
                    block p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 h-full
                    ${onboardingData.goals.includes(goal.id) 
                      ? 'bg-purple-600/80 border-purple-500 text-white shadow-lg' 
                      : 'bg-white/5 border-white/20 text-purple-200 hover:bg-white/10 hover:border-purple-400/50'
                    }
                  `}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${onboardingData.goals.includes(goal.id) ? 'bg-white border-purple-300' : 'bg-white/20 border-purple-400'}`}>
                        {onboardingData.goals.includes(goal.id) && <Check className="w-3 h-3 text-purple-600" />}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-lg">{goal.icon}</span>
                        <span className="ml-2 font-semibold">{goal.label}</span>
                      </div>
                      <p className="text-sm opacity-80">{goal.description}</p>
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-6">
            <Button
              variant="ghost"
              onClick={prevStep}
              className="text-purple-200 hover:text-purple-100 px-6 py-2"
            >
              ← Back
            </Button>
            <Button 
              onClick={nextStep}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Step4Features({ onboardingData, updateOnboardingData, nextStep, prevStep }: { 
  onboardingData: OnboardingData
  updateOnboardingData: (field: keyof OnboardingData, value: any) => void
  nextStep: () => void
  prevStep: () => void
}) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-white mb-2">
            Select features to include in your CRM
          </CardTitle>
          <p className="text-purple-200">
            Choose the features that best fit your business needs
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map(feature => (
              <div key={feature.id} className="relative">
                <input
                  type="checkbox"
                  id={feature.id}
                  checked={onboardingData.features.includes(feature.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateOnboardingData('features', [...onboardingData.features, feature.id])
                    } else {
                      updateOnboardingData('features', onboardingData.features.filter(f => f !== feature.id))
                    }
                  }}
                  className="sr-only"
                />
                <label 
                  htmlFor={feature.id}
                  className={`
                    block p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 h-full
                    ${onboardingData.features.includes(feature.id) 
                      ? 'bg-purple-600/80 border-purple-500 text-white shadow-lg' 
                      : 'bg-white/5 border-white/20 text-purple-200 hover:bg-white/10 hover:border-purple-400/50'
                    }
                  `}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${onboardingData.features.includes(feature.id) ? 'bg-white border-purple-300' : 'bg-white/20 border-purple-400'}`}>
                        {onboardingData.features.includes(feature.id) && <Check className="w-3 h-3 text-purple-600" />}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-lg">{feature.icon}</span>
                        <span className="ml-2 font-semibold">{feature.label}</span>
                      </div>
                      <p className="text-sm opacity-80">{feature.description}</p>
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-6">
            <Button
              variant="ghost"
              onClick={prevStep}
              className="text-purple-200 hover:text-purple-100 px-6 py-2"
            >
              ← Back
            </Button>
            <Button 
              onClick={nextStep}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Step5Setup({ onboardingData, updateOnboardingData, nextStep, prevStep }: { 
  onboardingData: OnboardingData
  updateOnboardingData: (field: keyof OnboardingData, value: any) => void
  nextStep: () => void
  prevStep: () => void
}) {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white flex items-center">
            <Button
              variant="ghost"
              onClick={prevStep}
              className="text-purple-200 hover:text-purple-100 p-2 rounded-lg"
            >
              ← Back
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-purple-200 text-center mb-6">
            How would you like to start?
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`
              p-6 border-2 rounded-lg cursor-pointer transition-all duration-200
              ${onboardingData.setupPreference === 'template' 
                ? 'bg-purple-600 border-purple-500 text-white' 
                : 'bg-white/10 border-white/20 text-purple-200 hover:bg-white/20'
              }
            `}
              onClick={() => updateOnboardingData('setupPreference', 'template')}
            >
              <Briefcase className="w-8 h-8 mb-4" />
              <div className="font-medium">Start with Template</div>
            </div>
            
            <div className={`
              p-6 border-2 rounded-lg cursor-pointer transition-all duration-200
              ${onboardingData.setupPreference === 'scratch' 
                ? 'bg-purple-600 border-purple-500 text-white' 
                : 'bg-white/10 border-white/20 text-purple-200 hover:bg-white/20'
              }
            `}
              onClick={() => updateOnboardingData('setupPreference', 'scratch')}
            >
              <Rocket className="w-8 h-8 mb-4" />
              <div className="font-medium">Build from Scratch</div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="ghost"
              onClick={prevStep}
              className="text-purple-200 hover:text-purple-100"
            >
              ← Back
            </Button>
            <Button 
              onClick={nextStep}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Step6UserInfo({ onboardingData, updateOnboardingData, nextStep, prevStep }: { 
  onboardingData: OnboardingData
  updateOnboardingData: (field: keyof OnboardingData, value: any) => void
  nextStep: () => void
  prevStep: () => void
}) {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white flex items-center">
            <Button
              variant="ghost"
              onClick={prevStep}
              className="text-purple-200 hover:text-purple-100 p-2 rounded-lg"
            >
              ← Back
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-purple-200 text-center mb-6">
            Almost done! Let's set up your profile
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Name
              </label>
              <Input
                placeholder="Enter your full name"
                value={onboardingData.userInfo.name}
                onChange={(e) => updateOnboardingData('userInfo', { ...onboardingData.userInfo, name: e.target.value })}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Email
              </label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={onboardingData.userInfo.email}
                onChange={(e) => updateOnboardingData('userInfo', { ...onboardingData.userInfo, email: e.target.value })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Role
              </label>
              <div className="relative">
                <select
                  value={onboardingData.userInfo.role}
                  onChange={(e) => updateOnboardingData('userInfo', { ...onboardingData.userInfo, role: e.target.value })}
                  className="w-full appearance-none bg-purple-800/90 border-white/30 rounded-lg px-4 py-3 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400/50 hover:bg-purple-700/90 pr-10"
                >
                  <option value="" disabled className="text-purple-400">Select your role</option>
                  <option value="admin" className="text-gray-900 bg-white">Admin</option>
                  <option value="manager" className="text-gray-900 bg-white">Manager</option>
                  <option value="user" className="text-gray-900 bg-white">User</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="ghost"
              onClick={prevStep}
              className="text-purple-200 hover:text-purple-100"
            >
              ← Back
            </Button>
            <Button 
              onClick={nextStep}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              Complete Setup
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Step7Complete({ onboardingData, goToDashboard }: { 
  onboardingData: OnboardingData
  goToDashboard: () => void
}) {
  return (
    <div className="w-full max-w-md mx-auto text-center">
      <Card className="border-white/20 bg-white/10 backdrop-blur-lg">
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-6">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">
              Your CRM is ready 🎉
            </h1>
            <p className="text-purple-200 mb-6">
              Great! You've completed the setup. Your workspace is now ready to use.
            </p>
          </div>
          
          <Button 
            onClick={goToDashboard}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
          >
            Go to Dashboard
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
