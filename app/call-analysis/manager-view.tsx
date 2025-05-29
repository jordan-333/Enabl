"use client"

import { useState } from "react"
import {
  Play,
  MessageSquare,
  Download,
  Clock,
  Search,
  Star,
  BarChart2,
  Calendar,
  Award,
  ArrowUp,
  Check,
  ChevronDown,
  SlidersHorizontal,
  X,
  MoreHorizontal,
  FileText,
  Share2,
  Flag,
  TrendingUp,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CallLeaderboard } from "@/components/call-leaderboard"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const trainingData = [
  { id: "tr1", title: "Advanced Objection Handling", type: "Course", duration: "45 min" },
  { id: "tr2", title: "Value-Based Pricing Strategies", type: "Course", duration: "60 min" },
  { id: "tr3", title: "Discovery Questioning Framework", type: "Course", duration: "30 min" },
  { id: "tr4", title: "Competitive Positioning Workshop", type: "Workshop", duration: "90 min" },
  { id: "tr5", title: "Executive Conversation Strategies", type: "Course", duration: "45 min" },
  { id: "tr6", title: "ROI Discussion Techniques", type: "Quick Guide", duration: "15 min" },
  { id: "tr7", title: "Closing Techniques Masterclass", type: "Course", duration: "75 min" },
  { id: "tr8", title: "Effective Follow-up Strategies", type: "Quick Guide", duration: "20 min" },
]

