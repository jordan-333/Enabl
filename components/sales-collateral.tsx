"use client"

import { useState } from "react"
import { Download, Eye, FileText, Filter, Link2, MoreHorizontal, Search, Share2, UploadCloud, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function SalesCollateral() {
  const [searchQuery, setSearchQuery] = useState("")

  // Sample data for sales collateral
  const collateralItems = [
    {
      id: "1",
      name: "Product Overview Deck",
      type: "Presentation",
      icon: <FileText className="h-4 w-4 text-blue-500" />,
      created: "May 12, 2023",
      size: "4.2 MB",
      usage: 85,
      status: "Approved",
    },
    {
      id: "2",
      name: "ROI Calculator",
      type: "Spreadsheet",
      icon: <FileText className="h-4 w-4 text-green-500" />,
      created: "Apr 28, 2023",
      size: "1.8 MB",
      usage: 60,
      status: "Approved",
    },
    {
      id: "3",
      name: "Competitor Comparison Guide",
      type: "Document",
      icon: <FileText className="h-4 w-4 text-red-500" />,
      created: "May 5, 2023",
      size: "2.4 MB",
      usage: 90,
      status: "Approved",
    },
    {
      id: "4",
      name: "Case Study: Enterprise Client",
      type: "PDF",
      icon: <FileText className="h-4 w-4 text-purple-500" />,
      created: "May 18, 2023",
      size: "3.7 MB",
      usage: 55,
      status: "Approved",
    },
    {
      id: "5",
      name: "Product Demo Video",
      type: "Video",
      icon: <FileText className="h-4 w-4 text-amber-500" />,
      created: "May 3, 2023",
      size: "28.5 MB",
      usage: 75,
      status: "Approved",
    },
  ]

  // Filter items based on search query
  const filteredItems = collateralItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sales Collateral</CardTitle>
            <CardDescription>Access and share sales content assets</CardDescription>
          </div>
          <Button>
            <UploadCloud className="mr-2 h-4 w-4" />
            Upload New Asset
          </Button>
        </div>
        <div className="mt-4 flex items-center gap-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content assets..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 h-7 w-7"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-3.5 w-3.5" />
            Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="w-full max-w-md">
            <TabsTrigger value="all">All Assets</TabsTrigger>
            <TabsTrigger value="presentations">Presentations</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          {filteredItems.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.type}</Badge>
                    </TableCell>
                    <TableCell>{item.created}</TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{item.usage > 75 ? "High" : item.usage > 40 ? "Medium" : "Low"}</span>
                        <Progress value={item.usage} className="h-2 w-12" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">{item.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link2 className="mr-2 h-4 w-4" />
                            Copy Link
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium">No assets found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {searchQuery ? "Try a different search term" : "Upload your first asset to get started"}
              </p>
              {searchQuery && (
                <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="overflow-hidden">
            <div className="aspect-video bg-muted relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <FileText className="h-10 w-10 text-blue-500" />
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium">Product Overview Deck</h3>
              <p className="text-xs text-muted-foreground mt-1">Presentation • 4.2 MB</p>
              <div className="mt-3 flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  Approved
                </Badge>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Eye className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Share2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-video bg-muted relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <FileText className="h-10 w-10 text-red-500" />
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium">Competitor Comparison Guide</h3>
              <p className="text-xs text-muted-foreground mt-1">Document • 2.4 MB</p>
              <div className="mt-3 flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  Approved
                </Badge>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Eye className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Share2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-video bg-muted relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <FileText className="h-10 w-10 text-amber-500" />
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium">Product Demo Video</h3>
              <p className="text-xs text-muted-foreground mt-1">Video • 28.5 MB</p>
              <div className="mt-3 flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  Approved
                </Badge>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Eye className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Share2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredItems.length} of {collateralItems.length} assets
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Previous</Button>
          <Button variant="outline">Next</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
