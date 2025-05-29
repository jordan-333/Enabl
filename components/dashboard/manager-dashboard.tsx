"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Calendar,
  CheckCircle,
  FileText,
  LineChart,
  Phone,
  PieChart,
  Target,
  TrendingUpIcon as Trending,
  Users,
} from "lucide-react"
import EnablementPerformanceChart from "./enablement-performance-chart"
import { useUser } from "@/components/user-context"
import { TeamDataPlaceholder, PerformanceChartPlaceholder } from "./new-account-placeholder"

export default function ManagerDashboard() {
  const { isNewAccount } = useUser()

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isNewAccount ? "1" : "12"}</div>
            <p className="text-xs text-muted-foreground">
              {isNewAccount ? "Just you for now" : "4 setters, 8 closers"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calls Reviewed</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isNewAccount ? "0" : "28"}</div>
            <p className="text-xs text-muted-foreground">{isNewAccount ? "No reviews yet" : "+8 from last week"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Completion</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isNewAccount ? "0%" : "87%"}</div>
            <p className="text-xs text-muted-foreground">{isNewAccount ? "No data yet" : "+5% from last month"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Performance</CardTitle>
            <Trending className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isNewAccount ? "0%" : "+12%"}</div>
            <p className="text-xs text-muted-foreground">
              {isNewAccount ? "No data yet" : "Improvement in close rate"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {isNewAccount ? (
              <PerformanceChartPlaceholder />
            ) : (
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Team Performance</CardTitle>
                  <CardDescription>Performance metrics across all team members</CardDescription>
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
                <CardTitle>Training Progress</CardTitle>
                <CardDescription>Completion rates by training module</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <PieChart className="h-8 w-8 text-muted" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Call Quality Metrics</CardTitle>
                <CardDescription>Average scores across key metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <BarChart className="h-8 w-8 text-muted" />
                </div>
              </CardContent>
            </Card>
            {isNewAccount ? (
              <TeamDataPlaceholder />
            ) : (
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Team Activity</CardTitle>
                  <CardDescription>Recent calls, training, and feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <Phone className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Sarah completed 5 call reviews</p>
                        <p className="text-sm text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          New training module assigned to 8 team members
                        </p>
                        <p className="text-sm text-muted-foreground">Yesterday</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <Target className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Team reached 90% of monthly call quota</p>
                        <p className="text-sm text-muted-foreground">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-3">
              <EnablementPerformanceChart />
            </Card>
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Team Performance Score</CardTitle>
                <CardDescription>Actual team performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="relative h-40 w-40">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl font-bold">{isNewAccount ? "0" : "76"}</div>
                    </div>
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      <circle className="stroke-muted stroke-[8px] fill-none" cx="50" cy="50" r="40" />
                      <circle
                        className="stroke-primary stroke-[8px] fill-none"
                        cx="50"
                        cy="50"
                        r="40"
                        strokeDasharray="251.2"
                        strokeDashoffset={isNewAccount ? "251.2" : "60.288"}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{isNewAccount ? "No data" : "Good"}</p>
                    <p className="text-xs text-muted-foreground">
                      {isNewAccount ? "Add team members to see performance" : "+2 points from last month"}
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                      <span className="text-sm">Target Achievement</span>
                    </div>
                    <span className="text-sm font-medium">{isNewAccount ? "0%" : "74%"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-orange-500 mr-2"></div>
                      <span className="text-sm">Call Quality Scores</span>
                    </div>
                    <span className="text-sm font-medium">{isNewAccount ? "0%" : "78%"}</span>
                  </div>
                  <div className="mt-4 pt-2 border-t">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Role Breakdown</div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Setters</span>
                        <span className="text-sm font-medium">{isNewAccount ? "0%" : "72%"}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Closers</span>
                        <span className="text-sm font-medium">{isNewAccount ? "0%" : "80%"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>Detailed metrics and trends for your team</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <LineChart className="mx-auto h-12 w-12 text-muted" />
                <p className="mt-2 text-muted-foreground">Analytics dashboard content</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Training Overview</CardTitle>
              <CardDescription>Training completion and effectiveness</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <CheckCircle className="mx-auto h-12 w-12 text-muted" />
                <p className="mt-2 text-muted-foreground">Training dashboard content</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Schedule</CardTitle>
              <CardDescription>Upcoming training and coaching sessions</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <Calendar className="mx-auto h-12 w-12 text-muted" />
                <p className="mt-2 text-muted-foreground">Schedule dashboard content</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
