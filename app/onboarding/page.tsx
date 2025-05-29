"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Users,
  Target,
  BookOpen,
  Play,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  FileText,
  Video,
  Headphones,
  ImageIcon,
  X,
  Clock,
  Eye,
  Lightbulb,
} from "lucide-react"
import Image from "next/image"

interface TeamMember {
  id: string
  firstName: string
  lastName: string
  email: string
  role: "setter" | "closer"
  kpis: Record<string, string>
}

interface ContentItem {
  id: string
  title: string
  type: "video" | "document" | "audio" | "image"
  file?: File
  description: string
}

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [userRole, setUserRole] = useState<"setter" | "closer" | "manager">("")
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [userName, setUserName] = useState("")
  const [userCompany, setUserCompany] = useState("")

  // Load user info from localStorage
  useEffect(() => {
    const name = localStorage.getItem("enabl-user-name") || ""
    const company = localStorage.getItem("enabl-user-company") || ""
    setUserName(name)
    setUserCompany(company)
  }, [])

  const totalSteps = 6
  const progress = (currentStep / totalSteps) * 100

  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      firstName: "",
      lastName: "",
      email: "",
      role: "setter",
      kpis: {},
    }
    setTeamMembers([...teamMembers, newMember])
  }

  const updateTeamMember = (id: string, field: string, value: string) => {
    setTeamMembers(teamMembers.map((member) => (member.id === id ? { ...member, [field]: value } : member)))
  }

  const updateTeamMemberKPI = (id: string, kpiField: string, value: string) => {
    setTeamMembers(
      teamMembers.map((member) =>
        member.id === id ? { ...member, kpis: { ...member.kpis, [kpiField]: value } } : member,
      ),
    )
  }

  const removeTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id))
  }

  const addContentItem = () => {
    const newItem: ContentItem = {
      id: Date.now().toString(),
      title: "",
      type: "video",
      description: "",
    }
    setContentItems([...contentItems, newItem])
  }

  const updateContentItem = (id: string, field: string, value: string | File) => {
    setContentItems(contentItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const removeContentItem = (id: string) => {
    setContentItems(contentItems.filter((item) => item.id !== id))
  }

  const handleFileUpload = (id: string, file: File) => {
    updateContentItem(id, "file", file)
  }

  const completeOnboarding = () => {
    setIsLoading(true)

    // Save onboarding data
    localStorage.setItem("enabl-user-role", userRole)
    localStorage.setItem("enabl-team-members", JSON.stringify(teamMembers))
    localStorage.setItem("enabl-content-library", JSON.stringify(contentItems))
    localStorage.setItem("enabl-onboarding-completed", "true")
    localStorage.removeItem("enabl-onboarding-required")

    // Force a page reload to ensure AuthWrapper picks up the changes
    setTimeout(() => {
      window.location.href = "/"
    }, 1000)
  }

  const skipContentLibrary = () => {
    setCurrentStep(5) // Skip to video demo step instead of completion
  }

  const getKPIFields = (role: "setter" | "closer") => {
    if (role === "setter") {
      return [
        { key: "minimum-inputs", label: "Minimum Inputs (Weekly)", placeholder: "100" },
        { key: "positive-conversations", label: "Positive Conversations (Weekly)", placeholder: "25" },
        { key: "meetings-booked", label: "Meetings Booked (Weekly)", placeholder: "10" },
      ]
    } else {
      return [
        { key: "calls-taken", label: "Calls Taken (Weekly)", placeholder: "15" },
        { key: "deals-closed", label: "Deals Closed (Monthly)", placeholder: "8" },
        { key: "revenue-generated", label: "Revenue Generated (Monthly) ($)", placeholder: "50000" },
      ]
    }
  }

  const getContentIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "document":
        return <FileText className="h-4 w-4" />
      case "audio":
        return <Headphones className="h-4 w-4" />
      case "image":
        return <ImageIcon className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <Image src="/images/enabl-logo.png" alt="Enabl Logo" width={480} height={160} className="h-24 w-auto" />
          <div className="text-sm text-gray-600">
            Step {currentStep} of {totalSteps}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">Welcome to Enabl, {userName.split(" ")[0]}!</h1>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Role Selection */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Choose Your Role
              </CardTitle>
              <CardDescription>
                Select your primary role to customize your Enabl experience. This determines your dashboard view and
                available features.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    userRole === "manager" ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setUserRole("manager")}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Manager</h3>
                      <p className="text-sm text-muted-foreground">
                        Oversee team performance, manage training content, and track KPIs
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    userRole === "closer" ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setUserRole("closer")}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Closer</h3>
                      <p className="text-sm text-muted-foreground">
                        Focus on closing deals, track call performance, and access closing resources
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    userRole === "setter" ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setUserRole("setter")}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Setter</h3>
                      <p className="text-sm text-muted-foreground">
                        Focus on prospecting, booking meetings, and lead generation activities
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => setCurrentStep(2)} disabled={!userRole} className="gap-2">
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Add Team Members */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Add Your Team Members
              </CardTitle>
              <CardDescription>
                Add at least one team member to get started. You can add more team members later from the settings page.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {teamMembers.map((member, index) => (
                <div key={member.id} className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Team Member {index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTeamMember(member.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>First Name</Label>
                      <Input
                        value={member.firstName}
                        onChange={(e) => updateTeamMember(member.id, "firstName", e.target.value)}
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input
                        value={member.lastName}
                        onChange={(e) => updateTeamMember(member.id, "lastName", e.target.value)}
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={member.email}
                        onChange={(e) => updateTeamMember(member.id, "email", e.target.value)}
                        placeholder="john.smith@company.com"
                      />
                    </div>
                    <div>
                      <Label>Role</Label>
                      <Select
                        value={member.role}
                        onValueChange={(value: "setter" | "closer") => updateTeamMember(member.id, "role", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="setter">Setter</SelectItem>
                          <SelectItem value="closer">Closer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}

              <Button variant="outline" onClick={addTeamMember} className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Add Team Member
              </Button>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setCurrentStep(1)} className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button onClick={() => setCurrentStep(3)} disabled={teamMembers.length === 0} className="gap-2">
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Set KPIs and Targets */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Set KPIs and Targets
              </CardTitle>
              <CardDescription>
                Define performance targets for each team member. These will be used to track progress and generate
                insights.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {teamMembers.map((member, index) => (
                <div key={member.id} className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">
                      {member.firstName} {member.lastName}
                    </h4>
                    <Badge variant="outline">{member.role}</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getKPIFields(member.role).map((field) => (
                      <div key={field.key}>
                        <Label>{field.label}</Label>
                        <Input
                          type="number"
                          value={member.kpis[field.key] || ""}
                          onChange={(e) => updateTeamMemberKPI(member.id, field.key, e.target.value)}
                          placeholder={field.placeholder}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setCurrentStep(2)} className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button onClick={() => setCurrentStep(4)} className="gap-2">
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Content Library Setup */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Build Your Content Library
              </CardTitle>
              <CardDescription>
                Upload training materials, sales resources, and other content. You can skip this step and add content
                later if you prefer.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {contentItems.map((item, index) => (
                <div key={item.id} className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium flex items-center gap-2">
                      {getContentIcon(item.type)}
                      Content Item {index + 1}
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeContentItem(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={item.title}
                        onChange={(e) => updateContentItem(item.id, "title", e.target.value)}
                        placeholder="Content title"
                      />
                    </div>
                    <div>
                      <Label>Type</Label>
                      <Select value={item.type} onValueChange={(value) => updateContentItem(item.id, "type", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="document">Document</SelectItem>
                          <SelectItem value="audio">Audio</SelectItem>
                          <SelectItem value="image">Image</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={item.description}
                      onChange={(e) => updateContentItem(item.id, "description", e.target.value)}
                      placeholder="Brief description of the content"
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label>Upload File</Label>
                    <div className="mt-1">
                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleFileUpload(item.id, file)
                        }}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary/90"
                      />
                    </div>
                    {item.file && <p className="text-sm text-green-600 mt-1">✓ {item.file.name} uploaded</p>}
                  </div>
                </div>
              ))}

              <Button variant="outline" onClick={addContentItem} className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Add Content Item
              </Button>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setCurrentStep(3)} className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={skipContentLibrary}>
                    Skip for Now
                  </Button>
                  <Button onClick={() => setCurrentStep(5)} className="gap-2">
                    Continue <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Platform Demo Video */}
        {currentStep === 5 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Platform Demo
              </CardTitle>
              <CardDescription>
                Watch this comprehensive demo to learn how to get the most out of Enabl. This will help you and your team hit
                the ground running.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                  {/* Video Player Placeholder */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white p-4 text-center">
                    <div className="mb-4">
                      <Play className="h-16 w-16 text-primary/50" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Platform Demo Video</h3>
                    <p className="text-sm text-gray-400 max-w-md">
                      A comprehensive walkthrough of Enabl's features and capabilities will be available here.
                      This video will guide you through your personalized dashboard, KPI tracking, and team collaboration tools.
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>Coming soon</span>
                    </div>
                  </div>
                  <video
                    className="w-full h-full object-cover hidden"
                    controls
                    poster="/business-onboarding.png"
                    controlsList="nodownload"
                  >
                    <source src="/videos/platform-demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Duration: 5 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>Required viewing</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-3">What you'll learn:</h4>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>How to navigate your personalized dashboard and key features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Setting up and tracking daily tasks and activities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Using the content library and training materials effectively</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Understanding and tracking performance metrics and KPIs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Best practices for team collaboration and communication</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Quick Tips:</h4>
                  <ul className="text-sm text-gray-800 space-y-2">
                    <li className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>Take notes during the demo for key features you want to explore</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>Pause the video to try out features in your own dashboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>Share this video with your team members for consistent onboarding</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setCurrentStep(4)} className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button onClick={() => setCurrentStep(6)} className="gap-2">
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 6: Completion */}
        {currentStep === 6 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                You're All Set!
              </CardTitle>
              <CardDescription>Congratulations! Your Enabl account is now configured and ready to use.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">Setup Summary:</h4>
                <div className="text-sm text-green-800 space-y-1">
                  <p>
                    • Role: <strong>{userRole}</strong>
                  </p>
                  <p>
                    • Team Members: <strong>{teamMembers.length} added</strong>
                  </p>
                  <p>
                    • Content Items: <strong>{contentItems.length} uploaded</strong>
                  </p>
                  <p>
                    • Company: <strong>{userCompany}</strong>
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Next Steps:</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    Your team members will receive invitation emails to join the platform
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    Start exploring your personalized dashboard and features
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    Begin tracking daily activities and KPIs
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    Add more content to your library as needed
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="text-center">
                <Button onClick={completeOnboarding} disabled={isLoading} size="lg" className="gap-2">
                  {isLoading ? "Setting up your account..." : "Enter Enabl Dashboard"}
                  {!isLoading && <ArrowRight className="h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
