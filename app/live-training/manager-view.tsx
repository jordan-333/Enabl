"use client"

import { useState } from "react"
import { Search, Filter, Plus, Users, Clock, BarChart, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CreateSessionModal } from "./components/create-session-modal"

export default function ManagerView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentMonth, setCurrentMonth] = useState("May 2023")
  const [createModalOpen, setCreateModalOpen] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Live Training</h1>
        {/* Only one button - Create Session */}
        <Button onClick={() => setCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Session
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="text-xs text-muted-foreground">Next 30 days</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Team Participation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <div className="text-xs text-muted-foreground">+5% from last month</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Avg. Session Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7/5</div>
            <div className="text-xs text-muted-foreground">Based on 45 ratings</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="w-full mb-4 grid grid-cols-5 bg-white">
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="my-sessions">My Sessions</TabsTrigger>
          <TabsTrigger value="view-calendar">View Calendar</TabsTrigger>
          <TabsTrigger value="team-progress">Team Progress</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <div className="mb-6">
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search training sessions..."
                  className="pl-8 bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4">
              {[1, 2, 3].map((session) => (
                <Card key={session}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">
                        {session === 1
                          ? "Advanced Demo Techniques"
                          : session === 2
                            ? "Mastering Discovery Calls"
                            : "Enterprise Negotiation Strategies"}
                      </CardTitle>
                      <Badge variant="outline">
                        {session === 1 ? "Closer Skills" : session === 2 ? "Setter Skills" : "Closer Skills"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {session === 1
                        ? "May 28, 2023 • 2:00 PM - 4:00 PM"
                        : session === 2
                          ? "May 25, 2023 • 2:00 PM - 3:30 PM"
                          : "June 5, 2023 • 1:00 PM - 3:00 PM"}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-4 text-sm mb-4">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{session === 1 ? "120 min" : session === 2 ? "90 min" : "120 min"}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{session === 1 ? "8/15 spots" : session === 2 ? "12/20 spots" : "10/12 spots"}</span>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm mb-1">
                      <div>Team Registration</div>
                      <div className="font-medium">{session === 1 ? "53%" : session === 2 ? "60%" : "83%"}</div>
                    </div>
                    <Progress value={session === 1 ? 53 : session === 2 ? 60 : 83} className="h-2" />
                  </CardContent>
                  <CardFooter className="pt-2 flex gap-2">
                    <Button variant="outline" className="flex-1">
                      View Details
                    </Button>
                    <Button className="flex-1">Accept</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="my-sessions">
          <div className="grid gap-4">
            {[1, 2].map((session) => (
              <Card key={session}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-base">
                      {session === 1 ? "Sales Leadership Workshop" : "Coaching for Performance"}
                    </CardTitle>
                    <Badge variant="secondary">You're Presenting</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {session === 1 ? "June 12, 2023 • 10:00 AM - 12:00 PM" : "June 20, 2023 • 1:00 PM - 3:00 PM"}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm mb-4">
                    {session === 1
                      ? "Leadership workshop for sales managers focusing on team motivation and performance management."
                      : "Techniques for effective coaching conversations and performance improvement."}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm mb-4">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>120 min</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{session === 1 ? "6/10 spots" : "8/10 spots"}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2 flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Edit Session
                  </Button>
                  <Button className="flex-1">Prepare Materials</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="view-calendar">
          <Card>
            <CardHeader className="pb-2 flex justify-between items-center">
              <div className="flex items-center">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <CardTitle>{currentMonth}</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" className="h-8">
                  Month
                </Button>
                <Button variant="ghost" size="sm" className="h-8">
                  Week
                </Button>
                <Button variant="ghost" size="sm" className="h-8">
                  Day
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-sm font-medium py-1">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }).map((_, i) => {
                  const day = i - 1 // Adjust for May starting on the 2nd position
                  return (
                    <div
                      key={i}
                      className={`
                        h-24 border rounded-md p-1 text-sm
                        ${day < 0 || day >= 31 ? "bg-muted text-muted-foreground" : ""}
                        ${day === 14 || day === 21 || day === 27 ? "relative" : ""}
                      `}
                    >
                      {day >= 0 && day < 31 && day + 1}

                      {day === 14 && (
                        <div className="absolute top-7 left-0 right-0 bg-blue-100 text-blue-800 p-1 text-xs rounded m-1 overflow-hidden">
                          Sales Leadership (10:00 AM)
                        </div>
                      )}

                      {day === 21 && (
                        <div className="absolute top-7 left-0 right-0 bg-green-100 text-green-800 p-1 text-xs rounded m-1 overflow-hidden">
                          Coaching Workshop (2:00 PM)
                        </div>
                      )}

                      {day === 27 && (
                        <div className="absolute top-7 left-0 right-0 bg-purple-100 text-purple-800 p-1 text-xs rounded m-1 overflow-hidden">
                          Advanced Demo (2:00 PM)
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Upcoming Events */}
              <div>
                <h3 className="font-medium mb-2">Upcoming Events</h3>
                <div className="space-y-2">
                  {[
                    { date: "May 15", title: "Sales Leadership Workshop", time: "10:00 AM - 12:00 PM", color: "blue" },
                    { date: "May 22", title: "Coaching Workshop", time: "2:00 PM - 4:00 PM", color: "green" },
                    { date: "May 28", title: "Advanced Demo Techniques", time: "2:00 PM - 4:00 PM", color: "purple" },
                  ].map((event, i) => (
                    <div key={i} className="flex items-center p-2 rounded-md border">
                      <div className={`w-1 h-12 rounded-full bg-${event.color}-500 mr-3`}></div>
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {event.date} • {event.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team-progress">
          <Card>
            <CardHeader>
              <CardTitle>Team Training Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Setters", "Closers", "Account Managers"].map((team, index) => (
                  <div key={team}>
                    <div className="flex justify-between mb-1">
                      <div className="text-sm font-medium">{team}</div>
                      <div className="text-sm text-muted-foreground">
                        {index === 0 ? "75%" : index === 1 ? "82%" : "68%"} Complete
                      </div>
                    </div>
                    <Progress value={index === 0 ? 75 : index === 1 ? 82 : 68} className="h-2" />
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium mb-4">Team Members Needing Attention</h3>
                <div className="space-y-2">
                  {[1, 2, 3].map((member) => (
                    <Card key={member}>
                      <CardHeader className="p-3 pb-0">
                        <div className="flex justify-between">
                          <div className="text-sm font-medium">
                            {member === 1 ? "Alex Johnson" : member === 2 ? "Sarah Williams" : "Michael Chen"}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {member === 1 ? "Setter" : member === 2 ? "Closer" : "Setter"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-3 pt-1">
                        <div className="flex justify-between text-xs mb-1">
                          <div>Training Completion</div>
                          <div>{member === 1 ? "45%" : member === 2 ? "52%" : "38%"}</div>
                        </div>
                        <Progress value={member === 1 ? 45 : member === 2 ? 52 : 38} className="h-1.5 mb-2" />
                        <div className="text-xs text-muted-foreground">
                          {member === 1
                            ? "Missed 2 sessions"
                            : member === 2
                              ? "1 overdue assignment"
                              : "Missed 3 sessions"}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Training Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center h-48 bg-muted rounded-lg mb-6">
                <BarChart className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Attendance charts will appear here</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Most Popular Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>1. Advanced Demo Techniques</span>
                        <Badge variant="outline">95% Attendance</Badge>
                      </li>
                      <li className="flex justify-between">
                        <span>2. Objection Handling Workshop</span>
                        <Badge variant="outline">92% Attendance</Badge>
                      </li>
                      <li className="flex justify-between">
                        <span>3. ROI Discussions</span>
                        <Badge variant="outline">88% Attendance</Badge>
                      </li>
                    </ol>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Training Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Setter Qualification Rate</span>
                        <span className="font-medium text-green-600">+12%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Closer Win Rate</span>
                        <span className="font-medium text-green-600">+8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sales Cycle Length</span>
                        <span className="font-medium text-green-600">-5 days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateSessionModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
    </div>
  )
}
