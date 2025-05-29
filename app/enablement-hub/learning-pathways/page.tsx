import {
  BookOpen,
  ChevronLeft,
  Clock,
  Edit,
  LayoutGrid,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Tag,
  Trash,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function LearningPathways() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="sm" asChild className="flex items-center gap-1">
            <a href="/enablement-hub">
              <ChevronLeft className="h-4 w-4" />
              <span>Back to Enablement Hub</span>
            </a>
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Learning Pathways</h1>
            <p className="text-muted-foreground">Create and manage structured learning paths for your team</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create New Pathway
          </Button>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="md:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    <h3 className="font-medium">Categories</h3>
                  </div>
                  <div className="mt-2 grid gap-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="onboarding" className="h-4 w-4" />
                      <label htmlFor="onboarding" className="text-sm">
                        Onboarding
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="sales-skills" className="h-4 w-4" />
                      <label htmlFor="sales-skills" className="text-sm">
                        Sales Skills
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="product-knowledge" className="h-4 w-4" />
                      <label htmlFor="product-knowledge" className="text-sm">
                        Product Knowledge
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="leadership" className="h-4 w-4" />
                      <label htmlFor="leadership" className="text-sm">
                        Leadership
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <h3 className="font-medium">Target Role</h3>
                  </div>
                  <div className="mt-2 grid gap-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="setter" className="h-4 w-4" />
                      <label htmlFor="setter" className="text-sm">
                        Setter
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="closer" className="h-4 w-4" />
                      <label htmlFor="closer" className="text-sm">
                        Closer
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="manager" className="h-4 w-4" />
                      <label htmlFor="manager" className="text-sm">
                        Manager
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="all-roles" className="h-4 w-4" />
                      <label htmlFor="all-roles" className="text-sm">
                        All Roles
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <h3 className="font-medium">Duration</h3>
                  </div>
                  <div className="mt-2 grid gap-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="short" className="h-4 w-4" />
                      <label htmlFor="short" className="text-sm">
                        Short (&lt; 1 week)
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="medium" className="h-4 w-4" />
                      <label htmlFor="medium" className="text-sm">
                        Medium (1-4 weeks)
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="long" className="h-4 w-4" />
                      <label htmlFor="long" className="text-sm">
                        Long (&gt; 4 weeks)
                      </label>
                    </div>
                  </div>
                </div>
                <Button>Apply Filters</Button>
              </CardContent>
            </Card>
          </div>
          <div className="flex-1">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Learning Pathways</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="flex w-full max-w-sm items-center space-x-2">
                      <Input type="text" placeholder="Search pathways..." className="flex-1" />
                      <Button type="submit" size="icon" variant="ghost">
                        <Search className="h-4 w-4" />
                        <span className="sr-only">Search</span>
                      </Button>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <LayoutGrid className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All Pathways</TabsTrigger>
                    <TabsTrigger value="published">Published</TabsTrigger>
                    <TabsTrigger value="drafts">Drafts</TabsTrigger>
                    <TabsTrigger value="archived">Archived</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="mt-4 space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">New Hire Onboarding</h3>
                              <Badge variant="outline">Published</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Complete onboarding program for new sales representatives
                            </p>
                            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                              <span>8 modules</span>
                              <span>•</span>
                              <span>4 weeks</span>
                              <span>•</span>
                              <span>Created by John Smith</span>
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                              <Badge variant="secondary">Onboarding</Badge>
                              <Badge variant="secondary">All Roles</Badge>
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              Assign
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="mr-2 h-4 w-4" />
                              Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash className="mr-2 h-4 w-4" />
                              Archive
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm">
                          <span>Assigned to 12 team members</span>
                          <span>Last updated: May 10, 2025</span>
                        </div>
                        <div className="mt-2 flex -space-x-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Avatar key={i} className="h-6 w-6 border-2 border-background">
                              <AvatarImage
                                src={`/placeholder-p44c7.png?key=88was&height=24&width=24&text=${i + 1}`}
                                alt="User"
                              />
                              <AvatarFallback>U{i + 1}</AvatarFallback>
                            </Avatar>
                          ))}
                          <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                            +7
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">Advanced Objection Handling</h3>
                              <Badge variant="outline">Published</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Master the art of handling complex objections in sales calls
                            </p>
                            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                              <span>5 modules</span>
                              <span>•</span>
                              <span>2 weeks</span>
                              <span>•</span>
                              <span>Created by Sarah Johnson</span>
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                              <Badge variant="secondary">Sales Skills</Badge>
                              <Badge variant="secondary">Closer</Badge>
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              Assign
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="mr-2 h-4 w-4" />
                              Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash className="mr-2 h-4 w-4" />
                              Archive
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm">
                          <span>Assigned to 8 team members</span>
                          <span>Last updated: May 5, 2025</span>
                        </div>
                        <div className="mt-2 flex -space-x-2">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <Avatar key={i} className="h-6 w-6 border-2 border-background">
                              <AvatarImage
                                src={`/placeholder-dto17.png?key=qncjb&height=24&width=24&text=${i + 1}`}
                                alt="User"
                              />
                              <AvatarFallback>U{i + 1}</AvatarFallback>
                            </Avatar>
                          ))}
                          <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                            +4
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">Product Knowledge Mastery</h3>
                              <Badge variant="secondary">Draft</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Comprehensive product knowledge training for the sales team
                            </p>
                            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                              <span>6 modules (in progress)</span>
                              <span>•</span>
                              <span>3 weeks</span>
                              <span>•</span>
                              <span>Created by Mike Brown</span>
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                              <Badge variant="secondary">Product Knowledge</Badge>
                              <Badge variant="secondary">All Roles</Badge>
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              Assign
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="mr-2 h-4 w-4" />
                              Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash className="mr-2 h-4 w-4" />
                              Archive
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm">
                          <span>Not yet assigned</span>
                          <span>Last updated: May 15, 2025</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="published" className="mt-4">
                    {/* Published pathways content */}
                  </TabsContent>
                  <TabsContent value="drafts" className="mt-4">
                    {/* Draft pathways content */}
                  </TabsContent>
                  <TabsContent value="archived" className="mt-4">
                    {/* Archived pathways content */}
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Previous</Button>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    1
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    2
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    3
                  </Button>
                </div>
                <Button variant="outline">Next</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
