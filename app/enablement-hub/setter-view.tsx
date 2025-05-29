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

export default function SetterView() {
  const [activeTab, setActiveTab] = useState("assigned")
  const router = useRouter()

  const handleContentClick = (contentId: string) => {
    router.push(`/enablement-hub/content/${contentId}`)
  }

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
                <span className="text-sm font-medium">75%</span>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-muted-foreground">6/8 required modules completed</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Certifications</h3>
                <span className="text-sm font-medium">50%</span>
              </div>
              <Progress value={50} className="h-2" />
              <p className="text-xs text-muted-foreground">1/2 certifications completed</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Learning Score</h3>
                <span className="text-sm font-medium">82/100</span>
              </div>
              <Progress value={82} className="h-2" />
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
            {assignedContent.map((content, index) => (
              <ContentCard key={index} content={content} onContentClick={handleContentClick} />
            ))}
          </div>

          <div className="flex justify-between items-center mt-8 mb-4">
            <h3 className="text-lg font-semibold">Due This Week</h3>
            <Button variant="ghost" size="sm">
              View more
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dueThisWeek.map((content, index) => (
              <ContentCard key={index} content={content} onContentClick={handleContentClick} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommended" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedContent.map((content, index) => (
              <ContentCard key={index} content={content} onContentClick={handleContentClick} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedContent.map((content, index) => (
              <ContentCard key={index} content={content} onContentClick={handleContentClick} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookmarked" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedContent.map((content, index) => (
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
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                              <BookOpen className="h-3 w-3 text-blue-600" />
                            </div>
                            <span className="flex-1">Prospecting Masterclass: Finding High-Value Leads</span>
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
                                    <div className="text-xs font-medium truncate">
                                      Cold Outreach Templates That Convert
                                    </div>
                                    <div className="text-xs text-muted-foreground">Workshop • 2 hours</div>
                                  </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2 p-2">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                                    <Calendar className="h-3 w-3 text-orange-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-medium truncate">Discovery Call Workshop</div>
                                    <div className="text-xs text-muted-foreground">Workshop • 3 hours</div>
                                  </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2 p-2">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100">
                                    <Play className="h-3 w-3 text-purple-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-medium truncate">The Sales Development Podcast</div>
                                    <div className="text-xs text-muted-foreground">Podcast • 45 min</div>
                                  </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2 p-2">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                                    <CheckCircle className="h-3 w-3 text-green-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-medium truncate">Setter Certification Program</div>
                                    <div className="text-xs text-muted-foreground">Certification • 8 hours</div>
                                  </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2 p-2">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                                    <Upload className="h-3 w-3 text-gray-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-medium truncate">Email Templates Collection</div>
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
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                            </div>
                            <span className="flex-1">The Art of Qualifying Leads</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md text-sm">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100">
                              <Play className="h-3 w-3 text-purple-600" />
                            </div>
                            <span className="flex-1">The Sales Development Podcast</span>
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
                                    <div className="text-xs font-medium truncate">
                                      Prospecting Masterclass: Finding High-Value Leads
                                    </div>
                                    <div className="text-xs text-muted-foreground">Course • 4 hours</div>
                                  </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2 p-2">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                                    <Calendar className="h-3 w-3 text-orange-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-medium truncate">
                                      Cold Outreach Templates That Convert
                                    </div>
                                    <div className="text-xs text-muted-foreground">Workshop • 2 hours</div>
                                  </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2 p-2">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                                    <CheckCircle className="h-3 w-3 text-green-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-medium truncate">Setter Certification Program</div>
                                    <div className="text-xs text-muted-foreground">Certification • 8 hours</div>
                                  </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2 p-2">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                                    <Upload className="h-3 w-3 text-gray-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-medium truncate">Email Templates Collection</div>
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
                          <h4 className="font-medium">Prospecting Best Practices</h4>
                          <p className="text-sm text-muted-foreground">Created on May 10, 2023</p>
                        </div>
                      </div>
                      <Badge>Shared</Badge>
                    </div>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Eye className="h-4 w-4" />
                        <span>24 views</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <ThumbsUp className="h-4 w-4" />
                        <span>8 likes</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-green-500" />
                        <div>
                          <h4 className="font-medium">Discovery Call Template</h4>
                          <p className="text-sm text-muted-foreground">Created on April 28, 2023</p>
                        </div>
                      </div>
                      <Badge>Shared</Badge>
                    </div>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Eye className="h-4 w-4" />
                        <span>36 views</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <ThumbsUp className="h-4 w-4" />
                        <span>15 likes</span>
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
    name: "Sarah Williams",
    initials: "SW",
    completedCourses: 26,
    certifications: 3,
    score: 96,
  },
  {
    name: "Alex Johnson",
    initials: "AJ",
    completedCourses: 24,
    certifications: 2,
    score: 93,
  },
  {
    name: "Maria Garcia",
    initials: "MG",
    completedCourses: 22,
    certifications: 2,
    score: 91,
  },
  {
    name: "James Wilson",
    initials: "JW",
    completedCourses: 20,
    certifications: 2,
    score: 88,
  },
  {
    name: "Emily Chen",
    initials: "EC",
    completedCourses: 18,
    certifications: 1,
    score: 85,
  },
]

const assignedContent = [
  {
    id: "1",
    title: "Prospecting Masterclass: Finding High-Value Leads",
    description: "Learn advanced techniques for identifying and connecting with high-value prospects",
    image: "/business-meeting-laptop.png",
    type: "Course",
    author: {
      name: "Marcus Williams",
      avatar: "/placeholder-icon.png",
    },
    duration: "4 hours",
    lessons: 8,
    progress: 25,
    dueDate: "May 25",
  },
  {
    id: "2",
    title: "Cold Outreach Templates That Convert",
    description: "Proven templates and frameworks for effective cold outreach",
    image: "/person-typing-email.png",
    type: "Workshop",
    author: {
      name: "Jennifer Adams",
      avatar: "/placeholder-icon.png",
    },
    duration: "2 hours",
    lessons: 5,
    progress: 0,
    dueDate: "May 30",
  },
  {
    id: "3",
    title: "Setter Certification Program",
    description: "Complete your certification as a qualified setter",
    image: "/professional-certification-badge.png",
    type: "Certification",
    author: {
      name: "David Brown",
      avatar: "/placeholder-icon.png",
    },
    duration: "8 hours",
    lessons: 12,
    progress: 60,
    dueDate: "Jun 5",
  },
]

const dueThisWeek = [
  {
    id: "4",
    title: "The Art of Qualifying Leads",
    description: "Learn how to qualify leads effectively to maximize conversion rates",
    image: "/sales-qualification-framework.png",
    type: "Course",
    author: {
      name: "Robert Chen",
      avatar: "/placeholder-icon.png",
    },
    duration: "3 hours",
    lessons: 6,
    progress: 15,
    dueDate: "May 24",
  },
  {
    id: "5",
    title: "Objection Handling Fundamentals",
    description: "Learn how to handle common objections in the sales process",
    image: "/objection-handling-masterclass.png",
    type: "Course",
    author: {
      name: "Lauren Ober",
      avatar: "/placeholder-icon.png",
    },
    duration: "2 hours",
    lessons: 6,
    progress: 25,
    dueDate: "May 26",
  },
  {
    id: "6",
    title: "The Sales Development Podcast",
    description: "Weekly insights on prospecting, qualifying, and setting appointments",
    image: "/placeholder-l39eg.png",
    type: "Podcast",
    author: {
      name: "Michael Smith",
      avatar: "/placeholder-icon.png",
    },
    duration: "45 min",
    lessons: 1,
    progress: 0,
    dueDate: "May 27",
  },
]

const recommendedContent = [
  {
    id: "7",
    title: "Social Selling on LinkedIn",
    description: "Leverage LinkedIn to find and connect with high-value prospects",
    image: "/placeholder-olzys.png",
    type: "Course",
    author: {
      name: "Sarah Miller",
      avatar: "/placeholder-icon.png",
    },
    duration: "3 hours",
    lessons: 7,
    progress: 0,
  },
  {
    id: "8",
    title: "The Perfect Discovery Call",
    description: "Master the art of discovery calls to uncover customer needs",
    image: "/business-video-call.png",
    type: "Workshop",
    author: {
      name: "Jennifer Lee",
      avatar: "/placeholder-icon.png",
    },
    duration: "2 hours",
    lessons: 5,
    progress: 0,
  },
  {
    id: "9",
    title: "Email Outreach Optimization",
    description: "Improve your email open and response rates with these proven techniques",
    image: "/email-marketing-dashboard.png",
    type: "Course",
    author: {
      name: "David Wilson",
      avatar: "/placeholder-icon.png",
    },
    duration: "3 hours",
    lessons: 8,
    progress: 0,
  },
]

const completedContent = [
  {
    id: "10",
    title: "Setter Fundamentals",
    description: "Learn the basics of being an effective setter",
    image: "/business-meeting-handshake.png",
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
    id: "11",
    title: "Email Templates Workshop",
    description: "Proven email templates that get responses from prospects",
    image: "/placeholder-igcfq.png",
    type: "Workshop",
    author: {
      name: "Robert Chen",
      avatar: "/placeholder-icon.png",
    },
    duration: "1 hour",
    lessons: 5,
    completed: true,
    progress: 100,
  },
  {
    id: "12",
    title: "Prospecting Tools Masterclass",
    description: "Learn how to use the latest tools to find and connect with prospects",
    image: "/sales-tools-dashboard.png",
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

const bookmarkedContent = [
  {
    id: "13",
    title: "Advanced Prospecting Techniques",
    description: "Find more high-quality leads with these advanced prospecting methods",
    image: "/sales-prospecting-dashboard.png",
    type: "Course",
    author: {
      name: "Michael Thompson",
      avatar: "/placeholder-icon.png",
    },
    duration: "4 hours",
    lessons: 10,
    progress: 0,
  },
  {
    id: "14",
    title: "The Psychology of Prospecting",
    description: "Understand the psychological principles that drive effective prospecting",
    image: "/psychology-of-sales.png",
    type: "Workshop",
    author: {
      name: "Dr. Emily Chen",
      avatar: "/placeholder-icon.png",
    },
    duration: "3 hours",
    lessons: 6,
    progress: 0,
  },
  {
    id: "15",
    title: "The Complete Guide to Sales Automation",
    description: "Automate repetitive tasks and focus on what matters most - selling",
    image: "/placeholder.svg?height=400&width=600&query=sales automation workflow",
    type: "Pathway",
    author: {
      name: "James Wilson",
      avatar: "/placeholder-icon.png",
    },
    duration: "6 hours",
    lessons: 15,
    progress: 0,
  },
]
