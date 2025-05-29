"use client"

import { useState, useEffect } from "react"
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
  PlusCircle,
  Upload,
  Link2,
  Eye,
  MoreHorizontal,
  Layers,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from "next/navigation"

export default function ManagerView({ initialTab }: { initialTab?: string | null }) {
  const [activeTab, setActiveTab] = useState("team-progress")
  const [materialSearch, setMaterialSearch] = useState("")
  const [teamMemberSearch, setTeamMemberSearch] = useState("")
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])

  const router = useRouter()

  const handleContentClick = (contentId: string) => {
    router.push(`/enablement-hub/content/${contentId}?tab=${activeTab}`)
  }

  // Toggle selection of materials
  const toggleMaterialSelection = (id: string) => {
    setSelectedMaterials((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  // Toggle selection of team members
  const toggleMemberSelection = (id: string) => {
    setSelectedMembers((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  // Update activeTab when initialTab changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab)
    }
  }, [initialTab])

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
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Training
          </Button>
        </div>
      </div>

      {/* Team Training Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Team Training Overview</CardTitle>
          <CardDescription>Monitor your team's training progress and completion rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Required Training Completion</h3>
                <span className="text-sm font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2" />
              <p className="text-xs text-muted-foreground">15/18 team members completed all required training</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Certification Progress</h3>
                <span className="text-sm font-medium">65%</span>
              </div>
              <Progress value={65} className="h-2" />
              <p className="text-xs text-muted-foreground">12/18 team members have active certifications</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Enablement Score</h3>
                <span className="text-sm font-medium">82/100</span>
              </div>
              <Progress value={82} className="h-2" />
              <p className="text-xs text-muted-foreground">Team average score across all training modules</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-4xl grid-cols-5">
          <TabsTrigger value="team-progress">Team Progress</TabsTrigger>
          <TabsTrigger value="content-library">Content Library</TabsTrigger>
          <TabsTrigger value="assign-training">Assign Training</TabsTrigger>
          <TabsTrigger value="create-content">Create Content</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="team-progress" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Team Training Progress</CardTitle>
                <CardDescription>Monitor individual training completion status</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Input placeholder="Search team members..." className="w-64" />
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team Member</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Assigned</TableHead>
                    <TableHead>Completed</TableHead>
                    <TableHead>Completion %</TableHead>
                    <TableHead>Enablement Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <span>John Doe</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Closer</Badge>
                    </TableCell>
                    <TableCell>12</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>83%</span>
                        <Progress value={83} className="h-2 w-12" />
                      </div>
                    </TableCell>
                    <TableCell>88/100</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">On Track</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Assign Training</DropdownMenuItem>
                          <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>AS</AvatarFallback>
                        </Avatar>
                        <span>Alice Smith</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Setter</Badge>
                    </TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>9</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>90%</span>
                        <Progress value={90} className="h-2 w-12" />
                      </div>
                    </TableCell>
                    <TableCell>92/100</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">Exceeding</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Assign Training</DropdownMenuItem>
                          <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>RJ</AvatarFallback>
                        </Avatar>
                        <span>Robert Johnson</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Closer</Badge>
                    </TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>53%</span>
                        <Progress value={53} className="h-2 w-12" />
                      </div>
                    </TableCell>
                    <TableCell>62/100</TableCell>
                    <TableCell>
                      <Badge className="bg-amber-100 text-amber-800">At Risk</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Assign Training</DropdownMenuItem>
                          <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>MB</AvatarFallback>
                        </Avatar>
                        <span>Michael Brown</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Setter</Badge>
                    </TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>30%</span>
                        <Progress value={30} className="h-2 w-12" />
                      </div>
                    </TableCell>
                    <TableCell>45/100</TableCell>
                    <TableCell>
                      <Badge className="bg-red-100 text-red-800">Behind</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Assign Training</DropdownMenuItem>
                          <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Showing 4 of 18 team members</div>
              <div className="flex gap-2">
                <Button variant="outline">Previous</Button>
                <Button variant="outline">Next</Button>
              </div>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Role Breakdown</CardTitle>
                <CardDescription>Training completion by role</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium">Closers</h4>
                      <span className="text-sm">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="mt-1 text-xs text-muted-foreground">8/10 closers on track</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium">Setters</h4>
                      <span className="text-sm">82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                    <p className="mt-1 text-xs text-muted-foreground">7/8 setters on track</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium">New Hires ({"<"}90 days)</h4>
                      <span className="text-sm">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                    <p className="mt-1 text-xs text-muted-foreground">3/5 new hires on track</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Highest enablement scores this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPerformers.slice(0, 5).map((performer, index) => (
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
          </div>
        </TabsContent>

        <TabsContent value="content-library" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Content Library</h3>
            <div className="flex gap-2">
              <Input placeholder="Search content..." className="w-64" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Filter className="h-3.5 w-3.5" />
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
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Content
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="w-full bg-white">
              <div className="grid w-full grid-cols-5 gap-4">
                <TabsTrigger value="all" className="w-full">
                  All Content
                </TabsTrigger>
                <TabsTrigger value="courses" className="w-full">
                  Courses
                </TabsTrigger>
                <TabsTrigger value="pathways" className="w-full">
                  Pathways
                </TabsTrigger>
                <TabsTrigger value="assets" className="w-full">
                  Assets
                </TabsTrigger>
                <TabsTrigger value="popular" className="w-full">
                  Popular
                </TabsTrigger>
              </div>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contentLibrary.map((content, index) => (
              <ContentCard key={index} content={content} isManager={true} onContentClick={handleContentClick} />
            ))}
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">Showing 6 of 48 items</div>
            <div className="flex gap-2">
              <Button variant="outline">Previous</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="assign-training" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assign Training</CardTitle>
              <CardDescription>Assign training modules and learning pathways to your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Training Material Selection with Search */}
                  <div>
                    <h3 className="mb-3 text-lg font-medium">Select Training Material</h3>
                    <div className="mb-3 relative">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search training materials..."
                          className="pl-9"
                          value={materialSearch}
                          onChange={(e) => setMaterialSearch(e.target.value)}
                        />
                        {materialSearch && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1 h-7 w-7"
                            onClick={() => setMaterialSearch("")}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Selected Materials */}
                    {selectedMaterials.length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium mb-2">Selected ({selectedMaterials.length})</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedMaterials.map((id) => {
                            const material = trainingMaterials.find((m) => m.id === id)
                            return material ? (
                              <Badge key={id} variant="secondary" className="flex items-center gap-1">
                                {material.title}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-4 w-4 ml-1 p-0"
                                  onClick={() => toggleMaterialSelection(id)}
                                >
                                  <Eye className="h-3 w-3" />
                                </Button>
                              </Badge>
                            ) : null
                          })}
                        </div>
                      </div>
                    )}

                    <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                      {trainingMaterials
                        .filter(
                          (material) =>
                            material.title.toLowerCase().includes(materialSearch.toLowerCase()) ||
                            material.description.toLowerCase().includes(materialSearch.toLowerCase()),
                        )
                        .map((material) => (
                          <div
                            key={material.id}
                            className={`rounded-md border p-3 cursor-pointer transition-colors ${
                              selectedMaterials.includes(material.id)
                                ? "border-primary bg-primary/5"
                                : "hover:border-primary"
                            }`}
                            onClick={() => toggleMaterialSelection(material.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {material.icon}
                                <h4 className="font-medium">{material.title}</h4>
                              </div>
                              <Badge>{material.badge}</Badge>
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">{material.description}</p>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Team Member Selection with Search */}
                  <div>
                    <h3 className="mb-3 text-lg font-medium">Select Team Members</h3>
                    <div className="mb-3 relative">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search team members..."
                          className="pl-9"
                          value={teamMemberSearch}
                          onChange={(e) => setTeamMemberSearch(e.target.value)}
                        />
                        {teamMemberSearch && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1 h-7 w-7"
                            onClick={() => setTeamMemberSearch("")}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Selected Members */}
                    {selectedMembers.length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium mb-2">Selected ({selectedMembers.length})</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedMembers.map((id) => {
                            const member = teamMembers.find((m) => m.id === id)
                            return member ? (
                              <Badge key={id} variant="secondary" className="flex items-center gap-1">
                                {member.name}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-4 w-4 ml-1 p-0"
                                  onClick={() => toggleMemberSelection(id)}
                                >
                                  <Eye className="h-3 w-3" />
                                </Button>
                              </Badge>
                            ) : null
                          })}
                        </div>
                      </div>
                    )}

                    <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                      {teamMembers
                        .filter(
                          (member) =>
                            member.name.toLowerCase().includes(teamMemberSearch.toLowerCase()) ||
                            member.role.toLowerCase().includes(teamMemberSearch.toLowerCase()),
                        )
                        .map((member) => (
                          <div
                            key={member.id}
                            className={`rounded-md border p-3 cursor-pointer transition-colors ${
                              selectedMembers.includes(member.id)
                                ? "border-primary bg-primary/5"
                                : "hover:border-primary"
                            }`}
                            onClick={() => toggleMemberSelection(member.id)}
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={member.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{member.initials}</AvatarFallback>
                              </Avatar>
                              <h4 className="font-medium">{member.name}</h4>
                              <Badge variant="outline" className="ml-auto">
                                {member.role}
                              </Badge>
                            </div>
                          </div>
                        ))}

                      {/* Group options */}
                      <div className="pt-2 mt-2 border-t">
                        <h4 className="text-sm font-medium mb-2">Groups</h4>
                        <div className="space-y-3">
                          <div className="rounded-md border p-3 cursor-pointer hover:border-primary">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">All Closers</h4>
                              <Badge variant="outline" className="ml-auto">
                                Group
                              </Badge>
                            </div>
                          </div>
                          <div className="rounded-md border p-3 cursor-pointer hover:border-primary">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">All Setters</h4>
                              <Badge variant="outline" className="ml-auto">
                                Group
                              </Badge>
                            </div>
                          </div>
                          <div className="rounded-md border p-3 cursor-pointer hover:border-primary">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">Entire Team</h4>
                              <Badge variant="outline" className="ml-auto">
                                Group
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-medium">Assignment Settings</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-md border p-3">
                      <h4 className="font-medium">Due Date</h4>
                      <p className="mt-1 text-xs text-muted-foreground">Set a deadline for completion</p>
                      <Input type="date" className="mt-2" />
                    </div>
                    <div className="rounded-md border p-3">
                      <h4 className="font-medium">Priority</h4>
                      <p className="mt-1 text-xs text-muted-foreground">Set assignment priority level</p>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="outline">
                          Low
                        </Button>
                        <Button size="sm" variant="outline">
                          Medium
                        </Button>
                        <Button size="sm" variant="outline">
                          High
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="ml-auto flex gap-2">
                <Button variant="outline">Cancel</Button>
                <Button className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Assign Training
                  {selectedMaterials.length > 0 &&
                    selectedMembers.length > 0 &&
                    ` (${selectedMaterials.length} to ${selectedMembers.length})`}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="create-content" className="space-y-6">
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
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content Type</label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                    <option value="">Select content type</option>
                    <option value="course">Course</option>
                    <option value="workshop">Workshop</option>
                    <option value="pathway">Pathway</option>
                    <option value="podcast">Podcast</option>
                    <option value="certification">Certification</option>
                    <option value="asset">Asset</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Visibility</label>
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <input type="radio" id="public" name="visibility" className="mr-2" />
                      <label htmlFor="public" className="text-sm">
                        Public (All Team)
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="restricted" name="visibility" className="mr-2" />
                      <label htmlFor="restricted" className="text-sm">
                        Restricted (Select Roles)
                      </label>
                    </div>
                  </div>
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
                  <label className="text-sm font-medium">Target Audience</label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                    <option value="">Select target audience</option>
                    <option value="all">All Team Members</option>
                    <option value="closers">Closers</option>
                    <option value="setters">Setters</option>
                    <option value="new">New Hires</option>
                  </select>
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
                                {contentLibrary.map((content) => (
                                  <DropdownMenuItem key={content.id} className="flex items-center gap-2 p-2">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                                      {content.type === "Course" && <BookOpen className="h-3 w-3 text-primary" />}
                                      {content.type === "Workshop" && <Calendar className="h-3 w-3 text-primary" />}
                                      {content.type === "Podcast" && <Play className="h-3 w-3 text-primary" />}
                                      {content.type === "Pathway" && <Layers className="h-3 w-3 text-primary" />}
                                      {content.type === "Certification" && (
                                        <CheckCircle className="h-3 w-3 text-primary" />
                                      )}
                                      {content.type === "Asset" && <Upload className="h-3 w-3 text-primary" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="text-xs font-medium truncate">{content.title}</div>
                                      <div className="text-xs text-muted-foreground">
                                        {content.type} • {content.duration}
                                      </div>
                                    </div>
                                  </DropdownMenuItem>
                                ))}
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
                            <span className="flex-1">Qualification Framework</span>
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
                                {contentLibrary.map((content) => (
                                  <DropdownMenuItem key={content.id} className="flex items-center gap-2 p-2">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                                      {content.type === "Course" && <BookOpen className="h-3 w-3 text-primary" />}
                                      {content.type === "Workshop" && <Calendar className="h-3 w-3 text-primary" />}
                                      {content.type === "Podcast" && <Play className="h-3 w-3 text-primary" />}
                                      {content.type === "Pathway" && <Layers className="h-3 w-3 text-primary" />}
                                      {content.type === "Certification" && (
                                        <CheckCircle className="h-3 w-3 text-primary" />
                                      )}
                                      {content.type === "Asset" && <Upload className="h-3 w-3 text-primary" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="text-xs font-medium truncate">{content.title}</div>
                                      <div className="text-xs text-muted-foreground">
                                        {content.type} • {content.duration}
                                      </div>
                                    </div>
                                  </DropdownMenuItem>
                                ))}
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
                <div className="space-y-2">
                  <label className="text-sm font-medium">Certification</label>
                  <div className="flex items-center">
                    <input type="checkbox" id="certification" className="mr-2" />
                    <label htmlFor="certification" className="text-sm">
                      Enable certification upon completion
                    </label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Create Learning Pathway</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Completion Rate</CardTitle>
                <CardDescription>Overall training completion rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-40">
                  <div className="text-5xl font-bold">78%</div>
                  <p className="text-sm text-muted-foreground mt-2">15/18 team members</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Score</CardTitle>
                <CardDescription>Team average assessment score</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-40">
                  <div className="text-5xl font-bold">82</div>
                  <p className="text-sm text-muted-foreground mt-2">Out of 100 points</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Engagement</CardTitle>
                <CardDescription>Weekly active learners</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-40">
                  <div className="text-5xl font-bold">16</div>
                  <p className="text-sm text-muted-foreground mt-2">89% of team</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Content Engagement</CardTitle>
              <CardDescription>Most viewed and completed content</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Content</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Completions</TableHead>
                    <TableHead>Completion Rate</TableHead>
                    <TableHead>Avg. Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Objection Handling Masterclass</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Course</Badge>
                    </TableCell>
                    <TableCell>42</TableCell>
                    <TableCell>18</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>78%</span>
                        <Progress value={78} className="h-2 w-12" />
                      </div>
                    </TableCell>
                    <TableCell>4.8/5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">New Rep Onboarding</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Pathway</Badge>
                    </TableCell>
                    <TableCell>36</TableCell>
                    <TableCell>12</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>85%</span>
                        <Progress value={85} className="h-2 w-12" />
                      </div>
                    </TableCell>
                    <TableCell>4.6/5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Product Knowledge Mastery</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Course</Badge>
                    </TableCell>
                    <TableCell>28</TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>65%</span>
                        <Progress value={65} className="h-2 w-12" />
                      </div>
                    </TableCell>
                    <TableCell>4.2/5</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Progress Over Time</CardTitle>
              <CardDescription>Monthly training completion trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Progress chart visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ContentCard({
  content,
  isManager = false,
  onContentClick,
}: {
  content: any
  isManager?: boolean
  onContentClick?: (id: string) => void
}) {
  return (
    <Card
      className="overflow-hidden transition-all hover:shadow-md cursor-pointer"
      onClick={() => onContentClick && onContentClick(content.id)}
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
          {isManager ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-white/80 backdrop-blur-sm rounded-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Edit Content</DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Assign to Team</DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>View Analytics</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={(e) => e.stopPropagation()}>
                  Archive
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
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
            </>
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
            <AvatarImage src={content.author?.avatar || "/placeholder.svg"} />
            <AvatarFallback>{content.author?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          {content.author?.name}
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
          {isManager && content.completions && (
            <div className="flex items-center ml-3">
              <CheckCircle className="mr-1 h-3 w-3" />
              {content.completions} completions
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

function getBadgeColor(type: string) {
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
    case "Asset":
      return "#6b7280" // gray
    default:
      return "#6b7280" // gray
  }
}

// Training materials data
const trainingMaterials = [
  {
    id: "1",
    title: "Objection Handling Masterclass",
    description: "Learn advanced techniques for handling objections",
    badge: "Advanced",
    icon: <CheckCircle className="h-4 w-4 text-green-500" />,
  },
  {
    id: "2",
    title: "Qualification Framework",
    description: "Master the BANT qualification framework",
    badge: "Essential",
    icon: <CheckCircle className="h-4 w-4 text-green-500" />,
  },
  {
    id: "3",
    title: "Deal Closing Techniques",
    description: "Learn effective techniques for closing deals",
    badge: "Advanced",
    icon: <CheckCircle className="h-4 w-4 text-green-500" />,
  },
  {
    id: "4",
    title: "New Rep Onboarding",
    description: "Complete onboarding pathway for new sales reps",
    badge: "Pathway",
    icon: <Layers className="h-4 w-4 text-primary" />,
  },
  {
    id: "5",
    title: "Cold Calling Strategies",
    description: "Master the art of effective cold calling",
    badge: "Intermediate",
    icon: <CheckCircle className="h-4 w-4 text-green-500" />,
  },
  {
    id: "6",
    title: "Discovery Call Framework",
    description: "Structure your discovery calls for maximum impact",
    badge: "Essential",
    icon: <CheckCircle className="h-4 w-4 text-green-500" />,
  },
]

// Team members data
const teamMembers = [
  {
    id: "1",
    name: "Robert Johnson",
    role: "Closer",
    avatar: "/placeholder.svg?height=24&width=24",
    initials: "RJ",
  },
  {
    id: "2",
    name: "Michael Brown",
    role: "Setter",
    avatar: "/placeholder.svg?height=24&width=24",
    initials: "MB",
  },
  {
    id: "3",
    name: "Sarah Williams",
    role: "Closer",
    avatar: "/placeholder.svg?height=24&width=24",
    initials: "SW",
  },
  {
    id: "4",
    name: "Jessica Davis",
    role: "Setter",
    avatar: "/placeholder.svg?height=24&width=24",
    initials: "JD",
  },
  {
    id: "5",
    name: "David Miller",
    role: "Closer",
    avatar: "/placeholder.svg?height=24&width=24",
    initials: "DM",
  },
]

// Content library data
const contentLibrary = [
  {
    id: "1",
    title: "Objection Handling Masterclass",
    description: "Learn advanced techniques for handling objections",
    image: "/objection-handling-masterclass.png",
    type: "Course",
    author: {
      name: "Marcus Williams",
      avatar: "/placeholder-icon.png",
    },
    duration: "4 hours",
    lessons: 8,
    completions: 18,
  },
  {
    id: "2",
    title: "New Rep Onboarding",
    description: "Complete onboarding pathway for new sales reps",
    image: "/business-onboarding.png",
    type: "Pathway",
    author: {
      name: "Jennifer Adams",
      avatar: "/placeholder-icon.png",
    },
    duration: "10 hours",
    lessons: 15,
    completions: 12,
  },
  {
    id: "3",
    title: "Qualification Framework",
    description: "Master the BANT qualification framework",
    image: "/sales-qualification-framework.png",
    type: "Course",
    author: {
      name: "Robert Chen",
      avatar: "/placeholder-icon.png",
    },
    duration: "3 hours",
    lessons: 6,
    completions: 15,
  },
  {
    id: "4",
    title: "Deal Closing Techniques",
    description: "Learn effective techniques for closing deals",
    image: "/advanced-closing-techniques.png",
    type: "Course",
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder-icon.png",
    },
    duration: "5 hours",
    lessons: 10,
    completions: 14,
  },
  {
    id: "5",
    title: "Product Knowledge Mastery",
    description: "Deep dive into product features and benefits",
    image: "/product-showcase.png",
    type: "Course",
    author: {
      name: "Michael Thompson",
      avatar: "/placeholder-icon.png",
    },
    duration: "6 hours",
    lessons: 12,
    completions: 15,
  },
  {
    id: "6",
    title: "The Sales Development Podcast",
    description: "Weekly insights on prospecting, qualifying, and setting appointments",
    image: "/placeholder-l39eg.png",
    type: "Podcast",
    author: {
      name: "David Wilson",
      avatar: "/placeholder-icon.png",
    },
    duration: "45 min per episode",
    lessons: 24,
    completions: 8,
  },
]

// Top performers data
const topPerformers = [
  {
    name: "Alice Smith",
    initials: "AS",
    completedCourses: 26,
    certifications: 3,
    score: 96,
  },
  {
    name: "John Doe",
    initials: "JD",
    completedCourses: 24,
    certifications: 2,
    score: 93,
  },
  {
    name: "Sarah Williams",
    initials: "SW",
    completedCourses: 22,
    certifications: 2,
    score: 91,
  },
  {
    name: "Robert Johnson",
    initials: "RJ",
    completedCourses: 20,
    certifications: 2,
    score: 88,
  },
  {
    name: "Jessica Davis",
    initials: "JD",
    completedCourses: 18,
    certifications: 1,
    score: 85,
  },
]
