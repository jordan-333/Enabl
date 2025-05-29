import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bookmark, ThumbsUp, Play, Clock, Calendar, Star } from "lucide-react"

interface CallCardProps {
  call: {
    id: number
    prospect: string
    date: string
    time: string
    duration: string
    rating: number
    outcome: string
    insights?: number
    objections?: number
    dealSize?: string
    dealStage?: string
    isBookmarked: boolean
    hasAIFeedback: boolean
  }
}

export function CallCard({ call }: CallCardProps) {
  // Function to get the appropriate badge color based on outcome
  const getBadgeColor = (outcome: string) => {
    switch (outcome) {
      case "Meeting Scheduled":
        return "bg-green-100 text-green-800"
      case "Deal Closed":
        return "bg-green-100 text-green-800"
      case "Follow-up Required":
        return "bg-amber-100 text-amber-800"
      case "Proposal Sent":
        return "bg-blue-100 text-blue-800"
      case "Not Interested":
        return "bg-red-100 text-red-800"
      case "Lost Deal":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400 half-filled" />)
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />)
    }

    return stars
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative">
        <img
          src={`/sales-call.png?height=200&width=400&query=sales call with ${call.prospect}`}
          alt={`Call with ${call.prospect}`}
          className="w-full h-40 object-cover"
        />
        <Badge className={`absolute bottom-2 left-2 ${getBadgeColor(call.outcome)}`}>{call.outcome}</Badge>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-lg">{call.prospect}</CardTitle>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bookmark className={`h-4 w-4 ${call.isBookmarked ? "fill-blue-400 text-blue-400" : ""}`} />
            </Button>
            {call.hasAIFeedback && (
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ThumbsUp className="h-4 w-4 text-green-500" />
              </Button>
            )}
          </div>
        </div>
        <CardDescription className="flex items-center gap-1 mt-1">
          <div className="flex">{renderStars(call.rating)}</div>
          <span className="ml-1 text-sm font-medium">{call.rating.toFixed(1)}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
          {call.dealSize && (
            <div className="flex justify-between">
              <span>Deal Size:</span>
              <span className="font-medium">{call.dealSize}</span>
            </div>
          )}
          {call.dealStage && (
            <div className="flex justify-between">
              <span>Stage:</span>
              <span className="font-medium">{call.dealStage}</span>
            </div>
          )}
          {call.objections !== undefined && (
            <div className="flex justify-between">
              <span>Objections:</span>
              <span className="font-medium">{call.objections}</span>
            </div>
          )}
          {call.insights !== undefined && (
            <div className="flex justify-between">
              <span>Insights:</span>
              <span className="font-medium">{call.insights}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <div className="flex items-center text-xs text-muted-foreground">
          <div className="flex items-center mr-3">
            <Clock className="mr-1 h-3 w-3" />
            {call.duration}
          </div>
          <div className="flex items-center">
            <Calendar className="mr-1 h-3 w-3" />
            {call.date}
          </div>
        </div>
        <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
          <Play className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
