"use client"

import { Clock, Users, Calendar, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface SessionCardProps {
  title: string
  date: string
  description?: string
  duration: string
  participants: string
  badgeText: string
  badgeVariant?: "default" | "secondary" | "outline" | "destructive"
  status?: "upcoming" | "registered" | "completed" | "recommended"
  rating?: number
  completion?: number
  actionLabel?: string
  secondaryActionLabel?: string
  onAction?: () => void
  onSecondaryAction?: () => void
}

export function SessionCard({
  title,
  date,
  description,
  duration,
  participants,
  badgeText,
  badgeVariant = "outline",
  status = "upcoming",
  rating,
  completion,
  actionLabel = "Accept",
  secondaryActionLabel,
  onAction,
  onSecondaryAction,
}: SessionCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2 space-y-1">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <Badge variant={badgeVariant}>{badgeText}</Badge>
        </div>
        <div className="text-sm text-muted-foreground flex items-center">
          <Calendar className="h-3.5 w-3.5 mr-1.5 inline" />
          {date}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {description && <p className="text-sm mb-4">{description}</p>}

        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <Clock className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
            <span>{participants}</span>
          </div>
        </div>

        {completion !== undefined && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <div>Completion</div>
              <div className="font-medium">{completion}%</div>
            </div>
            <Progress value={completion} className="h-1.5" />
          </div>
        )}

        {rating !== undefined && (
          <div className="flex items-center mt-3">
            <div className="text-sm mr-2">Your Rating:</div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-3.5 w-3.5 ${star <= rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        {status === "registered" && secondaryActionLabel ? (
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1" onClick={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
            <Button variant="destructive" className="flex-1" onClick={onAction}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            className="w-full"
            variant={status === "completed" ? "outline" : "default"}
            size={status === "completed" ? "sm" : "default"}
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