export default function ManagerView() {
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [selectedCall, setSelectedCall] = useState<any>(null)
  const [feedback, setFeedback] = useState("")
  const [score, setScore] = useState(7) // Default to 7 out of 10
  const [strengths, setStrengths] = useState("")
  const [improvements, setImprovements] = useState("")
  const [actionItems, setActionItems] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedRole, setSelectedRole] = useState("all-reps")
  const [selectedDate, setSelectedDate] = useState("all")
  const [selectedTrainings, setSelectedTrainings] = useState<string[]>([])
  const [trainingSearchQuery, setTrainingSearchQuery] = useState("")
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Count active filters
  const activeFilterCount = [selectedType !== "all", selectedRole !== "all-reps", selectedDate !== "all"].filter(
    Boolean,
  ).length

  // Reset all filters
  const resetFilters = () => {
    setSelectedType("all")
    setSelectedRole("all-reps")
    setSelectedDate("all")
  }

  const handleReviewClick = (call: any) => {
    setSelectedCall(call)
    setReviewDialogOpen(true)
    // Reset form values
    setFeedback("")
    setScore(7)
    setStrengths("")
    setImprovements("")
    setActionItems("")
    setSelectedTrainings([])
  }

  const toggleTrainingSelection = (id: string) => {
    if (selectedTrainings.includes(id)) {
      setSelectedTrainings(selectedTrainings.filter((item) => item !== id))
    } else {
      setSelectedTrainings([...selectedTrainings, id])
    }
  }

  const filteredTrainingData = trainingData.filter(
    (training) =>
      trainingSearchQuery === "" ||
      training.title.toLowerCase().includes(trainingSearchQuery.toLowerCase()) ||
      training.type.toLowerCase().includes(trainingSearchQuery.toLowerCase()),
  )

  // Sample data for the table
  const callData = [
    {
      id: 1,
      title: "Acme Corp Discovery Call",
      filename: "prospect-discovery-call-may-17.mp3",
      rep: { name: "John Doe", role: "Setter", avatar: "JD" },
      date: "May 17, 2023",
      duration: "23:45",
      type: "Discovery",
      score: 7,
      status: "Needs Feedback",
      statusColor: "amber",
    },
    {
      id: 2,
      title: "TechStart Demo Call",
      filename: "demo-call-techstart-may-15.mp3",
      rep: { name: "Alice Smith", role: "Closer", avatar: "AS" },
      date: "May 15, 2023",
      duration: "45:12",
      type: "Demo",
      score: 8,
      status: "Reviewed",
      statusColor: "green",
    },
    {
      id: 3,
      title: "GlobalCorp Closing Call",
      filename: "closing-call-globalcorp-may-14.mp3",
      rep: { name: "Robert Johnson", role: "Closer", avatar: "RJ" },
      date: "May 14, 2023",
      duration: "37:51",
      type: "Closing",
      score: 5,
      status: "Needs Improvement",
      statusColor: "red",
    },
    {
      id: 4,
      title: "Innovate Inc Chat",
      filename: "chat-innovate-may-16.png",
      rep: { name: "Mike Brown", role: "Setter", avatar: "MB" },
      date: "May 16, 2023",
      duration: "22 messages",
      type: "Chat",
      score: 9,
      status: "Needs Feedback",
      statusColor: "amber",
    },
    {
      id: 5,
      title: "TechFirm Qualification Call",
      filename: "qualification-techfirm-may-19.mp3",
      rep: { name: "Sarah Johnson", role: "Setter", avatar: "SJ" },
      date: "May 19, 2023",
      duration: "18:30",
      type: "Discovery",
      score: 6,
      status: "Needs Feedback",
      statusColor: "amber",
    },
    {
      id: 6,
      title: "MegaCorp Contract Negotiation",
      filename: "negotiation-megacorp-may-18.mp3",
      rep: { name: "David Wilson", role: "Closer", avatar: "DW" },
      date: "May 18, 2023",
      duration: "52:15",
      type: "Negotiation",
      score: 8.5,
      status: "Reviewed",
      statusColor: "green",
    },
  ]

  // Sample team members
  const teamMembers = [
    { id: "tm1", name: "John Doe", role: "Setter" },
    { id: "tm2", name: "Alice Smith", role: "Closer" },
    { id: "tm3", name: "Robert Johnson", role: "Closer" },
    { id: "tm4", name: "Mike Brown", role: "Setter" },
    { id: "tm5", name: "Sarah Johnson", role: "Setter" },
    { id: "tm6", name: "David Wilson", role: "Closer" },
    { id: "tm7", name: "Emma Davis", role: "Setter" },
    { id: "tm8", name: "Michael Clark", role: "Closer" },
  ]

  // Sample team performance data
  const teamPerformanceData = [
    { id: 1, name: "John Doe", role: "Setter", calls: 24, avgScore: 8.2, meetingsBooked: 15, improvement: 18 },
    { id: 2, name: "Alice Smith", role: "Closer", calls: 18, avgScore: 7.8, dealsWon: 7, improvement: 12 },
    { id: 3, name: "Robert Johnson", role: "Closer", calls: 22, avgScore: 8.5, dealsWon: 9, improvement: 15 },
    { id: 4, name: "Mike Brown", role: "Setter", calls: 28, avgScore: 7.2, meetingsBooked: 16, improvement: 10 },
    { id: 5, name: "Sarah Johnson", role: "Setter", calls: 32, avgScore: 8.8, meetingsBooked: 21, improvement: 20 },
    { id: 6, name: "David Wilson", role: "Closer", calls: 15, avgScore: 9.1, dealsWon: 6, improvement: 22 },
    { id: 7, name: "Emma Davis", role: "Setter", calls: 26, avgScore: 7.5, meetingsBooked: 14, improvement: 8 },
    { id: 8, name: "Michael Clark", role: "Closer", calls: 20, avgScore: 8.0, dealsWon: 8, improvement: 14 },
  ]

  // Filter the call data based on search and filters
  const filteredCalls = callData.filter((call) => {
    const matchesSearch =
      searchQuery === "" ||
      call.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.rep.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || call.type === selectedType
    const matchesRole =
      selectedRole === "all-reps" ||
      (selectedRole === "setters" && call.rep.role === "Setter") ||
      (selectedRole === "closers" && call.rep.role === "Closer")
    const matchesDate =
      selectedDate === "all" ||
      (selectedDate === "today" &&
        call.date === new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })) ||
      (selectedDate === "thisWeek" && new Date(call.date) >= new Date(Date.now() - 7 * 86400000))

    return matchesSearch && matchesType && matchesRole && matchesDate
  })

  return (
    <div className="w-full">
      <div className="space-y-6">
        {/* Page Title */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Call Analysis</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Team performance overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">185</div>
              <div className="text-xs text-muted-foreground flex items-center mt-1">
                <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500 font-medium">15%</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7.8</div>
              <div className="text-xs text-muted-foreground flex items-center mt-1">
                <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500 font-medium">0.5</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Meetings Booked</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">66</div>
              <div className="text-xs text-muted-foreground flex items-center mt-1">
                <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500 font-medium">22%</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Deals Closed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">30</div>
              <div className="text-xs text-muted-foreground flex items-center mt-1">
                <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-green-500 font-medium">18%</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="calls" className="space-y-4">
          <TabsList className="w-full grid grid-cols-1 md:grid-cols-4 gap-2 max-w-2xl bg-white">
            <TabsTrigger value="calls">All Calls</TabsTrigger>
            <TabsTrigger value="team">Team Performance</TabsTrigger>
            <TabsTrigger value="analytics">Call Analytics</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="calls" className="space-y-4">
            {/* Streamlined search and filter area */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search calls..."
                    className="pl-8 pr-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-1.5">
                      <SlidersHorizontal className="h-4 w-4" />
                      <span>Filters</span>
                      {activeFilterCount > 0 && (
                        <Badge variant="secondary" className="ml-1 rounded-full px-1 py-0 h-5 min-w-5">
                          {activeFilterCount}
                        </Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4" align="end">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Filters</h4>
                      <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2 text-xs">
                        <X className="h-3 w-3 mr-1" />
                        Reset
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="type-filter">Call Type</Label>
                        <Select value={selectedType} onValueChange={setSelectedType}>
                          <SelectTrigger id="type-filter">
                            <SelectValue placeholder="All Types" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="Discovery">Discovery</SelectItem>
                            <SelectItem value="Demo">Demo</SelectItem>
                            <SelectItem value="Closing">Closing</SelectItem>
                            <SelectItem value="Negotiation">Negotiation</SelectItem>
                            <SelectItem value="Chat">Chat Screenshots</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="role-filter">Rep Role</Label>
                        <Select value={selectedRole} onValueChange={setSelectedRole}>
                          <SelectTrigger id="role-filter">
                            <SelectValue placeholder="All Roles" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all-reps">All Roles</SelectItem>
                            <SelectItem value="closers">Closers</SelectItem>
                            <SelectItem value="setters">Setters</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="date-filter">Date</Label>
                        <Select value={selectedDate} onValueChange={setSelectedDate}>
                          <SelectTrigger id="date-filter">
                            <SelectValue placeholder="All Dates" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Dates</SelectItem>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="thisWeek">This Week</SelectItem>
                            <SelectItem value="thisMonth">This Month</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Active filters display */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 items-center text-sm">
                <span className="text-muted-foreground">Active filters:</span>
                {selectedType !== "all" && (
                  <Badge variant="secondary" className="flex gap-1 items-center">
                    Type: {selectedType}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedType("all")} />
                  </Badge>
                )}
                {selectedRole !== "all-reps" && (
                  <Badge variant="secondary" className="flex gap-1 items-center">
                    Role: {selectedRole === "setters" ? "Setters" : "Closers"}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedRole("all-reps")} />
                  </Badge>
                )}
                {selectedDate !== "all" && (
                  <Badge variant="secondary" className="flex gap-1 items-center">
                    Date: {selectedDate.charAt(0).toUpperCase() + selectedDate.slice(1)}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedDate("all")} />
                  </Badge>
                )}
              </div>
            )}

            <Card className="border shadow-sm">
              <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
                <CardTitle className="text-base font-medium">
                  Call Recordings {filteredCalls.length > 0 && `(${filteredCalls.length})`}
                </CardTitle>
                <Button variant="outline" size="sm">
                  <FileText className="h-3.5 w-3.5 mr-1.5" />
                  Export List
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="rounded-md overflow-hidden">
                  <Table className="bg-white">
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="w-[25%] font-medium">Details</TableHead>
                        <TableHead className="w-[15%] font-medium">Rep</TableHead>
                        <TableHead className="w-[15%] font-medium">Date</TableHead>
                        <TableHead className="w-[10%] font-medium">Type</TableHead>
                        <TableHead className="w-[10%] font-medium">Score</TableHead>
                        <TableHead className="w-[10%] font-medium">Status</TableHead>
                        <TableHead className="w-[15%] text-right font-medium">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCalls.length > 0 ? (
                        filteredCalls.map((call) => (
                          <TableRow key={call.id} className="hover:bg-muted/50 border-b last:border-b-0">
                            <TableCell className="align-top py-4">
                              <div>
                                <div className="font-medium text-base mb-1">{call.title}</div>
                                <div className="text-sm text-muted-foreground">
                                  <span className="truncate">{call.filename}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="align-top py-4">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-9 w-9 border">
                                  <AvatarImage src="/placeholder.svg?height=36&width=36" />
                                  <AvatarFallback className="bg-primary/10 text-primary">
                                    {call.rep.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{call.rep.name}</div>
                                  <div className="text-xs text-muted-foreground">{call.rep.role}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="align-top py-4">
                              <div className="font-medium">{call.date}</div>
                              <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <Clock className="mr-1 h-3 w-3 flex-shrink-0" />
                                {call.duration}
                              </div>
                            </TableCell>
                            <TableCell className="align-top py-4">
                              <Badge variant="outline" className="font-normal">
                                {call.type}
                              </Badge>
                            </TableCell>
                            <TableCell className="align-top py-4">
                              <div className="flex items-center">
                                <span className="font-medium mr-2">{call.score}</span>
                                <div className="flex">
                                  {Array.from({ length: Math.min(5, Math.floor(call.score / 2)) }).map((_, i) => (
                                    <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                  ))}
                                  {Array.from({ length: 5 - Math.min(5, Math.floor(call.score / 2)) }).map((_, i) => (
                                    <Star key={i} className="h-3.5 w-3.5 text-muted" />
                                  ))}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="align-top py-4">
                              <Badge
                                className={`
                  ${call.statusColor === "green" ? "bg-green-100 text-green-800" : ""}
                  ${call.statusColor === "amber" ? "bg-amber-100 text-amber-800" : ""}
                  ${call.statusColor === "red" ? "bg-red-100 text-red-800" : ""}
                `}
                              >
                                {call.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right align-top py-4">
                              <div className="flex justify-end gap-2">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      {call.type === "Chat" ? (
                                        <>
                                          <MessageSquare className="h-4 w-4 mr-2" />
                                          View Chat
                                        </>
                                      ) : (
                                        <>
                                          <Play className="h-4 w-4 mr-2" />
                                          Play Recording
                                        </>
                                      )}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Share2 className="h-4 w-4 mr-2" />
                                      Share
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Download className="h-4 w-4 mr-2" />
                                      Download
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Flag className="h-4 w-4 mr-2" />
                                      Flag for Review
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>

                                <Button variant="default" size="sm" onClick={() => handleReviewClick(call)}>
                                  Review
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                              <Search className="h-8 w-8 mb-2 opacity-40" />
                              <p>No calls match your filters</p>
                              <Button variant="link" onClick={resetFilters} className="mt-1.5">
                                Reset Filters
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
                <CardDescription>Overall performance metrics for all team members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table className="bg-white">
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead>Team Member</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Calls</TableHead>
                        <TableHead>Avg Score</TableHead>
                        <TableHead>Performance</TableHead>
                        <TableHead>Improvement</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teamPerformanceData.map((member) => (
                        <TableRow key={member.id} className="hover:bg-muted/50 border-b last:border-b-0">
                          <TableCell>
                            <div className="font-medium">{member.name}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{member.role}</Badge>
                          </TableCell>
                          <TableCell>{member.calls}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="font-medium mr-1">{member.avgScore}</span>
                              <div className="flex">
                                {Array.from({ length: Math.floor(member.avgScore) }).map((_, i) => (
                                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {member.role === "Setter" ? (
                              <div>{member.meetingsBooked} meetings</div>
                            ) : (
                              <div>{member.dealsWon} deals</div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={member.improvement * 5} className="h-2 w-24" />
                              <span className="text-sm">{member.improvement}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <Users className="h-5 w-5 mr-2" />
                    Role Breakdown
                  </CardTitle>
                  <CardDescription>Comparative metrics between setters and closers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sm">Setters (4)</h3>
                        <Badge variant="outline" className="bg-primary/10">
                          110 calls
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Avg Call Duration</span>
                            <span className="font-medium">18 min</span>
                          </div>
                          <Progress value={60} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Meetings Booked Rate</span>
                            <span className="font-medium">32%</span>
                          </div>
                          <Progress value={32} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Qualification Accuracy</span>
                            <span className="font-medium">78%</span>
                          </div>
                          <Progress value={78} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Discovery Score</span>
                            <span className="font-medium">7.4/10</span>
                          </div>
                          <Progress value={74} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sm">Closers (4)</h3>
                        <Badge variant="outline" className="bg-primary/10">
                          75 calls
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Avg Call Duration</span>
                            <span className="font-medium">42 min</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Close Rate</span>
                            <span className="font-medium">24%</span>
                          </div>
                          <Progress value={24} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Objection Handling</span>
                            <span className="font-medium">82%</span>
                          </div>
                          <Progress value={82} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Demo Quality</span>
                            <span className="font-medium">8.1/10</span>
                          </div>
                          <Progress value={81} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t">
                    <h3 className="font-medium text-sm mb-3">Month-over-Month Improvement</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/80 rounded-md w-3 h-10"></div>
                        <div>
                          <div className="text-sm font-medium">Setters: +15%</div>
                          <div className="text-xs text-muted-foreground">Primarily in discovery quality</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/50 rounded-md w-3 h-8"></div>
                        <div>
                          <div className="text-sm font-medium">Closers: +12%</div>
                          <div className="text-xs text-muted-foreground">Primarily in objection handling</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <Award className="h-5 w-5 mr-2" />
                    Top Performers
                  </CardTitle>
                  <CardDescription>Highest performing team members this month</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Top Setter</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10">SJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Sarah Johnson</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-1" />
                            <span>8.8 avg rating</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">21 meetings</div>
                        <div className="text-sm text-muted-foreground">32 calls</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-sm flex justify-between mb-1">
                        <span>Conversion Rate</span>
                        <span className="font-medium">65.6%</span>
                      </div>
                      <Progress value={65.6} className="h-2" />
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium mb-3">Top Closer</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10">DW</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">David Wilson</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-1" />
                            <span>9.1 avg rating</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">6 deals</div>
                        <div className="text-sm text-muted-foreground">15 calls</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-sm flex justify-between mb-1">
                        <span>Close Rate</span>
                        <span className="font-medium">40%</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium mb-3">Most Improved</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10">RJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Robert Johnson</div>
                          <div className="text-sm text-muted-foreground">Closer</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium flex items-center">
                          <TrendingUp className="h-3.5 w-3.5 text-green-500 mr-1" />
                          <span>+22% improvement</span>
                        </div>
                        <div className="text-sm text-muted-foreground">9 deals closed</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <BarChart2 className="h-5 w-5 mr-2" />
                    Call Scores By Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Discovery Calls</span>
                        <span className="font-medium">7.2 avg</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Demo Calls</span>
                        <span className="font-medium">8.1 avg</span>
                      </div>
                      <Progress value={81} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Closing Calls</span>

                        <span className="font-medium">7.5 avg</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Negotiation Calls</span>
                        <span className="font-medium">8.3 avg</span>
                      </div>
                      <Progress value={83} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Chat Conversations</span>
                        <span className="font-medium">7.8 avg</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <Calendar className="h-5 w-5 mr-2" />
                    Monthly Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-end justify-between gap-2 pb-4 pt-6">
                    {[65, 70, 68, 75, 83, 87].map((height, i) => (
                      <div key={i} className="bg-primary/90 rounded-md w-full" style={{ height: `${height}%` }}>
                        <span className="sr-only">{height}%</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <div>January</div>
                    <div>February</div>
                    <div>March</div>
                    <div>April</div>
                    <div>May</div>
                    <div>June</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base">
                  <Award className="h-5 w-5 mr-2" />
                  Improvement Metrics
                </CardTitle>
                <CardDescription>Key areas of improvement across the team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Setter Improvement</h3>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Discovery Questions</span>
                        <span className="font-medium">+15%</span>
                      </div>
                      <Progress value={15} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Qualification</span>
                        <span className="font-medium">+18%</span>
                      </div>
                      <Progress value={18} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Value Articulation</span>
                        <span className="font-medium">+12%</span>
                      </div>
                      <Progress value={12} className="h-2" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Closer Improvement</h3>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Objection Handling</span>
                        <span className="font-medium">+22%</span>
                      </div>
                      <Progress value={22} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Negotiation</span>
                        <span className="font-medium">+16%</span>
                      </div>
                      <Progress value={16} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>ROI Discussion</span>
                        <span className="font-medium">+19%</span>
                      </div>
                      <Progress value={19} className="h-2" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Overall Team Growth</h3>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Call Quality</span>
                        <span className="font-medium">+17%</span>
                      </div>
                      <Progress value={17} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Meeting Conversion</span>
                        <span className="font-medium">+25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Deal Close Rate</span>
                        <span className="font-medium">+20%</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4">
            <CallLeaderboard />
          </TabsContent>
        </Tabs>

        {/* Review Dialog - Updated with training assignment section */}
        <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
          <DialogContent className="sm:max-w-[800px] p-0">
            <DialogHeader className="p-6 pb-2">
              <DialogTitle>Review {selectedCall?.title}</DialogTitle>
              <DialogDescription>
                Provide feedback and scoring for {selectedCall?.rep.name}'s {selectedCall?.type?.toLowerCase()}
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="review" className="w-full">
              <div className="px-6">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="review">Review</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="training">Assign Training</TabsTrigger>
                </TabsList>
              </div>

              <div className="px-6 py-4 overflow-y-auto max-h-[60vh]">
                <TabsContent value="review" className="mt-0 space-y-6">
                  {/* Scoring */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Score</label>
                      <div className="font-medium">{score}/10</div>
                    </div>
                    <Slider value={[score]} min={1} max={10} step={1} onValueChange={(value) => setScore(value[0])} />
                  </div>

                  {/* Strengths */}
                  <div>
                    <label className="text-sm font-medium">Strengths</label>
                    <Textarea
                      placeholder="What did the rep do well?"
                      className="mt-2"
                      rows={3}
                      value={strengths}
                      onChange={(e) => setStrengths(e.target.value)}
                    />
                  </div>

                  {/* Areas for Improvement */}
                  <div>
                    <label className="text-sm font-medium">Areas for Improvement</label>
                    <Textarea
                      placeholder="What could be improved?"
                      className="mt-2"
                      rows={3}
                      value={improvements}
                      onChange={(e) => setImprovements(e.target.value)}
                    />
                  </div>

                  {/* Action Items */}
                  <div>
                    <label className="text-sm font-medium">Action Items</label>
                    <Textarea
                      placeholder="List specific actions for improvement"
                      className="mt-2"
                      rows={3}
                      value={actionItems}
                      onChange={(e) => setActionItems(e.target.value)}
                    />
                  </div>

                  {/* Additional Feedback */}
                  <div>
                    <label className="text-sm font-medium">Additional Feedback</label>
                    <Textarea
                      placeholder="Any other feedback or notes..."
                      className="mt-2"
                      rows={3}
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="mt-0">
                  <div className="rounded-md border p-4">
                    <h3 className="text-sm font-medium mb-2">Call Preview</h3>
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                      <div className="text-center">
                        {selectedCall?.type === "Chat" ? (
                          <MessageSquare className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                        ) : (
                          <Play className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                        )}
                        <p className="text-sm text-muted-foreground">
                          {selectedCall?.type === "Chat" ? "Chat conversation preview" : "Audio call recording preview"}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="training" className="mt-0 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Select Training to Assign</h3>
                    <div className="flex flex-col gap-3">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search trainings..."
                          className="pl-8"
                          value={trainingSearchQuery}
                          onChange={(e) => setTrainingSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          {selectedTrainings.length} training items selected
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              Filter <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>All Types</DropdownMenuItem>
                            <DropdownMenuItem>Courses</DropdownMenuItem>
                            <DropdownMenuItem>Workshops</DropdownMenuItem>
                            <DropdownMenuItem>Quick Guides</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto border rounded-md p-2 mt-3">
                      {filteredTrainingData.length > 0 ? (
                        filteredTrainingData.map((training) => (
                          <div
                            key={training.id}
                            className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md"
                          >
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id={`training-${training.id}`}
                                checked={selectedTrainings.includes(training.id)}
                                onCheckedChange={() => toggleTrainingSelection(training.id)}
                              />
                              <div>
                                <label
                                  htmlFor={`training-${training.id}`}
                                  className="text-sm font-medium cursor-pointer"
                                >
                                  {training.title}
                                </label>
                                <p className="text-xs text-muted-foreground">{training.duration}</p>
                              </div>
                            </div>
                            <Badge variant="outline">{training.type}</Badge>
                          </div>
                        ))
                      ) : (
                        <div className="py-4 text-center text-muted-foreground">
                          No trainings found matching "{trainingSearchQuery}"
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-md border p-4 bg-muted/30">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-sm font-medium">Recommended Based on Performance</h3>
                      <Badge variant="outline" className="text-xs">
                        AI Suggested
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-background rounded-md">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="rec-training-1"
                            checked={selectedTrainings.includes("tr3")}
                            onCheckedChange={() => toggleTrainingSelection("tr3")}
                          />
                          <div>
                            <label htmlFor="rec-training-1" className="text-sm font-medium cursor-pointer">
                              Discovery Questioning Framework
                            </label>
                            <p className="text-xs text-muted-foreground">30 min</p>
                          </div>
                        </div>
                        <Badge variant="outline">Course</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-background rounded-md">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="rec-training-2"
                            checked={selectedTrainings.includes("tr6")}
                            onCheckedChange={() => toggleTrainingSelection("tr6")}
                          />
                          <div>
                            <label htmlFor="rec-training-2" className="text-sm font-medium cursor-pointer">
                              ROI Discussion Techniques
                            </label>
                            <p className="text-xs text-muted-foreground">15 min</p>
                          </div>
                        </div>
                        <Badge variant="outline">Quick Guide</Badge>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>

              <div className="flex items-center justify-end gap-2 p-6 border-t">
                <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setReviewDialogOpen(false)}>
                  {selectedTrainings.length > 0 ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Close
                    </>
                  ) : (
                    "Close"
                  )}
                </Button>
              </div>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
