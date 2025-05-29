"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Bookmark,
  ThumbsUp,
  Play,
  Clock,
  BookOpen,
  Filter,
  Search,
  CheckCircle,
  Calendar,
  Trophy,
  PlusCircle,
  FileText,
  Upload,
  Link2,
  Eye,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

export default function CloserView() {
  const [activeTab, setActiveTab] = useState("assigned")
  const router = useRouter()

  const handleContentClick = (contentId: string) => {
    router.push(`/enablement-hub/content/${contentId}`)
  }

  const bookmarkedContentCloser = [
    {
      id: "28",
      title: "Bookmarked Content 1",
      description: "Description of bookmarked content 1",
      image: "/placeholder.svg?height=400&width=600&query=bookmarked content 1",
      type: "Course",
      author: {
        name: "Author 1",
        avatar: "/placeholder-icon.png",
      },
      duration: "3 hours",
      lessons: 6,
      progress: 0,
      dueDate: "Jun 20",
    },
    {
      id: "29",
      title: "Bookmarked Content 2",
      description: "Description of bookmarked content 2",
      image: "/placeholder.svg?height=400&width=600&query=bookmarked content 2",
      type: "Workshop",
      author: {
        name: "Author 2",
        avatar: "/placeholder-icon.png",
      },
      duration: "2 hours",
      lessons: 4,
      progress: 0,
      dueDate: "Jun 22",
    },
    {
      id: "30",
      title: "Bookmarked Content 3",
      description: "Description of bookmarked content 3",
      image: "/placeholder.svg?height=400&width=600&query=bookmarked content 3",
      type: "Certification",
      author: {
        name: "Author 3",
        avatar: "/placeholder-icon.png",
      },
      duration: "5 hours",
      lessons: 10,
      progress: 0,
      dueDate: "Jun 25",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Enablement Hub</h2>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search content..." className="pl-8" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All content</DropdownMenuItem>
              <DropdownMenuItem>Courses</DropdownMenuItem>
              <DropdownMenuItem>Workshops</DropdownMenuItem>
              <DropdownMenuItem>Pathways</DropdownMenuItem>
              <DropdownMenuItem>Podcasts</DropdownMenuItem>
              <DropdownMenuItem>Certifications</DropdownMenuItem>
              <DropdownMenuItem>Assets</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline">View all</Button>
        </div>
      </div>

      {/* Progress Overview Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Your Learning Progress</CardTitle>
          <CardDescription>Track your enablement journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Required Training</h3>
                <span className="text-sm font-medium">85%</span>
              </div>
              <Progress value={85} className="h-2" />
              <p className="text-xs text-muted-foreground">17/20 required modules completed</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Certifications</h3>
                <span className="text-sm font-medium">66%</span>
              </div>
              <Progress value={66} className="h-2" />
              <p className="text-xs text-muted-foreground">2/3 certifications completed</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Learning Score</h3>
                <span className="text-sm font-medium">88/100</span>
              </div>
              <Progress value={88} className="h-2" />
              <p className="text-xs text-muted-foreground">Your average score across all assessments</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Performers Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center">
            <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
            <CardTitle>Top Performers This Month</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topPerformers.map((performer, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-2 rounded-md ${
                  index === 0 ? "bg-yellow-50" : index === 1 ? "bg-gray-50" : index === 2 ? "bg-amber-50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex items-center justify-center w-6 h-6 rounded-full font-medium text-sm ${
                      index === 0
                        ? "bg-yellow-500 text-white"
                        : index === 1
                          ? "bg-gray-400 text-white"
                          : index === 2
                            ? "bg-amber-600 text-white"
                            : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`/placeholder-icon.png`} />
                    <AvatarFallback>{performer.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{performer.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {performer.completedCourses} courses • {performer.certifications} certifications
                    </div>
                  </div>
                </div>
                <div className="font-bold text-sm">{performer.score}/100</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="assigned" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 gap-2">
          <TabsTrigger value="assigned">Assigned</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
          <TabsTrigger value="create">Create</TabsTrigger>
        </TabsList>

        {activeTab === "assigned" && (
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Assigned to you</h3>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Sort by: Recent
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Recent</DropdownMenuItem>
                  <DropdownMenuItem>Due Date</DropdownMenuItem>
                  <DropdownMenuItem>Priority</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="sm">
                View more
              </Button>
            </div>
          </div>
        )}

        <TabsContent value="assigned" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignedContentCloser.map((content, index) => (
              <ContentCard key={index} content={content} onContentClick={handleContentClick} />
            ))}
          </div>

          <div className="flex justify-between items-center mt-8 mb-4">
            <h3 className="text-lg font-semibold">Advanced Closing Techniques</h3>
            <Button variant="ghost" size="sm">
              View more
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {closingTechniques.map((content, index) => (
              <ContentCard key={index} content={content} onContentClick={handleContentClick} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommended" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedContentCloser.map((content, index) => (
              <ContentCard key={index} content={content} onContentClick={handleContentClick} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedContentCloser.map((content, index) => (
              <ContentCard key={index} content={content} onContentClick={handleContentClick} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookmarked" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedContentCloser.map((content, index) => (
              <ContentCard key={index} content={content} onContentClick={handleContentClick} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Content Asset</CardTitle>
                <CardDescription>Upload and share content with your team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-md border p-4 text-center cursor-pointer hover:border-primary">
                    <div className="flex flex-col items-center">
                      <Upload className="h-8 w-8 text-primary" />
                      <h4 className="mt-2 font-medium">Upload File</h4>
                      <p className="mt-1 text-xs text-muted-foreground">PDF, PPTX, DOCX, etc.</p>
                    </div>
                  </div>
                  <div className="rounded-md border p-4 text-center cursor-pointer hover:border-primary">
                    <div className="flex flex-col items-center">
                      <Link2 className="h-8 w-8 text-primary" />
                      <h4 className="mt-2 font-medium">Add Link</h4>
                      <p className="mt-1 text-xs text-muted-foreground">Website, video, etc.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input placeholder="Enter content title" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    placeholder="Enter content description"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags</label>
                  <Input placeholder="Add tags separated by commas" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Create Content Asset</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Create Learning Pathway</CardTitle>
                <CardDescription>Build a structured learning journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pathway Title</label>
                  <Input placeholder="Enter pathway title" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    placeholder="Enter pathway description"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Modules</label>
                  <div className="space-y-3">
                    {/* Module 1 */}
                    <div className="rounded-md border p-3">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          1
                        </span>
                        <Input placeholder="Module title" className="flex-1" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">Content Items</label>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md text-sm">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                              <Calendar className="h-3 w-3 text-orange-600" />
                            </div>
                            <span className="flex-1">Objection Handling Masterclass</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="w-full">
                              <PlusCircle className="mr-2 h-3 w-3" />
                              Add Content
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-80">
                            <div className="p-2">
                              <div className="relative mb-2">
                                <Search className="absolute left-2 top-2 h-3 w-3 text-muted-foreground" />
                                <Input placeholder="Search content..." className="pl-7 h-8 text-xs" />
                              </div>
                              <div className="max-h-48 overflow-y-auto space-y-1">
                                <DropdownMenuItem className="flex items-center gap-2 p-2">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                                    <BookOpen className="h-3 w-3 text-blue-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-medium truncate">Advanced Negotiation Tactics</div>
                                    <div className="text-xs text-muted-foreground">Course • 6 hours</div>
                                  </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2 p-2">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                                    <Calendar className="h-3 w-3 text-orange-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-medium truncate">Demo Excellence Workshop</div>
                                    <div className="text-xs text-muted-foreground">Workshop • 3 hours</div>
                                  </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2 p-2">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100">
                                    <Play className="h-3 w-3 text-purple-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-medium truncate">Closing Techniques Podcast</div>
                                    <div className="text-xs text-muted-foreground">Podcast • 45 min</div>
                                  </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2 p-2">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                                    <CheckCircle className="h-3 w-3 text-green-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-medium truncate">Closer Certification Program</div>
                                    <div className="text-xs text-muted-foreground">Certification • 10 hours</div>
                                  </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2 p-2">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                                    <Upload className="h-3 w-3 text-gray-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-medium truncate">Proposal Templates Collection</div>
                                    <div className="text-xs text-muted-foreground">Asset • Reference</div>
                                  </div>
                                </DropdownMenuItem>
                              </div>
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Module 2 */}
                    <div className="rounded-md border p-3">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          2
                        </span>
                        <Input placeholder="Module title" className="flex-1" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">Content Items</label>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md text-sm">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                              <BookOpen className="h-3 w-3 text-blue-600" />
                            </div>
                            <span className="flex-1">Advanced Deal Structuring</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md text-sm">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                            </div>
                            <span className="flex-1">Enterprise Sales Certification</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="w-full">
                              <PlusCircle className="mr-2 h-3 w-3" />
                              Add Content
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-80">
                            <div className="p-2">
                              <div className="relative mb-2">
                                <Search className="absolute left-2 top-2 h-3 w-3 text-muted-foreground" />
                                <Input placeholder="Search content..." className="pl-7 h-8 text-xs" />
                              </div>
                              <div className="max-h-48 overflow-y-auto space-y-1">
                                <DropdownMenuItem className="flex items-center gap-2 p-2">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                                    <BookOpen className="h-3 w-3 text-blue-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-medium truncate">Advanced Negotiation Tactics</div>
                                    <div className="text-xs text-muted-foreground">Course • 6 hours</div>
                                  </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2 p-2">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                                    <Calendar className="h-3 w-3 text-orange-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-medium truncate">Demo Excellence Workshop</div>
                                    <div className="text-xs text-muted-foreground">Workshop • 3 hours</div>
                                  </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2 p-2">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100">
                                    <Play className="h-3 w-3 text-purple-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-medium truncate">Closing Techniques Podcast</div>
                                    <div className="text-xs text-muted-foreground">Podcast • 45 min</div>
                                  </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2 p-2">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                                    <Upload className="h-3 w-3 text-gray-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-medium truncate">Proposal Templates Collection</div>
                                    <div className="text-xs text-muted-foreground">Asset • Reference</div>
                                  </div>
                                </DropdownMenuItem>
                              </div>
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Module
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Create Learning Pathway</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Created Content</CardTitle>
                <CardDescription>Manage content you've created</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <div>
                          <h4 className="font-medium">Deal Closing Strategies</h4>
                          <p className="text-sm text-muted-foreground">Created on May 12, 2023</p>
                        </div>
                      </div>
                      <Badge>Shared</Badge>
                    </div>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Eye className="h-4 w-4" />
                        <span>32 views</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <ThumbsUp className="h-4 w-4" />
                        <span>14 likes</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-green-500" />
                        <div>
                          <h4 className="font-medium">Negotiation Tactics</h4>
                          <p className="text-sm text-muted-foreground">Created on May 2, 2023</p>
                        </div>
                      </div>
                      <Badge>Shared</Badge>
                    </div>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Eye className="h-4 w-4" />
                        <span>45 views</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <ThumbsUp className="h-4 w-4" />
                        <span>22 likes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ContentCard({ content, onContentClick }) {
  return (
    <Card
      className="overflow-hidden transition-all hover:shadow-md cursor-pointer"
      onClick={() => onContentClick(content.id)}
    >
      <div className="relative">
        <img src={content.image || "/placeholder.svg"} alt={content.title} className="w-full h-48 object-cover" />
        <Badge
          className="absolute bottom-2 left-2"
          variant="secondary"
          style={{ backgroundColor: getBadgeColor(content.type) }}
        >
          {content.type}
        </Badge>
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-white/80 backdrop-blur-sm rounded-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Bookmark className="h-4 w-4" />
          </Button>
          {content.likes && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-white/80 backdrop-blur-sm rounded-full"
              onClick={(e) => e.stopPropagation()}
            >
              <ThumbsUp className="h-4 w-4" />
            </Button>
          )}
        </div>
        {content.dueDate && (
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-amber-100 text-amber-800 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Due {content.dueDate}
            </Badge>
          </div>
        )}
        {content.progress !== undefined && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
            <div className="h-full bg-green-500" style={{ width: `${content.progress}%` }}></div>
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-2">{content.title}</CardTitle>
        <CardDescription className="flex items-center gap-2 text-xs">
          <Avatar className="h-5 w-5">
            <AvatarImage src={content.author.avatar || "/placeholder.svg"} alt={content.author.name} />
            <AvatarFallback>{content.author.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          {content.author.name}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2">{content.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <div className="flex items-center text-xs text-muted-foreground">
          {content.duration && (
            <div className="flex items-center mr-3">
              <Clock className="mr-1 h-3 w-3" />
              {content.duration}
            </div>
          )}
          {content.lessons && (
            <div className="flex items-center">
              <BookOpen className="mr-1 h-3 w-3" />
              {content.lessons} lessons
            </div>
          )}
          {content.completed && (
            <div className="flex items-center ml-3 text-green-600">
              <CheckCircle className="mr-1 h-3 w-3" />
              Completed
            </div>
          )}
        </div>
        <Button variant="ghost" size="sm" className="p-0 h-8 w-8" onClick={(e) => e.stopPropagation()}>
          <Play className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

function getBadgeColor(type) {
  switch (type) {
    case "Pathway":
      return "#f472b6" // pink
    case "Workshop":
      return "#fb923c" // orange
    case "Course":
      return "#3b82f6" // blue
    case "Podcast":
      return "#a855f7" // purple
    case "Certification":
      return "#10b981" // green
    default:
      return "#6b7280" // gray
  }
}

// Top performers data
const topPerformers = [
  {
    name: "Jennifer Blake",
    initials: "JB",
    completedCourses: 24,
    certifications: 3,
    score: 98,
  },
  {
    name: "Michael Chen",
    initials: "MC",
    completedCourses: 22,
    certifications: 2,
    score: 95,
  },
  {
    name: "Sophia Rodriguez",
    initials: "SR",
    completedCourses: 20,
    certifications: 3,
    score: 92,
  },
  {
    name: "David Thompson",
    initials: "DT",
    completedCourses: 18,
    certifications: 2,
    score: 89,
  },
  {
    name: "Alicia Washington",
    initials: "AW",
    completedCourses: 17,
    certifications: 1,
    score: 86,
  },
]

// Content data for closer view
const assignedContentCloser = [
  {
    id: "16",
    title: "Advanced Negotiation Tactics",
    description: "Master the art of negotiation to close more deals",
    image: "/placeholder.svg?height=400&width=600&query=business negotiation meeting",
    type: "Course",
    author: {
      name: "David Miller",
      avatar: "/placeholder-icon.png",
    },
    duration: "6 hours",
    lessons: 12,
    progress: 35,
    dueDate: "May 25",
  },
  {
    id: "17",
    title: "Objection Handling Masterclass",
    description: "Turn objections into opportunities with these proven techniques",
    image: "/objection-handling-masterclass.png",
    type: "Workshop",
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder-icon.png",
    },
    duration: "4 hours",
    lessons: 8,
    progress: 20,
    dueDate: "May 30",
  },
  {
    id: "18",
    title: "Closer Certification Program",
    description: "Complete your certification as a qualified closer",
    image: "/professional-certification-badge.png",
    type: "Certification",
    author: {
      name: "Thomas Weber",
      avatar: "/placeholder-icon.png",
    },
    duration: "10 hours",
    lessons: 15,
    progress: 45,
    dueDate: "Jun 5",
  },
]

const closingTechniques = [
  {
    id: "19",
    title: "The Assumptive Close",
    description: "Master the technique of assuming the sale is already made",
    image: "/advanced-closing-techniques.png",
    type: "Course",
    author: {
      name: "Jennifer Adams",
      avatar: "/placeholder-icon.png",
    },
    duration: "2 hours",
    lessons: 5,
    progress: 0,
    dueDate: "Jun 10",
  },
  {
    id: "20",
    title: "The Urgency Close",
    description: "Learn how to create legitimate urgency to drive decisions",
    image: "/placeholder.svg?height=400&width=600&query=business deadline clock",
    type: "Course",
    author: {
      name: "Robert Chen",
      avatar: "/placeholder-icon.png",
    },
    duration: "1.5 hours",
    lessons: 4,
    progress: 0,
    dueDate: "Jun 12",
  },
  {
    id: "21",
    title: "The Summary Close",
    description: "Perfect the art of summarizing benefits to drive agreement",
    image: "/placeholder.svg?height=400&width=600&query=business presentation summary",
    type: "Course",
    author: {
      name: "Michael Smith",
      avatar: "/placeholder-icon.png",
    },
    duration: "2 hours",
    lessons: 6,
    progress: 0,
    dueDate: "Jun 15",
  },
]

const recommendedContentCloser = [
  {
    id: "22",
    title: "Enterprise Deal Management",
    description: "Navigate complex enterprise deals from qualification to close",
    image: "/placeholder.svg?height=400&width=600&query=enterprise business meeting",
    type: "Pathway",
    author: {
      name: "Sarah Miller",
      avatar: "/placeholder-icon.png",
    },
    duration: "8 hours",
    lessons: 16,
    progress: 0,
  },
  {
    id: "23",
    title: "Pricing Strategies That Win",
    description: "Learn how to position your pricing to maximize deal value",
    image: "/placeholder.svg?height=400&width=600&query=pricing strategy chart",
    type: "Workshop",
    author: {
      name: "Jennifer Lee",
      avatar: "/placeholder-icon.png",
    },
    duration: "3 hours",
    lessons: 7,
    progress: 0,
  },
  {
    id: "24",
    title: "Competitive Positioning",
    description: "Position your solution effectively against competitors",
    image: "/placeholder.svg?height=400&width=600&query=competitive analysis chart",
    type: "Course",
    author: {
      name: "David Wilson",
      avatar: "/placeholder-icon.png",
    },
    duration: "4 hours",
    lessons: 9,
    progress: 0,
  },
]

const completedContentCloser = [
  {
    id: "25",
    title: "Closer Fundamentals",
    description: "Master the basics of being an effective closer",
    image: "/placeholder.svg?height=400&width=600&query=business contract signing",
    type: "Course",
    author: {
      name: "Jennifer Adams",
      avatar: "/placeholder-icon.png",
    },
    duration: "5 hours",
    lessons: 10,
    completed: true,
    progress: 100,
  },
  {
    id: "26",
    title: "Demo Excellence",
    description: "Deliver compelling product demonstrations that convert",
    image: "/placeholder.svg?height=400&width=600&query=product demonstration meeting",
    type: "Workshop",
    author: {
      name: "Robert Chen",
      avatar: "/placeholder-icon.png",
    },
    duration: "3 hours",
    lessons: 6,
    completed: true,
    progress: 100,
  },
  {
    id: "27",
    title: "Proposal Writing Masterclass",
    description: "Create winning proposals that address client needs",
    image: "/placeholder.svg?height=400&width=600&query=business proposal document",
    type: "Course",
    author: {
      name: "Michael Thompson",
      avatar: "/placeholder-icon.png",
    },
    duration: "4 hours",
    lessons: 8,
    completed: true,
    progress: 100,
  },
]
