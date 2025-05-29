"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Plus, Upload, Phone, Calendar, BookOpen } from "lucide-react"
import { useRouter } from "next/navigation"

interface NewAccountPlaceholderProps {
  title: string
  description: string
  actionText: string
  actionIcon?: React.ReactNode
  actionPath?: string
  onAction?: () => void
  children?: React.ReactNode
}

export function NewAccountPlaceholder({
  title,
  description,
  actionText,
  actionIcon,
  actionPath,
  onAction,
  children,
}: NewAccountPlaceholderProps) {
  const router = useRouter()

  const handleAction = () => {
    if (onAction) {
      onAction()
    } else if (actionPath) {
      router.push(actionPath)
    }
  }

  return (
    <Card className="border-dashed border-2 border-muted-foreground/25">
      <CardHeader className="text-center">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        {children}
        <Button onClick={handleAction} className="gap-2">
          {actionIcon}
          {actionText}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

// Specific placeholder components for different sections
export function CallsPlaceholder() {
  return (
    <NewAccountPlaceholder
      title="No Calls Yet"
      description="Upload your first call recording to see analysis and feedback here"
      actionText="Upload Call"
      actionIcon={<Upload className="h-4 w-4" />}
      actionPath="/call-analysis"
    >
      <div className="text-sm text-muted-foreground space-y-2">
        <p>This section will show:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Call scores and feedback</li>
          <li>Performance insights</li>
          <li>Improvement suggestions</li>
        </ul>
      </div>
    </NewAccountPlaceholder>
  )
}

export function TrainingPlaceholder() {
  return (
    <NewAccountPlaceholder
      title="No Training Assigned"
      description="Complete your first training module to see progress here"
      actionText="Browse Training"
      actionIcon={<BookOpen className="h-4 w-4" />}
      actionPath="/enablement-hub"
    >
      <div className="text-sm text-muted-foreground space-y-2">
        <p>This section will show:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Training completion progress</li>
          <li>Upcoming modules</li>
          <li>Certification status</li>
        </ul>
      </div>
    </NewAccountPlaceholder>
  )
}

export function SchedulePlaceholder() {
  return (
    <NewAccountPlaceholder
      title="No Sessions Scheduled"
      description="Schedule your first training session to see your calendar here"
      actionText="Schedule Session"
      actionIcon={<Calendar className="h-4 w-4" />}
      actionPath="/live-training"
    >
      <div className="text-sm text-muted-foreground space-y-2">
        <p>This section will show:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Upcoming training sessions</li>
          <li>1:1 coaching appointments</li>
          <li>Team meetings</li>
        </ul>
      </div>
    </NewAccountPlaceholder>
  )
}

export function PerformanceChartPlaceholder() {
  return (
    <Card className="border-dashed border-2 border-muted-foreground/25">
      <CardHeader>
        <CardTitle>Performance Trends</CardTitle>
        <CardDescription>Your performance data will appear here as you complete calls and training</CardDescription>
      </CardHeader>
      <CardContent className="h-[200px] flex flex-col items-center justify-center text-center space-y-4">
        <div className="text-muted-foreground">
          <Phone className="h-12 w-12 mx-auto mb-2" />
          <p className="text-sm">Complete calls and training to see your performance trends</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function TeamDataPlaceholder() {
  return (
    <NewAccountPlaceholder
      title="Add Team Members"
      description="Add team members to see team performance data here"
      actionText="Manage Team"
      actionIcon={<Plus className="h-4 w-4" />}
      actionPath="/settings"
    >
      <div className="text-sm text-muted-foreground space-y-2">
        <p>This section will show:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Team performance metrics</li>
          <li>Individual progress</li>
          <li>Leaderboards</li>
        </ul>
      </div>
    </NewAccountPlaceholder>
  )
}
