"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Calendar, CheckCircle, Clock, FileText, LineChart, Phone, Users, Plus } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { DraggableSection } from "./draggable-section"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { useUser } from "@/components/user-context"
import {
  CallsPlaceholder,
  TrainingPlaceholder,
  SchedulePlaceholder,
  PerformanceChartPlaceholder,
} from "./new-account-placeholder"
import { useSampleData } from "@/components/sample-data-context"

// Define section IDs for draggable sections
const SECTION_IDS = {
  PERFORMANCE: "performance-metrics",
  ENABLEMENT: "enablement-score",
  CALLS: "todays-calls",
}

export default function SetterDashboard() {
  const { isNewAccount } = useUser()
  const { callData, addCallData, contentData, addContentData } = useSampleData()

  // Initialize section order from localStorage or use default order
  const [sectionOrder, setSectionOrder] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const savedOrder = localStorage.getItem("setterDashboardSectionOrder")
      return savedOrder ? JSON.parse(savedOrder) : [SECTION_IDS.PERFORMANCE, SECTION_IDS.ENABLEMENT, SECTION_IDS.CALLS]
    }
    return [SECTION_IDS.PERFORMANCE, SECTION_IDS.ENABLEMENT, SECTION_IDS.CALLS]
  })

  // Save section order to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("setterDashboardSectionOrder", JSON.stringify(sectionOrder))
    }
  }, [sectionOrder])

  // Set up DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // Handle DnD end event
  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setSectionOrder((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  // Add functions for demo/testing
  const handleAddCall = () => {
    addCallData({
      id: Date.now().toString(),
      title: "Discovery Call - New Prospect",
      score: 8.0,
      feedback: "Solid rapport. Next time, clarify next steps.",
      date: new Date().toLocaleDateString(),
    })
  }
  const handleAddTraining = () => {
    addContentData({
      id: Date.now().toString(),
      title: "New Training Module",
      progress: 0,
      dueDate: "7 days",
      type: "training",
    })
  }

  // Render sections based on their order
  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case SECTION_IDS.PERFORMANCE:
        return (
          <DraggableSection key={SECTION_IDS.PERFORMANCE} id={SECTION_IDS.PERFORMANCE}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Your Performance</CardTitle>
                  <CardDescription>Key metrics over the past 30 days</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                    <LineChart className="h-8 w-8 text-muted" />
                  </div>
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Upcoming Training</CardTitle>
                    <CardDescription>Your assigned training modules</CardDescription>
                  </div>
                  <button onClick={handleAddTraining} title="Add Training" className="ml-2 p-1 rounded hover:bg-muted">
                    <Plus className="h-5 w-5 text-primary" />
                  </button>
                </CardHeader>
                <CardContent>
                  {contentData.length === 0 ? (
                    <div className="text-center text-muted-foreground">No training assigned yet.</div>
                  ) : (
                    <div className="space-y-4">
                      {contentData.map((item) => (
                        <div key={item.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{item.title}</div>
                            <div className="text-sm text-muted-foreground">Due in {item.dueDate}</div>
                          </div>
                          <Progress value={item.progress} className="h-2" />
                          <div className="text-xs text-muted-foreground">{item.progress}% complete</div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </DraggableSection>
        )

      case SECTION_IDS.ENABLEMENT:
        return (
          <DraggableSection key={SECTION_IDS.ENABLEMENT} id={SECTION_IDS.ENABLEMENT}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-10">
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Enablement Score</CardTitle>
                  <CardDescription>Your overall enablement performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="relative h-40 w-40">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-4xl font-bold">{isNewAccount ? "0" : "78"}</div>
                      </div>
                      <svg className="h-full w-full" viewBox="0 0 100 100">
                        <circle className="stroke-muted stroke-[8px] fill-none" cx="50" cy="50" r="40" />
                        <circle
                          className="stroke-primary stroke-[8px] fill-none"
                          cx="50"
                          cy="50"
                          r="40"
                          strokeDasharray="251.2"
                          strokeDashoffset={isNewAccount ? "251.2" : "55.264"}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{isNewAccount ? "No data" : "Good"}</p>
                      <p className="text-xs text-muted-foreground">
                        {isNewAccount ? "Complete activities to see your score" : "+5 points from last month"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">Training Completion</span>
                      </div>
                      <span className="text-sm font-medium">{isNewAccount ? "0%" : "82%"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm">Live Training Attendance</span>
                      </div>
                      <span className="text-sm font-medium">{isNewAccount ? "0%" : "75%"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                        <span className="text-sm">Calls Submitted</span>
                      </div>
                      <span className="text-sm font-medium">{isNewAccount ? "0%" : "70%"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Enablement Score</CardTitle>
                  <CardDescription>Your platform enablement metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="relative h-40 w-40">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-4xl font-bold">{isNewAccount ? "0" : "81"}</div>
                      </div>
                      <svg className="h-full w-full" viewBox="0 0 100 100">
                        <circle className="stroke-muted stroke-[8px] fill-none" cx="50" cy="50" r="40" />
                        <circle
                          className="stroke-primary stroke-[8px] fill-none"
                          cx="50"
                          cy="50"
                          r="40"
                          strokeDasharray="251.2"
                          strokeDashoffset={isNewAccount ? "251.2" : "47.728"}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{isNewAccount ? "No data" : "Excellent"}</p>
                      <p className="text-xs text-muted-foreground">
                        {isNewAccount ? "Complete activities to see your score" : "+6 points from last month"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">Platform Usage</span>
                      </div>
                      <span className="text-sm font-medium">{isNewAccount ? "0%" : "88%"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm">Resource Utilization</span>
                      </div>
                      <span className="text-sm font-medium">{isNewAccount ? "0%" : "79%"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                        <span className="text-sm">Feedback Participation</span>
                      </div>
                      <span className="text-sm font-medium">{isNewAccount ? "0%" : "75%"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Performance Score</CardTitle>
                  <CardDescription>Your actual performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="relative h-40 w-40">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-4xl font-bold">{isNewAccount ? "0" : "72"}</div>
                      </div>
                      <svg className="h-full w-full" viewBox="0 0 100 100">
                        <circle className="stroke-muted stroke-[8px] fill-none" cx="50" cy="50" r="40" />
                        <circle
                          className="stroke-primary stroke-[8px] fill-none"
                          cx="50"
                          cy="50"
                          r="40"
                          strokeDasharray="251.2"
                          strokeDashoffset={isNewAccount ? "251.2" : "70.336"}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{isNewAccount ? "No data" : "Good"}</p>
                      <p className="text-xs text-muted-foreground">
                        {isNewAccount ? "Complete activities to see your score" : "+2 points from last month"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                        <span className="text-sm">Target Achievement</span>
                      </div>
                      <span className="text-sm font-medium">{isNewAccount ? "0%" : "68%"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-orange-500 mr-2"></div>
                        <span className="text-sm">Call Quality Scores</span>
                      </div>
                      <span className="text-sm font-medium">{isNewAccount ? "0%" : "76%"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </DraggableSection>
        )

      case SECTION_IDS.CALLS:
        return (
          <DraggableSection key={SECTION_IDS.CALLS} id={SECTION_IDS.CALLS}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-3">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Today's Calls</CardTitle>
                    <CardDescription>Feedback from your recent calls</CardDescription>
                  </div>
                  <button onClick={handleAddCall} title="Add Call" className="ml-2 p-1 rounded hover:bg-muted">
                    <Plus className="h-5 w-5 text-primary" />
                  </button>
                </CardHeader>
                <CardContent>
                  {callData.length === 0 ? (
                    <div className="text-center text-muted-foreground">No calls yet.</div>
                  ) : (
                    <div className="space-y-4">
                      {callData.map((call) => (
                        <div key={call.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{call.title}</div>
                            <div className="text-sm font-medium">{call.score}/10</div>
                          </div>
                          <p className="text-sm text-muted-foreground">{call.feedback}</p>
                          <div className="text-xs text-muted-foreground">{call.date}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Upcoming Sessions</CardTitle>
                  <CardDescription>Your scheduled training and coaching</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-muted-foreground">(Demo only) Integrate with real schedule data here.</div>
                </CardContent>
              </Card>
            </div>
          </DraggableSection>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Discovery Calls</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isNewAccount ? "0" : "24"}</div>
            <p className="text-xs text-muted-foreground">{isNewAccount ? "No data yet" : "+5 from last week"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meetings Set</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isNewAccount ? "0" : "18"}</div>
            <p className="text-xs text-muted-foreground">{isNewAccount ? "No data yet" : "+3 from last week"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Completion</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isNewAccount ? "0%" : "82%"}</div>
            <p className="text-xs text-muted-foreground">{isNewAccount ? "No data yet" : "+7% from last month"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Call Score</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isNewAccount ? "0/10" : "7.8/10"}</div>
            <p className="text-xs text-muted-foreground">{isNewAccount ? "No data yet" : "+0.5 from last month"}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="training">My Training</TabsTrigger>
          <TabsTrigger value="calls">My Calls</TabsTrigger>
          <TabsTrigger value="schedule">My Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 pl-8">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
              {sectionOrder.map((sectionId) => renderSection(sectionId))}
            </SortableContext>
          </DndContext>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Training Plan</CardTitle>
              <CardDescription>Your assigned training and progress</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <CheckCircle className="mx-auto h-12 w-12 text-muted" />
                <p className="mt-2 text-muted-foreground">Training content</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calls" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Calls</CardTitle>
              <CardDescription>Your recent calls and feedback</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <Phone className="mx-auto h-12 w-12 text-muted" />
                <p className="mt-2 text-muted-foreground">Call history content</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Schedule</CardTitle>
              <CardDescription>Your upcoming training and coaching sessions</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <Calendar className="mx-auto h-12 w-12 text-muted" />
                <p className="mt-2 text-muted-foreground">Schedule content</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
