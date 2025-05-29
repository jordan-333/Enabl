"use client"

import { Play, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RecordingCardProps {
  title: string
  date: string
  duration: string
  thumbnail?: string
  description: string
  tags: string[]
  onWatch: () => void
}

export function RecordingCard({ title, date, duration, thumbnail, description, tags, onWatch }: RecordingCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-video bg-muted">
        {thumbnail ? (
          <img src={thumbnail || "/placeholder.svg"} alt={title} className="object-cover w-full h-full" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Video className="h-10 w-10 text-muted-foreground" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
          <Button size="icon" variant="secondary" className="rounded-full h-12 w-12">
            <Play className="h-6 w-6" />
          </Button>
        </div>
        <div className="absolute bottom-2 right-2 rounded-md bg-background/80 px-2 py-1 text-xs font-medium">
          {duration}
        </div>
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{date}</p>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full" size="sm" onClick={onWatch}>
          <Play className="mr-2 h-4 w-4" />
          Watch Recording
        </Button>
      </CardFooter>
    </Card>
  )
}
