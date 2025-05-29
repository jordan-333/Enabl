"use client"

import { useState } from "react"
import { Search, Filter, Clock, Users, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CreateSessionModal } from "./components/create-session-modal"

export default function SetterView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentMonth, setCurrentMonth] = useState("May 2023")
  const [createModalOpen, setCreateModalOpen] = useState(false)

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Live Training</h1>
          {/* Only one button - Create Session */}
          <Button onClick={() => setCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Session
          </Button>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-white">
            <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="calendar">View Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
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
                      <CardTitle className="text-base">Mastering Discovery Calls</CardTitle>
                      <Badge variant="outline">Setter Skills</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">May 25, 2023 • 2:00 PM - 3:30 PM</div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm mb-4">
                      Learn how to conduct effective discovery calls that uncover prospect pain points and set up
                      successful demos.
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>90 min</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>12/20 spots</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button className="w-full">Accept</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar">
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
                          ${day === 14 || day === 21 || day === 24 ? "relative" : ""}
                        `}
                      >
                        {day >= 0 && day < 31 && day + 1}

                        {day === 14 && (
                          <div className="absolute top-7 left-0 right-0 bg-blue-100 text-blue-800 p-1 text-xs rounded m-1 overflow-hidden">
                            Discovery Calls (2:00 PM)
                          </div>
                        )}

                        {day === 21 && (
                          <div className="absolute top-7 left-0 right-0 bg-green-100 text-green-800 p-1 text-xs rounded m-1 overflow-hidden">
                            Objection Handling (1:00 PM)
                          </div>
                        )}

                        {day === 24 && (
                          <div className="absolute top-7 left-0 right-0 bg-purple-100 text-purple-800 p-1 text-xs rounded m-1 overflow-hidden">
                            Qualification (10:00 AM)
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
                      { date: "May 15", title: "Mastering Discovery Calls", time: "2:00 PM - 3:30 PM", color: "blue" },
                      {
                        date: "May 22",
                        title: "Objection Handling Workshop",
                        time: "1:00 PM - 2:30 PM",
                        color: "green",
                      },
                      {
                        date: "May 25",
                        title: "Effective Qualification Techniques",
                        time: "10:00 AM - 11:30 AM",
                        color: "purple",
                      },
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
        </Tabs>
      </div>

      <CreateSessionModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
    </div>
  )
}
