"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowUp, BarChart, Calendar, CheckCircle, Clock, FileText, LineChart, Phone, Target } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CloserView() {
  return (
    <div className="flex flex-col gap-4">
      {/* Today's Focus */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Today's Focus</CardTitle>
          <CardDescription>Your priorities for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Complete 5 demo calls</div>
                <div className="text-sm text-muted-foreground">3 of 5 completed</div>
              </div>
              <Progress value={60} className="w-[60px]" />
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Target className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Close 2 deals</div>
                <div className="text-sm text-muted-foreground">1 of 2 completed</div>
              </div>
              <Progress value={50} className="w-[60px]" />
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-2">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Submit daily report</div>
                <div className="text-sm text-muted-foreground">Due by 5:00 PM</div>
              </div>
              <Button variant="outline" size="sm">
                Submit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Report Submission Reminder */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Clock className="h-5 w-5 text-yellow-600" />
            <div className="flex-1">
              <div className="font-medium text-yellow-800">Daily Report Submission Reminder</div>
              <div className="text-sm text-yellow-700">Please submit your daily report by 5:00 PM today</div>
            </div>
            <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
              Submit Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calls Booked</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">12%</span> from last week
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Show-up Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">3%</span> from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Close Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">5%</span> from last quarter
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$42.5K</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">10%</span> from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Calls - Moved above Enablement Score */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Calls</CardTitle>
          <CardDescription>Your scheduled calls for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Acme Inc. - Demo Call</div>
                  <div className="text-sm text-muted-foreground">2:00 PM - 3:00 PM</div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Join
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">TechCorp - Follow-up Call</div>
                  <div className="text-sm text-muted-foreground">4:30 PM - 5:00 PM</div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Join
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Global Solutions - Closing Call</div>
                  <div className="text-sm text-muted-foreground">Tomorrow, 10:00 AM - 11:00 AM</div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Prepare
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enablement Score - Moved below Today's Calls */}
      <Card>
        <CardHeader>
          <CardTitle>Enablement Score</CardTitle>
          <CardDescription>Your performance and training engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="relative h-40 w-40">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl font-bold">78</div>
                </div>
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <circle className="stroke-muted stroke-[8px] fill-none" cx="50" cy="50" r="40" />
                  <circle
                    className="stroke-primary stroke-[8px] fill-none"
                    cx="50"
                    cy="50"
                    r="40"
                    strokeDasharray="251.2"
                    strokeDashoffset="55.264"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
              <div className="mt-2 text-center text-sm text-muted-foreground">out of 100</div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Training Completion</div>
                  <div className="flex items-center text-sm">
                    <span>80%</span>
                    <ArrowUp className="ml-1 h-3 w-3 text-green-500" />
                    <span className="text-green-500">5%</span>
                  </div>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Demo Performance</div>
                  <div className="flex items-center text-sm">
                    <span>75%</span>
                    <ArrowUp className="ml-1 h-3 w-3 text-green-500" />
                    <span className="text-green-500">3%</span>
                  </div>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Closing Techniques</div>
                  <div className="flex items-center text-sm">
                    <span>82%</span>
                    <ArrowUp className="ml-1 h-3 w-3 text-green-500" />
                    <span className="text-green-500">7%</span>
                  </div>
                </div>
                <Progress value={82} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Engagement Score</div>
                  <div className="flex items-center text-sm">
                    <span>85%</span>
                    <ArrowUp className="ml-1 h-3 w-3 text-green-500" />
                    <span className="text-green-500">2%</span>
                  </div>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <Button variant="outline" className="w-full max-w-xs">
              View Detailed Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Team Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Team Comparison</CardTitle>
          <CardDescription>How you compare to your team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center">
            <BarChart className="h-8 w-8 text-muted" />
          </div>
        </CardContent>
      </Card>

      {/* Daily Report Submission */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Report Submission</CardTitle>
          <CardDescription>Track your daily report submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-green-100 p-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium">Yesterday's Report</div>
                  <div className="text-sm text-muted-foreground">Submitted on time</div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-yellow-100 p-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <div className="font-medium">Today's Report</div>
                  <div className="text-sm text-muted-foreground">Due by 5:00 PM</div>
                </div>
              </div>
              <Button size="sm">Submit</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
