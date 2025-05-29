"use client"

import { useState } from "react"
import { Calendar, Clock, Download, LineChart, Mail, MapPin, Phone, Target, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EditProfileModal } from "@/components/edit-profile-modal"
import { RoleSpecificKPIs, RoleSpecificQuarterlyGoals } from "@/components/role-specific-kpis"
import { useUser } from "@/components/user-context"

export default function ProfilePage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { userRole } = useUser()

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid gap-6">
            {/* Profile Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="John Doe" />
                <AvatarFallback className="text-2xl">JD</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h1 className="text-2xl font-bold">John Doe</h1>
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="secondary">{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</Badge>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    Enterprise Sales Team
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    San Francisco, CA
                  </span>
                </div>
                <p className="text-sm">
                  Sales professional with 5+ years of experience in SaaS sales. Specializing in discovery calls and
                  objection handling.
                </p>
              </div>
              <div className="ml-auto flex flex-col gap-2 md:flex-row">
                <Button variant="outline" size="sm" onClick={() => setIsEditModalOpen(true)}>
                  <User className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
                <Button size="sm">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact
                </Button>
              </div>
            </div>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>john.doe@example.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Reports to: Sarah Johnson (Sales Manager)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Joined: January 15, 2023</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Role-Specific KPIs & Targets */}
            <Card>
              <CardHeader>
                <CardTitle>KPIs & Targets</CardTitle>
                <CardDescription>Your key performance indicators and monthly targets</CardDescription>
              </CardHeader>
              <CardContent>
                <RoleSpecificKPIs role={userRole} />

                {/* Quarterly Goals */}
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-4">
                    Quarterly Goals (Q2 2025)
                  </h4>
                  <RoleSpecificQuarterlyGoals role={userRole} />
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="performance" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="training">Training</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="performance" className="mt-6 space-y-6">
                {/* Performance Metrics */}
                <div className="grid gap-4 md:grid-cols-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Calls Completed</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">42</div>
                      <p className="text-xs text-muted-foreground">+12% from last month</p>
                      <div className="mt-4">
                        <Progress value={75} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Show-Up Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">78%</div>
                      <p className="text-xs text-muted-foreground">-3% from last month</p>
                      <div className="mt-4">
                        <Progress value={78} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Close Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">24%</div>
                      <p className="text-xs text-muted-foreground">+5% from last month</p>
                      <div className="mt-4">
                        <Progress value={24} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Revenue Generated</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$12,450</div>
                      <p className="text-xs text-muted-foreground">+12% from last month</p>
                      <div className="mt-4">
                        <Progress value={62} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Performance Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Trends</CardTitle>
                    <CardDescription>Your performance metrics over the past 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full rounded-md border">
                      <div className="flex h-full w-full items-center justify-center">
                        <LineChart className="h-16 w-16 text-muted-foreground" />
                        <span className="ml-2 text-sm text-muted-foreground">Performance chart will appear here</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle>Achievements & Badges</CardTitle>
                    <CardDescription>Recognition for your performance and growth</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      <div className="flex items-center gap-4 rounded-lg border p-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          <Target className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Top Closer</p>
                          <p className="text-sm text-muted-foreground">April 2025</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 rounded-lg border p-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          <LineChart className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Quota Crusher</p>
                          <p className="text-sm text-muted-foreground">Q1 2025</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 rounded-lg border p-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          <Clock className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">1 Year Anniversary</p>
                          <p className="text-sm text-muted-foreground">January 2024</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="training" className="mt-6 space-y-6">
                {/* Training Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle>Training Progress</CardTitle>
                    <CardDescription>Your progress through required and recommended training</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <p className="text-sm font-medium">Required Training</p>
                          <p className="text-sm font-medium">75% Complete</p>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <p className="text-sm font-medium">Recommended Training</p>
                          <p className="text-sm font-medium">40% Complete</p>
                        </div>
                        <Progress value={40} className="h-2" />
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <p className="text-sm font-medium">Certifications</p>
                          <p className="text-sm font-medium">2/3 Complete</p>
                        </div>
                        <Progress value={66} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Courses */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Courses</CardTitle>
                    <CardDescription>Training courses you've recently engaged with</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                          <p className="font-medium">Objection Handling Masterclass</p>
                          <p className="text-sm text-muted-foreground">2/5 modules completed</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Continue
                        </Button>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                          <p className="font-medium">Product Demo Excellence</p>
                          <p className="text-sm text-muted-foreground">Completed on May 10, 2025</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Review
                        </Button>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                          <p className="font-medium">Closing Techniques</p>
                          <p className="text-sm text-muted-foreground">1/5 modules completed</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Continue
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Training
                    </Button>
                  </CardFooter>
                </Card>

                {/* Certifications */}
                <Card>
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                    <CardDescription>Professional certifications you've earned</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Badge className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Sales Methodology Certification</p>
                            <p className="text-sm text-muted-foreground">Issued March 2025 • Valid for 2 years</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Badge className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Product Specialist</p>
                            <p className="text-sm text-muted-foreground">Issued January 2025 • Valid for 1 year</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="mt-6 space-y-6">
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your recent actions and events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 rounded-lg border p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">Completed a discovery call with Acme Inc.</p>
                            <p className="text-sm text-muted-foreground">2 hours ago</p>
                          </div>
                          <p className="text-sm text-muted-foreground">Call score: 85/100</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 rounded-lg border p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Target className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">Closed a deal with TechStart Ltd.</p>
                            <p className="text-sm text-muted-foreground">Yesterday</p>
                          </div>
                          <p className="text-sm text-muted-foreground">Deal value: $5,200</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 rounded-lg border p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">Completed module 2 of Objection Handling Masterclass</p>
                            <p className="text-sm text-muted-foreground">2 days ago</p>
                          </div>
                          <p className="text-sm text-muted-foreground">Quiz score: 92%</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 rounded-lg border p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">Attended Team Roleplay Session</p>
                            <p className="text-sm text-muted-foreground">3 days ago</p>
                          </div>
                          <p className="text-sm text-muted-foreground">Topic: Handling pricing objections</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Activity
                    </Button>
                  </CardFooter>
                </Card>

                {/* Upcoming Events */}
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Your scheduled calls, meetings, and training sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Team Roleplay Session</p>
                            <p className="text-sm text-muted-foreground">Today, 2:00 PM - 3:00 PM</p>
                          </div>
                        </div>
                        <Button size="sm">Join</Button>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">1:1 Coaching Session</p>
                            <p className="text-sm text-muted-foreground">Tomorrow, 10:00 AM - 10:30 AM</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Prepare
                        </Button>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Demo Call: Innovate Corp</p>
                            <p className="text-sm text-muted-foreground">Friday, 1:00 PM - 2:00 PM</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Prepare
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <EditProfileModal open={isEditModalOpen} onOpenChange={setIsEditModalOpen} />
    </div>
  )
}
