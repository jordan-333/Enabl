"use client"

import { useEffect, useState } from "react"
import {
  BookOpen,
  Calendar,
  MessageSquare,
  Phone,
  Target,
  ClipboardCheck,
  Brain,
  ArrowUpRight,
  ListTodo,
  MoreHorizontal,
  Activity,
  Video,
  DollarSign,
  CheckCircle,
  Clock,
  Users,
  LineChart,
  AlertTriangle,
  AlertCircle,
  Award,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useUser } from "@/components/user-context"

type UserRole = "setter" | "closer" | "manager"

export default function Home() {
  const { userRole, userName, isNewAccount } = useUser()

  const [showAllSetterTasks, setShowAllSetterTasks] = useState(false)
  const [showAllCloserTasks, setShowAllCloserTasks] = useState(false)
  const [showAllManagerTasks, setShowAllManagerTasks] = useState(false)

  return (
    <div className="max-w-6xl mx-auto w-full">
      {/* Setter View */}
      {userRole === "setter" && (
        <div className="space-y-4">
          {/* Introduction */}
          <div className="mt-4 mb-8">
            <h1 className="text-3xl font-bold">Welcome, {userName}! 👋</h1>
            <p className="text-muted-foreground mt-1">
              Lead with confidence. Sell with impact. Enabl is your advantage.
            </p>
          </div>

          {/* Today's Focus */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListTodo className="h-5 w-5 text-primary" />
                Today's Focus
              </CardTitle>
              <CardDescription>Your tasks and priorities for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {/* Today's Live Training */}
                <div className="flex items-start gap-3 rounded-md border p-3 bg-green-50">
                  <Checkbox id="calendar-task-1" className="mt-1" />
                  <div className="flex-1">
                    <label htmlFor="calendar-task-1" className="text-sm font-medium cursor-pointer">
                      Attend "Advanced Prospecting Techniques" live training
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        <Video className="h-3 w-3 mr-1" />
                        Live Training
                      </Badge>
                      <span className="text-xs text-muted-foreground">Today, 2:00 PM - 3:00 PM</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Daily KPI Target */}
                <div className="flex items-start gap-3 rounded-md border p-3 bg-blue-50">
                  <Checkbox id="kpi-daily-1" className="mt-1" />
                  <div className="flex-1">
                    <label htmlFor="kpi-daily-1" className="text-sm font-medium cursor-pointer">
                      Complete 50 minimum inputs today (32/50)
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        <Target className="h-3 w-3 mr-1" />
                        Daily Target
                      </Badge>
                      <span className="text-xs text-muted-foreground">18 remaining today</span>
                    </div>
                    <Progress value={64} className="mt-2 h-1" />
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Follow-up Task */}
                <div className="flex items-start gap-3 rounded-md border p-3">
                  <Checkbox id="followup-task-1" className="mt-1" />
                  <div className="flex-1">
                    <label htmlFor="followup-task-1" className="text-sm font-medium cursor-pointer">
                      Follow up with 5 prospects from yesterday's calls
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        <Phone className="h-3 w-3 mr-1" />
                        Follow-up
                      </Badge>
                      <span className="text-xs text-muted-foreground">Due today</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Additional tasks shown when expanded */}
                {showAllSetterTasks && (
                  <>
                    <div className="flex items-start gap-3 rounded-md border p-3">
                      <Checkbox id="setter-task-4" className="mt-1" />
                      <div className="flex-1">
                        <label htmlFor="setter-task-4" className="text-sm font-medium cursor-pointer">
                          Update CRM with today's call outcomes
                        </label>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            <ClipboardCheck className="h-3 w-3 mr-1" />
                            Admin Task
                          </Badge>
                          <span className="text-xs text-muted-foreground">End of day</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-start gap-3 rounded-md border p-3">
                      <Checkbox id="setter-task-5" className="mt-1" />
                      <div className="flex-1">
                        <label htmlFor="setter-task-5" className="text-sm font-medium cursor-pointer">
                          Review tomorrow's prospect list and prepare talking points
                        </label>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            <BookOpen className="h-3 w-3 mr-1" />
                            Preparation
                          </Badge>
                          <span className="text-xs text-muted-foreground">Before 6:00 PM</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}

                {/* Show remaining tasks count or collapse option */}
                {!showAllSetterTasks ? (
                  <div className="text-center pt-2">
                    <p className="text-xs text-muted-foreground">+2 more tasks for today</p>
                  </div>
                ) : (
                  <div className="text-center pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAllSetterTasks(false)}
                      className="text-xs text-muted-foreground"
                    >
                      Show less
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setShowAllSetterTasks(!showAllSetterTasks)}>
                {showAllSetterTasks ? "Show Less Tasks" : "Show All Today's Tasks"}
              </Button>
            </CardFooter>
          </Card>

          {/* Daily Report Submission Alert */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <ClipboardCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Daily Report Submission</h3>
                    <p className="text-sm text-muted-foreground">Submit today's metrics to update your dashboard</p>
                  </div>
                </div>
                <Button>Submit Daily Report</Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Inputs</CardTitle>
                <Phone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">248</div>
                <p className="text-xs text-muted-foreground">+5.2% from last week</p>
                <div className="mt-4">
                  <Progress value={62} className="h-2" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Positive Conversations</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124</div>
                <p className="text-xs text-muted-foreground">+8.2% from last week</p>
                <div className="mt-4">
                  <Progress value={62} className="h-2" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Calls Booked</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">+2.5% from last week</p>
                <div className="mt-4">
                  <Progress value={42} className="h-2" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Booking Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">33.9%</div>
                <p className="text-xs text-muted-foreground">-1.5% from last week</p>
                <div className="mt-4">
                  <Progress value={34} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Daily Activity</CardTitle>
                <CardDescription>Your outreach and booking metrics for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <Phone className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Total Inputs</p>
                          <p className="text-xl font-bold">32</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground">Daily Goal: 50</p>
                        <Progress value={64} className="mt-1 h-1" />
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <MessageSquare className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Positive Conversations</p>
                          <p className="text-xl font-bold">14</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground">Daily Goal: 20</p>
                        <Progress value={70} className="mt-1 h-1" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Calls Booked</p>
                          <p className="text-xl font-bold">5</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground">Daily Goal: 8</p>
                        <Progress value={62.5} className="mt-1 h-1" />
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <Target className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Booking Rate</p>
                          <p className="text-xl font-bold">35.7%</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground">Target: 40%</p>
                        <Progress value={89.3} className="mt-1 h-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Detailed Activity
                </Button>
              </CardFooter>
            </Card>
            <Card className="col-span-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Engagement Score</CardTitle>
                  <CardDescription>Your platform engagement metrics</CardDescription>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold">81</div>
                        <div className="text-xs text-muted-foreground">out of 100</div>
                      </div>
                    </div>
                    <div
                      className="absolute inset-0 rounded-full border-8 border-primary"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 100% 81%, 0 81%)",
                      }}
                    ></div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Live Training Attendance</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">88%</p>
                          <Badge variant="outline" className="text-xs">
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                            +6%
                          </Badge>
                        </div>
                        <Progress value={88} className="mt-1 h-1" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Resource Completion</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">79%</p>
                          <Badge variant="outline" className="text-xs">
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                            +4%
                          </Badge>
                        </div>
                        <Progress value={79} className="mt-1 h-1" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Feedback Participation</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">75%</p>
                          <Badge variant="outline" className="text-xs">
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                            +3%
                          </Badge>
                        </div>
                        <Progress value={75} className="mt-1 h-1" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Platform Activity</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">85%</p>
                          <Badge variant="outline" className="text-xs">
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                            +5%
                          </Badge>
                        </div>
                        <Progress value={85} className="mt-1 h-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Detailed Report
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Performance Score - Added for Setter View */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Performance Score</CardTitle>
                <CardDescription>Your performance metrics against targets</CardDescription>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Activity className="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold">84</div>
                      <div className="text-xs text-muted-foreground">out of 100</div>
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 rounded-full border-8 border-primary"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 100% 84%, 0 84%)",
                    }}
                  ></div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Positive Conversations to Target</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">92%</p>
                        <Badge variant="default" className="text-xs">
                          <ArrowUpRight className="mr-1 h-3 w-3" />
                          +8%
                        </Badge>
                      </div>
                      <Progress value={92} className="mt-1 h-1" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Calls Booked to Target</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">87%</p>
                        <Badge variant="default" className="text-xs">
                          <ArrowUpRight className="mr-1 h-3 w-3" />
                          +5%
                        </Badge>
                      </div>
                      <Progress value={87} className="mt-1 h-1" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Average Performance Score (Call Feedback)</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">84%</p>
                        <Badge variant="default" className="text-xs">
                          <ArrowUpRight className="mr-1 h-3 w-3" />
                          +7%
                        </Badge>
                      </div>
                      <Progress value={84} className="mt-1 h-1" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Detailed Performance
              </Button>
            </CardFooter>
          </Card>

          {/* Team Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Team Comparison</CardTitle>
              <CardDescription>How your metrics compare to team averages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">Positive Conversations</h4>
                      <Badge variant="default" className="text-xs">
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                        +26.5%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">You</span>
                          <span className="text-xs font-medium">124</span>
                        </div>
                        <Progress value={100} className="h-2 bg-primary/10" />
                      </div>
                      <div className="w-4"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Team Avg</span>
                          <span className="text-xs font-medium">98</span>
                        </div>
                        <Progress value={79} className="h-2" />
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">Calls Booked</h4>
                      <Badge variant="default" className="text-xs">
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                        +20%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">You</span>
                          <span className="text-xs font-medium">42</span>
                        </div>
                        <Progress value={100} className="h-2 bg-primary/10" />
                      </div>
                      <div className="w-4"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Team Avg</span>
                          <span className="text-xs font-medium">35</span>
                        </div>
                        <Progress value={83.3} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">Booking Rate</h4>
                      <Badge variant="default" className="text-xs">
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                        +11.1%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">You</span>
                          <span className="text-xs font-medium">33.9%</span>
                        </div>
                        <Progress value={100} className="h-2 bg-primary/10" />
                      </div>
                      <div className="w-4"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Team Avg</span>
                          <span className="text-xs font-medium">30.5%</span>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">Enablement Score</h4>
                      {!isNewAccount && (
                        <Badge variant="default" className="text-xs">
                          <ArrowUpRight className="mr-1 h-3 w-3" />
                          +9.3%
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">You</span>
                          <span className="text-xs font-medium">{isNewAccount ? "0/100" : "82/100"}</span>
                        </div>
                        <Progress value={isNewAccount ? 0 : 82} className="h-2 bg-primary/10" />
                      </div>
                      <div className="w-4"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Team Avg</span>
                          <span className="text-xs font-medium">{isNewAccount ? "0/100" : "75/100"}</span>
                        </div>
                        <Progress value={isNewAccount ? 0 : 75} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Team Leaderboard
              </Button>
            </CardFooter>
          </Card>

          {/* Daily Report Submission Form */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Report Submission</CardTitle>
              <CardDescription>Update your metrics to keep your dashboard current</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                <div className="rounded-lg border p-3">
                  <label className="text-sm font-medium">Total Inputs</label>
                  <div className="mt-1 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <input
                      type="number"
                      className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                      placeholder="Enter number"
                    />
                  </div>
                </div>
                <div className="rounded-lg border p-3">
                  <label className="text-sm font-medium">Positive Conversations</label>
                  <div className="mt-1 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <input
                      type="number"
                      className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                      placeholder="Enter number"
                    />
                  </div>
                </div>
                <div className="rounded-lg border p-3">
                  <label className="text-sm font-medium">Calls Booked</label>
                  <div className="mt-1 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <input
                      type="number"
                      className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                      placeholder="Enter number"
                    />
                  </div>
                </div>
                <div className="rounded-lg border p-3">
                  <label className="text-sm font-medium">Training Completed</label>
                  <div className="mt-1 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <select className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option value="">Select option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="partial">Partial</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border p-3">
                  <label className="text-sm font-medium">Notes</label>
                  <div className="mt-1">
                    <textarea
                      className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                      rows={1}
                      placeholder="Any additional notes about today's calls"
                    ></textarea>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset</Button>
              <Button>Submit Daily Report</Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Closer View */}
      {userRole === "closer" && (
        <div className="space-y-4">
          {/* Introduction */}
          <div className="mt-4 mb-8">
            <h1 className="text-3xl font-bold">Welcome, {userName}! 👋</h1>
            <p className="text-muted-foreground mt-1">
              Close deals with confidence. Enabl is your advantage.
            </p>
          </div>

          {/* Today's Focus with Closer-specific tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListTodo className="h-5 w-5 text-primary" />
                Today's Focus
              </CardTitle>
              <CardDescription>Your tasks and priorities for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {/* Scheduled Call from Calendar */}
                <div className="flex items-start gap-3 rounded-md border p-3 bg-green-50">
                  <Checkbox id="call-task-1" className="mt-1" />
                  <div className="flex-1">
                    <label htmlFor="call-task-1" className="text-sm font-medium cursor-pointer">
                      Demo call with Acme Corp - Enterprise deal
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        <Phone className="h-3 w-3 mr-1" />
                        Scheduled Call
                      </Badge>
                      <span className="text-xs text-muted-foreground">Today, 2:00 PM - 3:00 PM</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Live Training */}
                <div className="flex items-start gap-3 rounded-md border p-3 bg-purple-50">
                  <Checkbox id="training-closer-1" className="mt-1" />
                  <div className="flex-1">
                    <label htmlFor="training-closer-1" className="text-sm font-medium cursor-pointer">
                      Attend "Advanced Negotiation Tactics" live session
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        <Video className="h-3 w-3 mr-1" />
                        Live Training
                      </Badge>
                      <span className="text-xs text-muted-foreground">Today, 4:00 PM - 5:00 PM</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Follow-up Task */}
                <div className="flex items-start gap-3 rounded-md border p-3">
                  <Checkbox id="followup-closer-1" className="mt-1" />
                  <div className="flex-1">
                    <label htmlFor="followup-closer-1" className="text-sm font-medium cursor-pointer">
                      Follow up with XYZ Corp proposal
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        <Phone className="h-3 w-3 mr-1" />
                        Follow-up
                      </Badge>
                      <span className="text-xs text-muted-foreground">Due today</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Additional tasks shown when expanded */}
                {showAllCloserTasks && (
                  <div className="flex items-start gap-3 rounded-md border p-3">
                    <Checkbox id="closer-task-4" className="mt-1" />
                    <div className="flex-1">
                      <label htmlFor="closer-task-4" className="text-sm font-medium cursor-pointer">
                        Prepare presentation materials for tomorrow's demo
                      </label>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          <BookOpen className="h-3 w-3 mr-1" />
                          Preparation
                        </Badge>
                        <span className="text-xs text-muted-foreground">Before end of day</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {/* Show remaining tasks count or collapse option */}
                {!showAllCloserTasks ? (
                  <div className="text-center pt-2">
                    <p className="text-xs text-muted-foreground">+1 more task for today</p>
                  </div>
                ) : (
                  <div className="text-center pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAllCloserTasks(false)}
                      className="text-xs text-muted-foreground"
                    >
                      Show less
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setShowAllCloserTasks(!showAllCloserTasks)}>
                {showAllCloserTasks ? "Show Less Tasks" : "Show All Today's Tasks"}
              </Button>
            </CardFooter>
          </Card>

          {/* Daily Report Submission Alert */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <ClipboardCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Daily Report Submission</h3>
                    <p className="text-sm text-muted-foreground">Submit today's metrics to update your dashboard</p>
                  </div>
                </div>
                <Button>Submit Daily Report</Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Calls Booked</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">+2.5% from last week</p>
                <div className="mt-4">
                  <Progress value={42} className="h-2" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Show-Up Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">-3.2% from last week</p>
                <div className="mt-4">
                  <Progress value={78} className="h-2" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">33 of 42 calls completed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Close Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24%</div>
                <p className="text-xs text-muted-foreground">+5.1% from last week</p>
                <div className="mt-4">
                  <Progress value={24} className="h-2" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">8 deals from 33 calls</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,450</div>
                <p className="text-xs text-muted-foreground">+12.3% from last month</p>
                <div className="mt-4">
                  <Progress value={62} className="h-2" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">$1,556 avg. deal size</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Today's Calls - Moved above Enablement Score */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Today's Calls</CardTitle>
                <CardDescription>Your scheduled calls for today</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                <div className="flex items-center gap-4 rounded-md border p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Acme Inc. - Demo Call</p>
                    <p className="text-xs text-muted-foreground">2:00 PM - 3:00 PM</p>
                  </div>
                  <Badge variant="outline">Upcoming</Badge>
                </div>
                <div className="flex items-center gap-4 rounded-md border p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">XYZ Corp - Follow-up</p>
                    <p className="text-xs text-muted-foreground">4:00 PM - 4:30 PM</p>
                  </div>
                  <Badge variant="outline">Upcoming</Badge>
                </div>
                <div className="flex items-center gap-4 rounded-md border p-3 bg-muted/50">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Global Tech - Demo</p>
                    <p className="text-xs text-muted-foreground">10:00 AM - 11:00 AM</p>
                  </div>
                  <Badge variant="outline">Completed</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Calls
                </Button>
              </CardFooter>
            </Card>

            {/* Enablement Score - Now below Today's Calls */}
            <Card className="col-span-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Engagement Score</CardTitle>
                  <CardDescription>Your platform engagement metrics</CardDescription>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold">78</div>
                        <div className="text-xs text-muted-foreground">out of 100</div>
                      </div>
                    </div>
                    <div
                      className="absolute inset-0 rounded-full border-8 border-primary"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 100% 78%, 0 78%)",
                      }}
                    ></div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Live Training Attendance</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">88%</p>
                          <Badge variant="outline" className="text-xs">
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                            +6%
                          </Badge>
                        </div>
                        <Progress value={88} className="mt-1 h-1" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Resource Completion</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">79%</p>
                          <Badge variant="outline" className="text-xs">
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                            +4%
                          </Badge>
                        </div>
                        <Progress value={79} className="mt-1 h-1" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Feedback Participation</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">75%</p>
                          <Badge variant="outline" className="text-xs">
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                            +3%
                          </Badge>
                        </div>
                        <Progress value={75} className="mt-1 h-1" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Platform Activity</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">85%</p>
                          <Badge variant="outline" className="text-xs">
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                            +5%
                          </Badge>
                        </div>
                        <Progress value={85} className="mt-1 h-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Detailed Report
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Performance Score - Added for Closer View */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Performance Score</CardTitle>
                <CardDescription>Your performance metrics against targets</CardDescription>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Activity className="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold">82</div>
                      <div className="text-xs text-muted-foreground">out of 100</div>
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 rounded-full border-8 border-primary"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 100% 82%, 0 82%)",
                    }}
                  ></div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Calls Taken to Target</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">94%</p>
                        <Badge variant="outline" className="text-xs">
                          <ArrowUpRight className="mr-1 h-3 w-3" />
                          +7%
                        </Badge>
                      </div>
                      <Progress value={94} className="mt-1 h-1" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Closed Deals to Target</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">85%</p>
                        <Badge variant="outline" className="text-xs">
                          <ArrowUpRight className="mr-1 h-3 w-3" />
                          +9%
                        </Badge>
                      </div>
                      <Progress value={85} className="mt-1 h-1" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Average Performance Score (Call Feedback)</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">82%</p>
                        <Badge variant="outline" className="text-xs">
                          <ArrowUpRight className="mr-1 h-3 w-3" />
                          +5%
                        </Badge>
                      </div>
                      <Progress value={82} className="mt-1 h-1" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Detailed Performance
              </Button>
            </CardFooter>
          </Card>

          {/* Team Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Team Comparison</CardTitle>
              <CardDescription>How your metrics compare to team averages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">Show-Up Rate</h4>
                      <Badge variant="default" className="text-xs">
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                        +8.3%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">You</span>
                          <span className="text-xs font-medium">78%</span>
                        </div>
                        <Progress value={78} className="h-2 bg-primary/10" />
                      </div>
                      <div className="w-4"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Team Avg</span>
                          <span className="text-xs font-medium">72%</span>
                        </div>
                        <Progress value={72} className="h-2" />
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">Close Rate</h4>
                      <Badge variant="default" className="text-xs">
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                        +20%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">You</span>
                          <span className="text-xs font-medium">24%</span>
                        </div>
                        <Progress value={24} className="h-2 bg-primary/10" />
                      </div>
                      <div className="w-4"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Team Avg</span>
                          <span className="text-xs font-medium">20%</span>
                        </div>
                        <Progress value={20} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">Revenue</h4>
                      <Badge variant="default" className="text-xs">
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                        +22.1%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">You</span>
                          <span className="text-xs font-medium">$12,450</span>
                        </div>
                        <Progress value={100} className="h-2 bg-primary/10" />
                      </div>
                      <div className="w-4"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Team Avg</span>
                          <span className="text-xs font-medium">$10,200</span>
                        </div>
                        <Progress value={81.9} className="h-2" />
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">Enablement Score</h4>
                      {!isNewAccount && (
                        <Badge variant="default" className="text-xs">
                          <ArrowUpRight className="mr-1 h-3 w-3" />
                          +9.3%
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">You</span>
                          <span className="text-xs font-medium">{isNewAccount ? "0/100" : "82/100"}</span>
                        </div>
                        <Progress value={isNewAccount ? 0 : 82} className="h-2 bg-primary/10" />
                      </div>
                      <div className="w-4"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Team Avg</span>
                          <span className="text-xs font-medium">{isNewAccount ? "0/100" : "75/100"}</span>
                        </div>
                        <Progress value={isNewAccount ? 0 : 75} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Team Leaderboard
              </Button>
            </CardFooter>
          </Card>

          {/* Daily Report Submission Form */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Report Submission</CardTitle>
              <CardDescription>Update your metrics to keep your dashboard current</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                <div className="rounded-lg border p-3">
                  <label className="text-sm font-medium">Calls Booked</label>
                  <div className="mt-1 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <input
                      type="number"
                      className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                      placeholder="Enter number"
                    />
                  </div>
                </div>
                <div className="rounded-lg border p-3">
                  <label className="text-sm font-medium">Calls Completed</label>
                  <div className="mt-1 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <input
                      type="number"
                      className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                      placeholder="Enter number"
                    />
                  </div>
                </div>
                <div className="rounded-lg border p-3">
                  <label className="text-sm font-medium">Deals Closed</label>
                  <div className="mt-1 flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <input
                      type="number"
                      className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                      placeholder="Enter number"
                    />
                  </div>
                </div>
                <div className="rounded-lg border p-3">
                  <label className="text-sm font-medium">Revenue Generated</label>
                  <div className="mt-1 flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <input
                      type="number"
                      className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border p-3">
                  <label className="text-sm font-medium">Training Completed</label>
                  <div className="mt-1 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <select className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option value="">Select option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="partial">Partial</option>
                    </select>
                  </div>
                </div>
                <div className="rounded-lg border p-3">
                  <label className="text-sm font-medium">Notes</label>
                  <div className="mt-1">
                    <textarea
                      className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                      rows={1}
                      placeholder="Any additional notes about today's calls"
                    ></textarea>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset</Button>
              <Button>Submit Daily Report</Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Manager View */}
      {userRole === "manager" && (
        <div className="space-y-4">
          {/* Introduction */}
          <div className="mt-4 mb-8">
            <h1 className="text-3xl font-bold">Welcome, {userName}! 👋</h1>
            <p className="text-muted-foreground mt-1">
              Lead your team to success. Enabl is your advantage.
            </p>
          </div>

          {/* Today's Focus for Manager */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListTodo className="h-5 w-5 text-primary" />
                Today's Focus
              </CardTitle>
              <CardDescription>Your management tasks and priorities for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {/* Team KPI Alert */}
                <div className="flex items-start gap-3 rounded-md border p-3 bg-red-50">
                  <Checkbox id="kpi-alert-1" className="mt-1" />
                  <div className="flex-1">
                    <label htmlFor="kpi-alert-1" className="text-sm font-medium cursor-pointer">
                      Review Mike Brown's low show-up rate (60% vs 80% target)
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        KPI Alert
                      </Badge>
                      <span className="text-xs text-muted-foreground">Requires immediate attention</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Live Training Session */}
                <div className="flex items-start gap-3 rounded-md border p-3 bg-green-50">
                  <Checkbox id="training-manager-1" className="mt-1" />
                  <div className="flex-1">
                    <label htmlFor="training-manager-1" className="text-sm font-medium cursor-pointer">
                      Lead "Q4 Sales Strategy" team training session
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        <Video className="h-3 w-3 mr-1" />
                        Live Training
                      </Badge>
                      <span className="text-xs text-muted-foreground">Today, 3:00 PM - 4:00 PM</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Training Approval Task */}
                <div className="flex items-start gap-3 rounded-md border p-3">
                  <Checkbox id="approval-task-1" className="mt-1" />
                  <div className="flex-1">
                    <label htmlFor="approval-task-1" className="text-sm font-medium cursor-pointer">
                      Review and approve training assignments for next week
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        <BookOpen className="h-3 w-3 mr-1" />
                        Training Management
                      </Badge>
                      <span className="text-xs text-muted-foreground">Due today</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Additional tasks shown when expanded */}
                {showAllManagerTasks && (
                  <>
                    <div className="flex items-start gap-3 rounded-md border p-3">
                      <Checkbox id="manager-task-4" className="mt-1" />
                      <div className="flex-1">
                        <label htmlFor="manager-task-4" className="text-sm font-medium cursor-pointer">
                          1:1 coaching session with Sarah Rodriguez
                        </label>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            <Users className="h-3 w-3 mr-1" />
                            Coaching
                          </Badge>
                          <span className="text-xs text-muted-foreground">Today, 5:00 PM - 5:30 PM</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-start gap-3 rounded-md border p-3">
                      <Checkbox id="manager-task-5" className="mt-1" />
                      <div className="flex-1">
                        <label htmlFor="manager-task-5" className="text-sm font-medium cursor-pointer">
                          Review daily team performance reports
                        </label>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            <LineChart className="h-3 w-3 mr-1" />
                            Analytics
                          </Badge>
                          <span className="text-xs text-muted-foreground">End of day</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}

                {/* Show remaining tasks count or collapse option */}
                {!showAllManagerTasks ? (
                  <div className="text-center pt-2">
                    <p className="text-xs text-muted-foreground">+2 more tasks for today</p>
                  </div>
                ) : (
                  <div className="text-center pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAllManagerTasks(false)}
                      className="text-xs text-muted-foreground"
                    >
                      Show less
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setShowAllManagerTasks(!showAllManagerTasks)}>
                {showAllManagerTasks ? "Show Less Tasks" : "Show All Today's Tasks"}
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team Size</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">8 Closers, 4 Setters</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team Booking Rate</CardTitle>
                <Phone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">38%</div>
                <p className="text-xs text-muted-foreground">+3.2% from last week</p>
                <div className="mt-2 flex items-center gap-2">
                  <p className="text-xs text-muted-foreground">Target: 40%</p>
                  <Badge variant="outline" className="text-xs">
                    95% of KPI
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team Close Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">22%</div>
                <p className="text-xs text-muted-foreground">+1.5% from last week</p>
                <div className="mt-2 flex items-center gap-2">
                  <p className="text-xs text-muted-foreground">Target: 25%</p>
                  <Badge variant="outline" className="text-xs">
                    88% of KPI
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team Revenue</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$87,450</div>
                <p className="text-xs text-muted-foreground">+8.3% from last month</p>
                <div className="mt-2 flex items-center gap-2">
                  <p className="text-xs text-muted-foreground">Target: $100,000</p>
                  <Badge variant="outline" className="text-xs">
                    87% of KPI
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Rest of manager view content continues as before... */}
          {/* Enablement Score vs Performance */}
          <Card>
            <CardHeader>
              <div className="flex flex-col space-y-1.5">
                <CardTitle>Enablement Score vs Performance</CardTitle>
                <CardDescription>How enablement scores correlate with performance metrics</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="relative pt-6">
              {/* Position the correlation and legend above the chart */}
              <div className="flex justify-between items-center mb-4">
                <div></div> {/* Empty div for spacing */}
                <div className="flex items-center gap-6">
                  <div className="text-sm font-medium px-3 py-1 bg-white/90 border rounded-md shadow-sm">
                    Correlation: 0.78
                  </div>
                  <div className="flex items-center gap-4 px-3 py-1 bg-white/90 border rounded-md shadow-sm">
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span className="text-xs">Setters</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                      <span className="text-xs">Closers</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[350px] w-full rounded-md border p-4">
                <div className="h-full w-full relative">
                  {/* Chart Container */}
                  <div className="absolute inset-0 p-6">
                    {/* Y-axis label */}
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-muted-foreground">
                      Performance Score
                    </div>

                    {/* X-axis label */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                      Enablement Score
                    </div>

                    {/* Y-axis */}
                    <div className="absolute left-10 top-4 bottom-10 w-px bg-border"></div>

                    {/* X-axis */}
                    <div className="absolute left-10 right-4 bottom-10 h-px bg-border"></div>

                    {/* Y-axis ticks */}
                    <div className="absolute left-8 top-4 h-px w-4 bg-border"></div>
                    <div className="absolute left-6 top-4 text-[10px] text-muted-foreground">100</div>

                    <div className="absolute left-8 top-[calc(25%+10px)] h-px w-4 bg-border"></div>
                    <div className="absolute left-6 top-[calc(25%+10px)] text-[10px] text-muted-foreground">75</div>

                    <div className="absolute left-8 top-[calc(50%+10px)] h-px w-4 bg-border"></div>
                    <div className="absolute left-6 top-[calc(50%+10px)] text-[10px] text-muted-foreground">50</div>

                    <div className="absolute left-8 top-[calc(75%+10px)] h-px w-4 bg-border"></div>
                    <div className="absolute left-6 top-[calc(75%+10px)] text-[10px] text-muted-foreground">25</div>

                    {/* X-axis ticks */}
                    <div className="absolute left-10 bottom-8 h-4 w-px bg-border"></div>
                    <div className="absolute left-8 bottom-4 text-[10px] text-muted-foreground">0</div>

                    <div className="absolute left-[calc(25%+10px)] bottom-8 h-4 w-px bg-border"></div>
                    <div className="absolute left-[calc(25%+8px)] bottom-4 text-[10px] text-muted-foreground">25</div>

                    <div className="absolute left-[calc(50%+10px)] bottom-8 h-4 w-px bg-border"></div>
                    <div className="absolute left-[calc(50%+8px)] bottom-4 text-[10px] text-muted-foreground">50</div>

                    <div className="absolute left-[calc(75%+10px)] bottom-8 h-4 w-px bg-border"></div>
                    <div className="absolute left-[calc(75%+8px)] bottom-4 text-[10px] text-muted-foreground">75</div>

                    <div className="absolute right-4 bottom-8 h-4 w-px bg-border"></div>
                    <div className="absolute right-2 bottom-4 text-[10px] text-muted-foreground">100</div>

                    {/* Trend line */}
                    <div className="absolute left-[calc(10px+10%)] bottom-[calc(10px+15%)] right-[calc(4px+10%)] top-[calc(4px+15%)] border-t-2 border-primary/50 -rotate-[30deg] origin-bottom-left"></div>

                    {/* Data points - Setters (circles) */}
                    <div
                      className="absolute left-[calc(10px+65%)] bottom-[calc(10px+55%)] h-3 w-3 rounded-full bg-blue-500 transform -translate-x-1/2 -translate-y-1/2"
                      title="Mike B. - Setter"
                    ></div>
                    <div
                      className="absolute left-[calc(10px+72%)] bottom-[calc(10px+62%)] h-3 w-3 rounded-full bg-blue-500 transform -translate-x-1/2 -translate-y-1/2"
                      title="Lisa W. - Setter"
                    ></div>
                    <div
                      className="absolute left-[calc(10px+58%)] bottom-[calc(10px+48%)] h-3 w-3 rounded-full bg-blue-500 transform -translate-x-1/2 -translate-y-1/2"
                      title="Tom P. - Setter"
                    ></div>
                    <div
                      className="absolute left-[calc(10px+85%)] bottom-[calc(10px+70%)] h-3 w-3 rounded-full bg-blue-500 transform -translate-x-1/2 -translate-y-1/2"
                      title="Alex K. - Setter"
                    ></div>

                    {/* Data points - Closers (diamonds) */}
                    <div
                      className="absolute left-[calc(10px+78%)] bottom-[calc(10px+68%)] h-3 w-3 bg-purple-500 transform -translate-x-1/2 -translate-y-1/2 rotate-45"
                      title="Jane S. - Closer"
                    ></div>
                    <div
                      className="absolute left-[calc(10px+82%)] bottom-[calc(10px+72%)] h-3 w-3 bg-purple-500 transform -translate-x-1/2 -translate-y-1/2 rotate-45"
                      title="Sarah R. - Closer"
                    ></div>
                    <div
                      className="absolute left-[calc(10px+75%)] bottom-[calc(10px+65%)] h-3 w-3 bg-purple-500 transform -translate-x-1/2 -translate-y-1/2 rotate-45"
                      title="David M. - Closer"
                    ></div>
                    <div
                      className="absolute left-[calc(10px+90%)] bottom-[calc(10px+78%)] h-3 w-3 bg-purple-500 transform -translate-x-1/2 -translate-y-1/2 rotate-45"
                      title="Emma L. - Closer"
                    ></div>
                    <div
                      className="absolute left-[calc(10px+68%)] bottom-[calc(10px+58%)] h-3 w-3 bg-purple-500 transform -translate-x-1/2 -translate-y-1/2 rotate-45"
                      title="John D. - Closer"
                    ></div>
                    <div
                      className="absolute left-[calc(10px+62%)] bottom-[calc(10px+52%)] h-3 w-3 bg-purple-500 transform -translate-x-1/2 -translate-y-1/2 rotate-45"
                      title="Maria G. - Closer"
                    ></div>
                    <div
                      className="absolute left-[calc(10px+55%)] bottom-[calc(10px+45%)] h-3 w-3 bg-purple-500 transform -translate-x-1/2 -translate-y-1/2 rotate-45"
                      title="Robert T. - Closer"
                    ></div>
                    <div
                      className="absolute left-[calc(10px+88%)] bottom-[calc(10px+76%)] h-3 w-3 bg-purple-500 transform -translate-x-1/2 -translate-y-1/2 rotate-45"
                      title="Sophia C. - Closer"
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Detailed Analysis
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-4">
            {/* Team Metrics vs KPIs */}
            <Card>
              <CardHeader>
                <CardTitle>Team Metrics vs KPIs</CardTitle>
                <CardDescription>Overall team performance against targets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Positive Conversations</p>
                        <Badge variant="outline" className="text-xs">
                          92% of KPI
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-xl font-bold">368</p>
                        <p className="text-sm text-muted-foreground">Target: 400</p>
                      </div>
                      <Progress value={92} className="mt-2 h-1" />
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Booking Rate</p>
                        <Badge variant="outline" className="text-xs">
                          95% of KPI
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-xl font-bold">38%</p>
                        <p className="text-sm text-muted-foreground">Target: 40%</p>
                      </div>
                      <Progress value={95} className="mt-2 h-1" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Show-Up Rate</p>
                        <Badge variant="outline" className="text-xs">
                          97% of KPI
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-xl font-bold">78%</p>
                        <p className="text-sm text-muted-foreground">Target: 80%</p>
                      </div>
                      <Progress value={97.5} className="mt-2 h-1" />
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Close Rate</p>
                        <Badge variant="outline" className="text-xs">
                          88% of KPI
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-xl font-bold">22%</p>
                        <p className="text-sm text-muted-foreground">Target: 25%</p>
                      </div>
                      <Progress value={88} className="mt-2 h-1" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Revenue Generated</p>
                        <Badge variant="outline" className="text-xs">
                          82% of KPI
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-xl font-bold">$82,000</p>
                        <p className="text-sm text-muted-foreground">Target: $100,000</p>
                      </div>
                      <Progress value={82} className="mt-2 h-1" />
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Enablement Score</p>
                        <Badge variant="outline" className="text-xs">
                          90% of KPI
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-xl font-bold">90/100</p>
                        <p className="text-sm text-muted-foreground">Target: 100/100</p>
                      </div>
                      <Progress value={90} className="mt-2 h-1" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Detailed Team Report
                </Button>
              </CardFooter>
            </Card>

            {/* Bottleneck Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Bottleneck Alerts</CardTitle>
                <CardDescription>Issues requiring your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-md border border-destructive/20 bg-destructive/10 p-3">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Low show-up rate</p>
                      <p className="text-xs text-muted-foreground">Mike Brown: 60% (Target: 80%)</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Action
                    </Button>
                  </div>
                  <div className="flex items-center gap-3 rounded-md border border-destructive/20 bg-destructive/10 p-3">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">No bookings in 3 days</p>
                      <p className="text-xs text-muted-foreground">Sarah Rodriguez</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Action
                    </Button>
                  </div>
                  <div className="flex items-center gap-3 rounded-md border border-amber-500/20 bg-amber-500/10 p-3">
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Low confidence score</p>
                      <p className="text-xs text-muted-foreground">Alex Kim: 65% (Target: 75%)</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Action
                    </Button>
                  </div>
                  <div className="flex items-center gap-3 rounded-md border border-amber-500/20 bg-amber-500/10 p-3">
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Training completion low</p>
                      <p className="text-xs text-muted-foreground">Tom Parker: 60% (Target: 85%)</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Action
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Alerts
                </Button>
              </CardFooter>
            </Card>

            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle>Leaderboard</CardTitle>
                <CardDescription>Top performers this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Top Setters</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 rounded-md border p-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <Award className="h-4 w-4 text-primary" />
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                          <AvatarFallback>MB</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Mike Brown</p>
                          <p className="text-xs text-muted-foreground">56 Calls Booked</p>
                        </div>
                        <Badge>42%</Badge>
                      </div>
                      <div className="flex items-center gap-2 rounded-md border p-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <Award className="h-4 w-4 text-primary" />
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                          <AvatarFallback>LW</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Lisa Wong</p>
                          <p className="text-xs text-muted-foreground">48 Calls Booked</p>
                        </div>
                        <Badge>39%</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Top Closers</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 rounded-md border p-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <Award className="h-4 w-4 text-primary" />
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Jane Smith</p>
                          <p className="text-xs text-muted-foreground">$18,450 Revenue</p>
                        </div>
                        <Badge>32%</Badge>
                      </div>
                      <div className="flex items-center gap-2 rounded-md border p-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <Award className="h-4 w-4 text-primary" />
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                          <AvatarFallback>SR</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Sarah Rodriguez</p>
                          <p className="text-xs text-muted-foreground">$15,200 Revenue</p>
                        </div>
                        <Badge>28%</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Full Leaderboard
                </Button>
              </CardFooter>
            </Card>

            {/* Rep Activity Heatmap */}
            <Card>
              <CardHeader>
                <CardTitle>Rep Activity Heatmap</CardTitle>
                <CardDescription>Activity by day of week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Rep</TableHead>
                          <TableHead className="text-center">M</TableHead>
                          <TableHead className="text-center">T</TableHead>
                          <TableHead className="text-center">W</TableHead>
                          <TableHead className="text-center">T</TableHead>
                          <TableHead className="text-center">F</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Jane S.</TableCell>
                          <TableCell className="p-1 text-center">
                            <div className="mx-auto h-6 w-6 rounded-sm bg-green-500/90" title="High activity"></div>
                          </TableCell>
                          <TableCell className="p-1 text-center">
                            <div className="mx-auto h-6 w-6 rounded-sm bg-green-500/90" title="High activity"></div>
                          </TableCell>
                          <TableCell className="p-1 text-center">
                            <div className="mx-auto h-6 w-6 rounded-sm bg-amber-500/80" title="Medium activity"></div>
                          </TableCell>
                          <TableCell className="p-1 text-center">
                            <div className="mx-auto h-6 w-6 rounded-sm bg-green-500/90" title="High activity"></div>
                          </TableCell>
                          <TableCell className="p-1 text-center">
                            <div className="mx-auto h-6 w-6 rounded-sm bg-amber-500/80" title="Medium activity"></div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Mike B.</TableCell>
                          <TableCell className="p-1 text-center">
                            <div className="mx-auto h-6 w-6 rounded-sm bg-green-500/90" title="High activity"></div>
                          </TableCell>
                          <TableCell className="p-1 text-center">
                            <div className="mx-auto h-6 w-6 rounded-sm bg-green-500/90" title="High activity"></div>
                          </TableCell>
                          <TableCell className="p-1 text-center">
                            <div className="mx-auto h-6 w-6 rounded-sm bg-green-500/90" title="High activity"></div>
                          </TableCell>
                          <TableCell className="p-1 text-center">
                            <div className="mx-auto h-6 w-6 rounded-sm bg-amber-500/80" title="Medium activity"></div>
                          </TableCell>
                          <TableCell className="p-1 text-center">
                            <div className="mx-auto h-6 w-6 rounded-sm bg-amber-500/80" title="Medium activity"></div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Sarah R.</TableCell>
                          <TableCell className="p-1 text-center">
                            <div className="mx-auto h-6 w-6 rounded-sm bg-amber-500/80" title="Medium activity"></div>
                          </TableCell>
                          <TableCell className="p-1 text-center">
                            <div className="mx-auto h-6 w-6 rounded-sm bg-amber-500/80" title="Medium activity"></div>
                          </TableCell>
                          <TableCell className="p-1 text-center">
                            <div className="mx-auto h-6 w-6 rounded-sm bg-red-500/80" title="Low activity"></div>
                          </TableCell>
                          <TableCell className="p-1 text-center">
                            <div className="mx-auto h-6 w-6 rounded-sm bg-red-500/80" title="Low activity"></div>
                          </TableCell>
                          <TableCell className="p-1 text-center">
                            <div className="mx-auto h-6 w-6 rounded-sm bg-amber-500/80" title="Medium activity"></div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Alex K.</TableCell>
                          <TableCell className="p-1 text-center">
                            <div className="mx-auto h-6 w-6 rounded-sm bg-green-500/90" title="High activity"></div>
                          </TableCell>
                          <TableCell className="p-1 text-center">
                            <div className="mx-auto h-6 w-6 rounded-sm bg-amber-500/80" title="Medium activity"></div>
                          </TableCell>
                          <TableCell className="p-1 text-center">
                            <div className="mx-auto h-6 w-6 rounded-sm bg-amber-500/80" title="Medium activity"></div>
                          </TableCell>
                          <TableCell className="p-1 text-center">
                            <div className="mx-auto h-6 w-6 rounded-sm bg-amber-500/80" title="Medium activity"></div>
                          </TableCell>
                          <TableCell className="p-1 text-center">
                            <div className="mx-auto h-6 w-6 rounded-sm bg-amber-500/80" title="Medium activity"></div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-sm bg-green-500/90"></div>
                      <span>High</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-sm bg-amber-500/80"></div>
                      <span>Medium</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-sm bg-red-500/80"></div>
                      <span>Low</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Training Data
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
