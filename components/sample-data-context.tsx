"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useUser } from "@/components/user-context"

type SampleDataContextType = {
  // Call data
  callData: any[]
  addCallData: (data: any) => void
  clearCallData: () => void

  // Content data
  contentData: any[]
  addContentData: (data: any) => void
  clearContentData: () => void

  // Team data
  teamData: any[]
  addTeamData: (data: any) => void
  clearTeamData: () => void

  // Performance data
  performanceData: any[]
  addPerformanceData: (data: any) => void
  clearPerformanceData: () => void

  // Notification data
  notificationData: any[]
  addNotificationData: (data: any) => void
  clearNotificationData: () => void

  // Demo data (for non-new accounts)
  demoData: {
    calls: any[]
    content: any[]
    team: any[]
    performance: any[]
    notifications: any[]
  }
}

const SampleDataContext = createContext<SampleDataContextType | undefined>(undefined)

// Demo data for non-new accounts
const demoData = {
  calls: [
    {
      id: "1",
      title: "Discovery Call - Tech Corp",
      score: 8.5,
      feedback: "Great discovery questions. Could improve on handling pricing objections.",
      date: "2 days ago"
    },
    {
      id: "2",
      title: "Demo Call - Enterprise Solutions",
      score: 9.2,
      feedback: "Excellent product knowledge and presentation skills.",
      date: "1 week ago"
    }
  ],
  content: [
    {
      id: "1",
      title: "Advanced Discovery Techniques",
      progress: 65,
      dueDate: "3 days",
      type: "training"
    },
    {
      id: "2",
      title: "Objection Handling Masterclass",
      progress: 20,
      dueDate: "7 days",
      type: "training"
    }
  ],
  team: [
    {
      id: "1",
      name: "John Smith",
      role: "Setter",
      performance: 85,
      status: "Active now"
    },
    {
      id: "2",
      name: "Jane Doe",
      role: "Closer",
      performance: 92,
      status: "Last active 2h ago"
    }
  ],
  performance: [
    {
      metric: "Demo Skills",
      score: 88,
      trend: "+5%"
    },
    {
      metric: "Product Knowledge",
      score: 92,
      trend: "+3%"
    },
    {
      metric: "Objection Handling",
      score: 85,
      trend: "+7%"
    }
  ],
  notifications: [
    {
      id: "1",
      title: "New Feedback Received",
      message: "John Smith provided feedback on your discovery call",
      time: "10 minutes ago",
      read: false
    },
    {
      id: "2",
      title: "Training Assigned",
      message: "You've been assigned 'Advanced Discovery Techniques'",
      time: "2 hours ago",
      read: false
    }
  ]
}

export function SampleDataProvider({ children }: { children: React.ReactNode }) {
  const { isNewAccount } = useUser()
  const [callData, setCallData] = useState<any[]>([])
  const [contentData, setContentData] = useState<any[]>([])
  const [teamData, setTeamData] = useState<any[]>([])
  const [performanceData, setPerformanceData] = useState<any[]>([])
  const [notificationData, setNotificationData] = useState<any[]>([])

  // Reset data when switching between new and demo accounts
  useEffect(() => {
    if (!isNewAccount) {
      setCallData(demoData.calls)
      setContentData(demoData.content)
      setTeamData(demoData.team)
      setPerformanceData(demoData.performance)
      setNotificationData(demoData.notifications)
    } else {
      setCallData([])
      setContentData([])
      setTeamData([])
      setPerformanceData([])
      setNotificationData([])
    }
  }, [isNewAccount])

  const addCallData = (data: any) => {
    if (isNewAccount) {
      setCallData(prev => [...prev, data])
    }
  }

  const clearCallData = () => {
    if (isNewAccount) {
      setCallData([])
    }
  }

  const addContentData = (data: any) => {
    if (isNewAccount) {
      setContentData(prev => [...prev, data])
    }
  }

  const clearContentData = () => {
    if (isNewAccount) {
      setContentData([])
    }
  }

  const addTeamData = (data: any) => {
    if (isNewAccount) {
      setTeamData(prev => [...prev, data])
    }
  }

  const clearTeamData = () => {
    if (isNewAccount) {
      setTeamData([])
    }
  }

  const addPerformanceData = (data: any) => {
    if (isNewAccount) {
      setPerformanceData(prev => [...prev, data])
    }
  }

  const clearPerformanceData = () => {
    if (isNewAccount) {
      setPerformanceData([])
    }
  }

  const addNotificationData = (data: any) => {
    if (isNewAccount) {
      setNotificationData(prev => [...prev, data])
    }
  }

  const clearNotificationData = () => {
    if (isNewAccount) {
      setNotificationData([])
    }
  }

  return (
    <SampleDataContext.Provider
      value={{
        callData,
        addCallData,
        clearCallData,
        contentData,
        addContentData,
        clearContentData,
        teamData,
        addTeamData,
        clearTeamData,
        performanceData,
        addPerformanceData,
        clearPerformanceData,
        notificationData,
        addNotificationData,
        clearNotificationData,
        demoData
      }}
    >
      {children}
    </SampleDataContext.Provider>
  )
}

export function useSampleData() {
  const context = useContext(SampleDataContext)
  if (context === undefined) {
    throw new Error("useSampleData must be used within a SampleDataProvider")
  }
  return context
} 