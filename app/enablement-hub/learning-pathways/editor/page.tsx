"use client"
import { ArrowLeft, FileText, GripVertical, Headphones, ListChecks, Plus, Save, Trash, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function PathwayEditor() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Create Learning Pathway</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-6">
          <div className="md:col-span-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pathway Details</CardTitle>
                <CardDescription>Basic information about the learning pathway</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter pathway title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter pathway description" rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="onboarding">Onboarding</SelectItem>
                        <SelectItem value="sales-skills">Sales Skills</SelectItem>
                        <SelectItem value="product-knowledge">Product Knowledge</SelectItem>
                        <SelectItem value="leadership">Leadership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="target-role">Target Role</Label>
                    <Select>
                      <SelectTrigger id="target-role">
                        <SelectValue placeholder="Select target role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="setter">Setter</SelectItem>
                        <SelectItem value="closer">Closer</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="all">All Roles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Estimated Duration</Label>
                    <div className="flex items-center gap-2">
                      <Input id="duration" type="number" placeholder="Duration" />
                      <Select defaultValue="weeks">
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="days">Days</SelectItem>
                          <SelectItem value="weeks">Weeks</SelectItem>
                          <SelectItem value="months">Months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select>
                      <SelectTrigger id="difficulty">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Modules</CardTitle>
                  <CardDescription>Organize the content of your learning pathway</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Module
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="module-1" className="border rounded-md px-4">
                    <div className="flex items-center">
                      <GripVertical className="h-5 w-5 text-muted-foreground mr-2" />
                      <AccordionTrigger className="flex-1 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Module 1: Introduction</span>
                          <Badge variant="outline" className="ml-2">
                            4 items
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    <AccordionContent className="pt-2 pb-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="module-title-1">Module Title</Label>
                          <Input id="module-title-1" defaultValue="Introduction" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="module-description-1">Module Description</Label>
                          <Textarea id="module-description-1" placeholder="Enter module description" rows={2} />
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">Content Items</h4>
                            <Button variant="outline" size="sm">
                              <Plus className="mr-2 h-3 w-3" /> Add Item
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 rounded-md border p-3">
                              <GripVertical className="h-5 w-5 text-muted-foreground" />
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                <Video className="h-4 w-4 text-primary" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">Welcome Video</p>
                                <p className="text-xs text-muted-foreground">5 min video</p>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-2 rounded-md border p-3">
                              <GripVertical className="h-5 w-5 text-muted-foreground" />
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                <FileText className="h-4 w-4 text-primary" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">Program Overview</p>
                                <p className="text-xs text-muted-foreground">PDF document</p>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-2 rounded-md border p-3">
                              <GripVertical className="h-5 w-5 text-muted-foreground" />
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                <ListChecks className="h-4 w-4 text-primary" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">Knowledge Check</p>
                                <p className="text-xs text-muted-foreground">5 questions</p>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="module-2" className="border rounded-md px-4 mt-4">
                    <div className="flex items-center">
                      <GripVertical className="h-5 w-5 text-muted-foreground mr-2" />
                      <AccordionTrigger className="flex-1 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Module 2: Core Concepts</span>
                          <Badge variant="outline" className="ml-2">
                            3 items
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    <AccordionContent className="pt-2 pb-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="module-title-2">Module Title</Label>
                          <Input id="module-title-2" defaultValue="Core Concepts" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="module-description-2">Module Description</Label>
                          <Textarea id="module-description-2" placeholder="Enter module description" rows={2} />
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">Content Items</h4>
                            <Button variant="outline" size="sm">
                              <Plus className="mr-2 h-3 w-3" /> Add Item
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 rounded-md border p-3">
                              <GripVertical className="h-5 w-5 text-muted-foreground" />
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                <Video className="h-4 w-4 text-primary" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">Core Concepts Lecture</p>
                                <p className="text-xs text-muted-foreground">15 min video</p>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-2 rounded-md border p-3">
                              <GripVertical className="h-5 w-5 text-muted-foreground" />
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                <Headphones className="h-4 w-4 text-primary" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">Expert Interview</p>
                                <p className="text-xs text-muted-foreground">Audio recording</p>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Configure pathway settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sequential">Sequential Progression</Label>
                    <p className="text-xs text-muted-foreground">Require modules to be completed in order</p>
                  </div>
                  <Switch id="sequential" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="completion">Completion Requirements</Label>
                    <p className="text-xs text-muted-foreground">Require all items to be completed</p>
                  </div>
                  <Switch id="completion" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="certificate">Issue Certificate</Label>
                    <p className="text-xs text-muted-foreground">Issue certificate upon completion</p>
                  </div>
                  <Switch id="certificate" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="deadline">Set Deadline</Label>
                    <p className="text-xs text-muted-foreground">Require completion by a specific date</p>
                  </div>
                  <Switch id="deadline" />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select defaultValue="draft">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button className="w-full">
                  <Save className="mr-2 h-4 w-4" /> Save Pathway
                </Button>
                <Button variant="outline" className="w-full">
                  Preview
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assignment</CardTitle>
                <CardDescription>Assign this pathway to team members</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Assign To</Label>
                  <Select disabled>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team members" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Team Members</SelectItem>
                      <SelectItem value="setters">All Setters</SelectItem>
                      <SelectItem value="closers">All Closers</SelectItem>
                      <SelectItem value="managers">All Managers</SelectItem>
                      <SelectItem value="custom">Custom Selection</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Save the pathway first to enable assignments</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
