"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Upload, ArrowUp, SlidersHorizontal, X } from "lucide-react"
import { CallLeaderboard } from "@/components/call-leaderboard"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

export default function CloserView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState("all")
  const [selectedDuration, setSelectedDuration] = useState("all")
  const [selectedRating, setSelectedRating] = useState("all")
  const [selectedOutcome, setSelectedOutcome] = useState("all")
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Count active filters
  const activeFilterCount = [
    selectedDate !== "all",
    selectedDuration !== "all",
    selectedRating !== "all",
    selectedOutcome !== "all",
  ].filter(Boolean).length

  // Reset all filters
  const resetFilters = () => {
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
      duration: "32:45",
      rating: 4.7,
      outcome: "Deal Closed",
      dealSize: "$75,000",
      dealStage: "Closed Won",
      insights: 5,
      objections: 3,
      isBookmarked: true,
      hasAIFeedback: true,
      feedbackReceived: true,
      improvement: ["Objection Handling", "Pricing Discussion"],
      type: "call",
    },
    {
      id: 2,
      prospect: "TechGiant Inc",
      date: "2023-05-14",
      time: "2:15 PM",
      duration: "45:20",
      rating: 3.8,
      outcome: "Proposal Sent",
      dealSize: "$120,000",
      dealStage: "Negotiation",
      insights: 4,
      objections: 5,
      isBookmarked: false,
      hasAIFeedback: true,
      feedbackReceived: true,
      improvement: ["Value Articulation", "Competitive Positioning"],
      type: "call",
    },
    {
      id: 3,
      prospect: "Startup Solutions",
      date: "2023-05-12",
      time: "11:00 AM",
      duration: "28:30",
      rating: 4.9,
      outcome: "Deal Closed",
      dealSize: "$45,000",
      dealStage: "Closed Won",
      insights: 6,
      objections: 2,
      isBookmarked: true,
      hasAIFeedback: true,
      feedbackReceived: true,
      improvement: [],
      type: "call",
    },
    {
      id: 4,
      prospect: "Enterprise Systems",
      date: "2023-05-10",
      time: "9:45 AM",
      duration: "50:15",
      rating: 2.5,
      outcome: "Lost Deal",
      dealSize: "$200,000",
      dealStage: "Closed Lost",
      insights: 3,
      objections: 7,
      isBookmarked: false,
      hasAIFeedback: true,
      feedbackReceived: true,
      improvement: ["Executive Handling", "ROI Discussion", "Objection Handling"],
      type: "call",
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
      duration: "38:20",
      rating: 4.8,
      outcome: "Deal Closed",
      dealSize: "$85,000",
      dealStage: "Closed Won",
      insights: 7,
      objections: 2,
      type: "call",
    },
    {
      id: 102,
      rep: "Emma Davis",
      prospect: "Future Innovations",
      date: "2023-05-17",
      time: "2:15 PM",
      duration: "42:45",
      rating: 4.5,
      outcome: "Proposal Sent",
      dealSize: "$135,000",
      dealStage: "Negotiation",
      insights: 5,
      objections: 4,
      type: "call",
    },
    {
      id: 103,
      rep: "Michael Brown",
      prospect: "Tech Solutions Inc",
      date: "2023-05-16",
      time: "10:00 AM",
      duration: "35:15",
      rating: 4.3,
      outcome: "Second Meeting",
      dealSize: "$110,000",
      dealStage: "Demo",
      insights: 4,
      objections: 3,
      type: "call",
    },
  ]

  // Performance metrics
  const performanceData = {
    callsThisMonth: 12,
    averageRating: 4.0,
    dealsWon: 5,
    conversionRate: 42,
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
      (selectedDuration === "short" && Number.parseInt(call.duration.split(":")[0]) < 30) ||
      (selectedDuration === "medium" &&
        Number.parseInt(call.duration.split(":")[0]) >= 30 &&
        Number.parseInt(call.duration.split(":")[0]) < 45) ||
      (selectedDuration === "long" && Number.parseInt(call.duration.split(":")[0]) >= 45)
    const matchesRating =
      selectedRating === "all" ||
      (selectedRating === "high" && call.rating >= 4) ||
      (selectedRating === "medium" && call.rating >= 3 && call.rating < 4) ||
      (selectedRating === "low" && call.rating < 3)
    const matchesOutcome = selectedOutcome === "all" || call.outcome === selectedOutcome

    // Only include calls, not DM conversations
    return (
      matchesSearch &&
      matchesDate &&
      matchesDuration &&
      matchesRating &&
      matchesOutcome &&
      (!call.type || call.type === "call")
    )
  })

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
              <DialogTitle>Upload Call Recording</DialogTitle>
              <DialogDescription>Upload a call recording for analysis and feedback.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="prospect">Prospect/Company Name</Label>
                <Input id="prospect" className="mt-1" />
              </div>

              <div>
                <Label htmlFor="call-file">Call Recording</Label>
                <Input id="call-file" type="file" accept="audio/*" className="mt-1" />
              </div>

              <div>
                <Label htmlFor="outcome">Call Outcome</Label>
                <Select defaultValue="proposal">
                  <SelectTrigger id="outcome" className="mt-1">
                    <SelectValue placeholder="Select outcome" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deal-closed">Deal Closed</SelectItem>
                    <SelectItem value="proposal">Proposal Sent</SelectItem>
                    <SelectItem value="second-meeting">Second Meeting</SelectItem>
                    <SelectItem value="negotiation">In Negotiation</SelectItem>
                    <SelectItem value="lost-deal">Lost Deal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="deal-size">Deal Size</Label>
                <Input id="deal-size" placeholder="e.g. $75,000" className="mt-1" />
              </div>

              <div>
                <Label htmlFor="stage">Deal Stage</Label>
                <Select defaultValue="demo">
                  <SelectTrigger id="stage">
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discovery">Discovery</SelectItem>
                    <SelectItem value="demo">Demo</SelectItem>
                    <SelectItem value="proposal">Proposal</SelectItem>
                    <SelectItem value="negotiation">Negotiation</SelectItem>
                    <SelectItem value="closing">Closing</SelectItem>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Calls This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceData.callsThisMonth}</div>
            <div className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">8%</span>
              <span className="ml-1">from last month</span>
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
              <span className="text-green-500 font-medium">0.2</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Deals Won</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceData.dealsWon}</div>
            <div className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">20%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceData.conversionRate}%</div>
            <div className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">7%</span>
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
                          <SelectItem value="short">Short ({`<`}30 min)</SelectItem>
                          <SelectItem value="medium">Medium (30-45 min)</SelectItem>
                          <SelectItem value="long">Long ({`>`}45 min)</SelectItem>
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
                          <SelectItem value="Deal Closed">Deal Closed</SelectItem>
                          <SelectItem value="Proposal Sent">Proposal Sent</SelectItem>
                          <SelectItem value="Second Meeting">Second Meeting</SelectItem>
                          <SelectItem value="Lost Deal">Lost Deal</SelectItem>
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
                  placeholder="Search team calls..."
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
                  {/* Same filter content as above */}
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamCallData.map((call) => (
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
