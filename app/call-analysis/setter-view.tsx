"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Upload, MessageSquare, Phone, ArrowUp, SlidersHorizontal, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { CallDetailCard } from "./call-detail-card"
import { CallLeaderboard } from "@/components/call-leaderboard"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

export default function SetterView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState("all")
  const [selectedDuration, setSelectedDuration] = useState("all")
  const [selectedRating, setSelectedRating] = useState("all")
  const [selectedOutcome, setSelectedOutcome] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [uploadType, setUploadType] = useState<"call" | "conversation">("call")
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Count active filters
  const activeFilterCount = [
    selectedType !== "all",
    selectedDate !== "all",
    selectedDuration !== "all",
    selectedRating !== "all",
    selectedOutcome !== "all",
  ].filter(Boolean).length

  // Reset all filters
  const resetFilters = () => {
    setSelectedType("all")
    setSelectedDate("all")
    setSelectedDuration("all")
    setSelectedRating("all")
    setSelectedOutcome("all")
  }

  // Sample call data
  const callData = [
    {
      id: 1,
      prospect: "Acme Corp",
      date: "2023-05-15",
      time: "10:30 AM",
      duration: "12:45",
      rating: 4.7,
      outcome: "Meeting Scheduled",
      insights: 5,
      isBookmarked: true,
      hasAIFeedback: true,
      type: "call",
      feedbackReceived: true,
      improvement: ["Objection Handling", "Value Proposition"],
    },
    {
      id: 2,
      prospect: "TechGiant Inc",
      date: "2023-05-14",
      time: "2:15 PM",
      duration: "8:20",
      rating: 3.8,
      outcome: "Follow-up Required",
      insights: 4,
      isBookmarked: false,
      hasAIFeedback: true,
      type: "call",
      feedbackReceived: true,
      improvement: ["Discovery Questions"],
    },
    {
      id: 3,
      prospect: "Startup Solutions",
      date: "2023-05-12",
      time: "11:00 AM",
      duration: "15:30",
      rating: 4.9,
      outcome: "Meeting Scheduled",
      insights: 6,
      isBookmarked: true,
      hasAIFeedback: true,
      type: "call",
      feedbackReceived: true,
      improvement: [],
    },
    {
      id: 4,
      prospect: "Enterprise Systems",
      date: "2023-05-10",
      time: "9:45 AM",
      duration: "7:15",
      rating: 2.5,
      outcome: "Not Interested",
      insights: 3,
      isBookmarked: false,
      hasAIFeedback: true,
      type: "call",
      feedbackReceived: true,
      improvement: ["Value Proposition", "Qualification", "Objection Handling"],
    },
    {
      id: 5,
      prospect: "Global Tech",
      date: "2023-05-17",
      time: "3:20 PM",
      duration: "23 messages",
      rating: 4.2,
      outcome: "Meeting Scheduled",
      insights: 4,
      isBookmarked: false,
      hasAIFeedback: true,
      type: "conversation",
      feedbackReceived: true,
      improvement: ["Discovery Questions"],
    },
    {
      id: 6,
      prospect: "Innovate LLC",
      date: "2023-05-16",
      time: "11:45 AM",
      duration: "18 messages",
      rating: 3.5,
      outcome: "Follow-up Required",
      insights: 3,
      isBookmarked: false,
      hasAIFeedback: true,
      type: "conversation",
      feedbackReceived: true,
      improvement: ["Engagement", "Call to Action"],
    },
    {
      id: 7,
      prospect: "NextGen Solutions",
      date: "2023-05-15",
      time: "2:45 PM",
      duration: "32 messages",
      rating: 4.6,
      outcome: "Meeting Scheduled",
      insights: 5,
      isBookmarked: true,
      hasAIFeedback: true,
      type: "conversation",
      feedbackReceived: true,
      improvement: [],
    },
    {
      id: 8,
      prospect: "Digital Dynamics",
      date: "2023-05-13",
      time: "10:15 AM",
      duration: "15 messages",
      rating: 3.2,
      outcome: "Not Interested",
      insights: 2,
      isBookmarked: false,
      hasAIFeedback: true,
      type: "conversation",
      feedbackReceived: true,
      improvement: ["Personalization", "Value Proposition"],
    },
  ]

  // Team call data
  const teamCallData = [
    {
      id: 101,
      rep: "John Smith",
      prospect: "XYZ Industries",
      date: "2023-05-18",
      time: "9:30 AM",
      duration: "11:20",
      rating: 4.8,
      outcome: "Meeting Scheduled",
      insights: 7,
      type: "call",
    },
    {
      id: 102,
      rep: "Emma Davis",
      prospect: "Future Innovations",
      date: "2023-05-17",
      time: "2:15 PM",
      duration: "9:45",
      rating: 4.5,
      outcome: "Meeting Scheduled",
      insights: 5,
      type: "call",
    },
    {
      id: 103,
      rep: "Michael Brown",
      prospect: "Tech Solutions Inc",
      date: "2023-05-16",
      time: "10:00 AM",
      duration: "27 messages",
      rating: 4.3,
      outcome: "Follow-up Required",
      insights: 4,
      type: "conversation",
    },
    {
      id: 104,
      rep: "Sarah Johnson",
      prospect: "Global Enterprises",
      date: "2023-05-15",
      time: "3:30 PM",
      duration: "18 messages",
      rating: 4.1,
      outcome: "Meeting Scheduled",
      insights: 3,
      type: "conversation",
    },
  ]

  // Performance metrics
  const performanceData = {
    conversationsThisMonth: 26, // Combined calls and DMs
    callsCount: 14,
    dmsCount: 12,
    averageRating: 4.2,
    meetingsBooked: 8,
    improvementRate: 15,
  }

  // Filter call data based on search and filters
  const filteredCalls = callData.filter((call) => {
    const matchesSearch = call.prospect.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDate =
      selectedDate === "all" ||
      (selectedDate === "today" && call.date === new Date().toISOString().split("T")[0]) ||
      (selectedDate === "yesterday" && call.date === new Date(Date.now() - 86400000).toISOString().split("T")[0]) ||
      (selectedDate === "thisWeek" && new Date(call.date) >= new Date(Date.now() - 7 * 86400000))
    const matchesDuration =
      selectedDuration === "all" ||
      (selectedDuration === "short" &&
        (call.type === "call"
          ? Number.parseInt(call.duration.split(":")[0]) < 10
          : Number.parseInt(call.duration) < 20)) ||
      (selectedDuration === "medium" &&
        (call.type === "call"
          ? Number.parseInt(call.duration.split(":")[0]) >= 10 && Number.parseInt(call.duration.split(":")[0]) < 15
          : Number.parseInt(call.duration) >= 20 && Number.parseInt(call.duration) < 30)) ||
      (selectedDuration === "long" &&
        (call.type === "call"
          ? Number.parseInt(call.duration.split(":")[0]) >= 15
          : Number.parseInt(call.duration) >= 30))
    const matchesRating =
      selectedRating === "all" ||
      (selectedRating === "high" && call.rating >= 4) ||
      (selectedRating === "medium" && call.rating >= 3 && call.rating < 4) ||
      (selectedRating === "low" && call.rating < 3)
    const matchesOutcome = selectedOutcome === "all" || call.outcome === selectedOutcome
    const matchesType = selectedType === "all" || call.type === selectedType

    return matchesSearch && matchesDate && matchesDuration && matchesRating && matchesOutcome && matchesType
  })

  // Filter for different tabs
  const calls = callData.filter((call) => call.type === "call")
  const conversations = callData.filter((call) => call.type === "conversation")

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Call Analysis</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 whitespace-nowrap">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Upload Recording or Conversation</DialogTitle>
              <DialogDescription>
                Upload a call recording or DM conversation for analysis and feedback.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Button
                  variant={uploadType === "call" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setUploadType("call")}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Recording
                </Button>
                <Button
                  variant={uploadType === "conversation" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setUploadType("conversation")}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  DM Conversation
                </Button>
              </div>

              <div>
                <Label htmlFor="prospect">Prospect/Company Name</Label>
                <Input id="prospect" className="mt-1" />
              </div>

              {uploadType === "call" ? (
                <div>
                  <Label htmlFor="call-file">Call Recording</Label>
                  <Input id="call-file" type="file" accept="audio/*" className="mt-1" />
                </div>
              ) : (
                <div>
                  <Label htmlFor="conversation-file">Conversation Screenshot/Export</Label>
                  <Input id="conversation-file" type="file" accept="image/*, .pdf, .txt" className="mt-1" />
                </div>
              )}

              <div>
                <Label htmlFor="outcome">Call Outcome</Label>
                <Select defaultValue="follow-up">
                  <SelectTrigger id="outcome" className="mt-1">
                    <SelectValue placeholder="Select outcome" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meeting-scheduled">Meeting Scheduled</SelectItem>
                    <SelectItem value="follow-up">Follow-up Required</SelectItem>
                    <SelectItem value="not-interested">Not Interested</SelectItem>
                    <SelectItem value="wrong-contact">Wrong Contact</SelectItem>
                    <SelectItem value="no-answer">No Answer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Input id="notes" className="mt-1" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Upload for Analysis</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Performance overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversations This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceData.conversationsThisMonth}</div>
            <div className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">15%</span>
              <span className="ml-1">from last month</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <div className="flex items-center">
                <Phone className="h-3 w-3 mr-1" />
                <span>{performanceData.callsCount} calls</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-3 w-3 mr-1" />
                <span>{performanceData.dmsCount} DMs</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceData.averageRating}</div>
            <div className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">0.3</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Meetings Booked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceData.meetingsBooked}</div>
            <div className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">25%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Improvement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceData.improvementRate}%</div>
            <div className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">5%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="my-calls" className="space-y-4">
        <TabsList className="w-full grid grid-cols-1 md:grid-cols-3 gap-2 max-w-xl bg-white">
          <TabsTrigger value="my-calls">My Calls</TabsTrigger>
          <TabsTrigger value="team-calls">Team Calls</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="my-calls" className="space-y-4">
          {/* Streamlined search and filter area */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search conversations..."
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
                      <Label htmlFor="type-filter">Type</Label>
                      <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger id="type-filter">
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="call">Calls</SelectItem>
                          <SelectItem value="conversation">DMs</SelectItem>
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
                          <SelectItem value="yesterday">Yesterday</SelectItem>
                          <SelectItem value="thisWeek">This Week</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration-filter">Duration</Label>
                      <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                        <SelectTrigger id="duration-filter">
                          <SelectValue placeholder="All Durations" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Durations</SelectItem>
                          <SelectItem value="short">Short</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="long">Long</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rating-filter">Rating</Label>
                      <Select value={selectedRating} onValueChange={setSelectedRating}>
                        <SelectTrigger id="rating-filter">
                          <SelectValue placeholder="All Ratings" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Ratings</SelectItem>
                          <SelectItem value="high">High (4+)</SelectItem>
                          <SelectItem value="medium">Medium (3-4)</SelectItem>
                          <SelectItem value="low">Low ({`<`}3)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="outcome-filter">Outcome</Label>
                      <Select value={selectedOutcome} onValueChange={setSelectedOutcome}>
                        <SelectTrigger id="outcome-filter">
                          <SelectValue placeholder="All Outcomes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Outcomes</SelectItem>
                          <SelectItem value="Meeting Scheduled">Meeting Scheduled</SelectItem>
                          <SelectItem value="Follow-up Required">Follow-up Required</SelectItem>
                          <SelectItem value="Not Interested">Not Interested</SelectItem>
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
                  Type: {selectedType === "call" ? "Calls" : "DMs"}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedType("all")} />
                </Badge>
              )}
              {selectedDate !== "all" && (
                <Badge variant="secondary" className="flex gap-1 items-center">
                  Date: {selectedDate.charAt(0).toUpperCase() + selectedDate.slice(1)}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedDate("all")} />
                </Badge>
              )}
              {selectedDuration !== "all" && (
                <Badge variant="secondary" className="flex gap-1 items-center">
                  Duration: {selectedDuration.charAt(0).toUpperCase() + selectedDuration.slice(1)}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedDuration("all")} />
                </Badge>
              )}
              {selectedRating !== "all" && (
                <Badge variant="secondary" className="flex gap-1 items-center">
                  Rating: {selectedRating.charAt(0).toUpperCase() + selectedRating.slice(1)}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedRating("all")} />
                </Badge>
              )}
              {selectedOutcome !== "all" && (
                <Badge variant="secondary" className="flex gap-1 items-center">
                  Outcome: {selectedOutcome}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedOutcome("all")} />
                </Badge>
              )}
            </div>
          )}

          {/* Quick type filters */}
          <div className="flex gap-2">
            <Button
              variant={selectedType === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType("all")}
            >
              All
            </Button>
            <Button
              variant={selectedType === "call" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType("call")}
              className="flex items-center gap-1"
            >
              <Phone className="h-4 w-4" />
              Calls
            </Button>
            <Button
              variant={selectedType === "conversation" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType("conversation")}
              className="flex items-center gap-1"
            >
              <MessageSquare className="h-4 w-4" />
              DMs
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCalls.map((call) => (
              <CallDetailCard key={call.id} call={call} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="team-calls" className="space-y-4">
          {/* Streamlined search and filter area - same as above */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search team conversations..."
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
                      <Label htmlFor="type-filter">Type</Label>
                      <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger id="type-filter">
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="call">Calls</SelectItem>
                          <SelectItem value="conversation">DMs</SelectItem>
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
                          <SelectItem value="yesterday">Yesterday</SelectItem>
                          <SelectItem value="thisWeek">This Week</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration-filter">Duration</Label>
                      <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                        <SelectTrigger id="duration-filter">
                          <SelectValue placeholder="All Durations" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Durations</SelectItem>
                          <SelectItem value="short">Short</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="long">Long</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rating-filter">Rating</Label>
                      <Select value={selectedRating} onValueChange={setSelectedRating}>
                        <SelectTrigger id="rating-filter">
                          <SelectValue placeholder="All Ratings" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Ratings</SelectItem>
                          <SelectItem value="high">High (4+)</SelectItem>
                          <SelectItem value="medium">Medium (3-4)</SelectItem>
                          <SelectItem value="low">Low ({`<`}3)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="outcome-filter">Outcome</Label>
                      <Select value={selectedOutcome} onValueChange={setSelectedOutcome}>
                        <SelectTrigger id="outcome-filter">
                          <SelectValue placeholder="All Outcomes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Outcomes</SelectItem>
                          <SelectItem value="Meeting Scheduled">Meeting Scheduled</SelectItem>
                          <SelectItem value="Follow-up Required">Follow-up Required</SelectItem>
                          <SelectItem value="Not Interested">Not Interested</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Quick type filters */}
          <div className="flex gap-2">
            <Button
              variant={selectedType === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType("all")}
            >
              All
            </Button>
            <Button
              variant={selectedType === "call" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType("call")}
              className="flex items-center gap-1"
            >
              <Phone className="h-4 w-4" />
              Calls
            </Button>
            <Button
              variant={selectedType === "conversation" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType("conversation")}
              className="flex items-center gap-1"
            >
              <MessageSquare className="h-4 w-4" />
              DMs
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamCallData
              .filter((call) => selectedType === "all" || call.type === selectedType)
              .map((call) => (
                <CallDetailCard
                  key={call.id}
                  call={{ ...call, isBookmarked: false, hasAIFeedback: true, feedbackReceived: true, improvement: [] }}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <CallLeaderboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}
