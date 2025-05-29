"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, CheckCircle, Clock, DollarSign, FileText, LineChart, Phone, Target, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useUser } from "@/components/user-context"
import { CallsPlaceholder, SchedulePlaceholder, PerformanceChartPlaceholder } from "./new-account-placeholder"

export default function CloserDashboard() {
  const { isNewAccount } = useUser()

  return (
    <div className="space-y-4">
      {/* Top KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Demo Calls</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isNewAccount ? "0" : "18"}</div>
            <p className="text-xs text-muted-foreground">{isNewAccount ? "No data yet" : "+3 from last week"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deals Closed</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isNewAccount ? "0" : "7"}</div>
            <p className="text-xs text-muted-foreground">{isNewAccount ? "No data yet" : "+2 from last month"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Close Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isNewAccount ? "0%" : "32%"}</div>
            <p className="text-xs text-muted-foreground">{isNewAccount ? "No data yet" : "+5% from last quarter"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Call Score</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isNewAccount ? "0/10" : "8.2/10"}</div>
            <p className="text-xs text-muted-foreground">{isNewAccount ? "No data yet" : "+0.3 from last month"}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="calls">My Calls</TabsTrigger>
          <TabsTrigger value="training">My Training</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* SECTION 1: Sales Performance and Deal Breakdown */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {isNewAccount ? (
              <PerformanceChartPlaceholder />
            ) : (
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Sales Performance</CardTitle>
                  <CardDescription>Your sales metrics over the past quarter</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                    <LineChart className="h-8 w-8 text-muted" />
                  </div>
                </CardContent>
              </Card>
            )}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Deal Breakdown</CardTitle>
                <CardDescription>Current deals by stage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Discovery</div>
                      <div className="text-sm text-muted-foreground">{isNewAccount ? "0 deals" : "4 deals"}</div>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Demo</div>
                      <div className="text-sm text-muted-foreground">{isNewAccount ? "0 deals" : "6 deals"}</div>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Proposal</div>
                      <div className="text-sm text-muted-foreground">{isNewAccount ? "0 deals" : "3 deals"}</div>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Negotiation</div>
                      <div className="text-sm text-muted-foreground">{isNewAccount ? "0 deals" : "2 deals"}</div>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* SECTION 2: Today's Calls and Upcoming Sessions */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {isNewAccount ? (
              <CallsPlaceholder />
            ) : (
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Today's Calls</CardTitle>
                  <CardDescription>Feedback from your recent calls</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">Demo Call - Enterprise Co.</div>
                        <div className="text-sm font-medium">8.7/10</div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        "Excellent product knowledge. Could improve on handling pricing objections."
                      </p>
                      <div className="text-xs text-muted-foreground">3 days ago</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">Closing Call - Tech Solutions</div>
                        <div className="text-sm font-medium">9.2/10</div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        "Great job addressing concerns and closing the deal efficiently."
                      </p>
                      <div className="text-xs text-muted-foreground">1 week ago</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            {isNewAccount ? (
              <SchedulePlaceholder />
            ) : (
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Upcoming Sessions</CardTitle>
                  <CardDescription>Your scheduled training and coaching</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Advanced Negotiation Workshop</p>
                        <p className="text-sm text-muted-foreground">Tomorrow, 3:00 PM - 4:30 PM</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Join
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">1:1 Performance Review</p>
                        <p className="text-sm text-muted-foreground">Thursday, 11:00 AM - 12:00 PM</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Prepare
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Product Update Training</p>
                        <p className="text-sm text-muted-foreground">Next Tuesday, 2:00 PM - 3:00 PM</p>
                      </div>
                      <Button variant="outline" size="sm">
                        RSVP
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* SECTION 3: Enablement Score, Enablement Breakdown, and Performance Score */}
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
                      <div className="text-4xl font-bold">{isNewAccount ? "0" : "84"}</div>
                    </div>
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      <circle className="stroke-muted stroke-[8px] fill-none" cx="50" cy="50" r="40" />
                      <circle
                        className="stroke-primary stroke-[8px] fill-none"
                        cx="50"
                        cy="50"
                        r="40"
                        strokeDasharray="251.2"
                        strokeDashoffset={isNewAccount ? "251.2" : "40.192"}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{isNewAccount ? "No data" : "Excellent"}</p>
                    <p className="text-xs text-muted-foreground">
                      {isNewAccount ? "Complete activities to see your score" : "+3 points from last month"}
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">Training Completion</span>
                    </div>
                    <span className="text-sm font-medium">{isNewAccount ? "0%" : "90%"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm">Live Training Attendance</span>
                    </div>
                    <span className="text-sm font-medium">{isNewAccount ? "0%" : "85%"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-sm">Calls Submitted</span>
                    </div>
                    <span className="text-sm font-medium">{isNewAccount ? "0%" : "78%"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Enablement Score</CardTitle>
                <CardDescription>Your skills and enablement assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Demo Skills</div>
                      <div className="text-sm font-medium">{isNewAccount ? "0%" : "88%"}</div>
                    </div>
                    <Progress value={isNewAccount ? 0 : 88} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Product Knowledge</div>
                      <div className="text-sm font-medium">{isNewAccount ? "0%" : "92%"}</div>
                    </div>
                    <Progress value={isNewAccount ? 0 : 92} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Objection Handling</div>
                      <div className="text-sm font-medium">{isNewAccount ? "0%" : "85%"}</div>
                    </div>
                    <Progress value={isNewAccount ? 0 : 85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Negotiation</div>
                      <div className="text-sm font-medium">{isNewAccount ? "0%" : "80%"}</div>
                    </div>
                    <Progress value={isNewAccount ? 0 : 80} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Closing Techniques</div>
                      <div className="text-sm font-medium">{isNewAccount ? "0%" : "78%"}</div>
                    </div>
                    <Progress value={isNewAccount ? 0 : 78} className="h-2" />
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
                      <div className="text-4xl font-bold">{isNewAccount ? "0" : "80"}</div>
                    </div>
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      <circle className="stroke-muted stroke-[8px] fill-none" cx="50" cy="50" r="40" />
                      <circle
                        className="stroke-primary stroke-[8px] fill-none"
                        cx="50"
                        cy="50"
                        r="40"
                        strokeDasharray="251.2"
                        strokeDashoffset={isNewAccount ? "251.2" : "50.24"}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{isNewAccount ? "No data" : "Excellent"}</p>
                    <p className="text-xs text-muted-foreground">
                      {isNewAccount ? "Complete activities to see your score" : "+4 points from last month"}
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                      <span className="text-sm">Target Achievement</span>
                    </div>
                    <span className="text-sm font-medium">{isNewAccount ? "0%" : "82%"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-orange-500 mr-2"></div>
                      <span className="text-sm">Call Quality Scores</span>
                    </div>
                    <span className="text-sm font-medium">{isNewAccount ? "0%" : "78%"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Pipeline</CardTitle>
              <CardDescription>Your current deals and opportunities</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <DollarSign className="mx-auto h-12 w-12 text-muted" />
                <p className="mt-2 text-muted-foreground">Pipeline content</p>
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

        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Training</CardTitle>
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
      </Tabs>
    </div>
  )
}
