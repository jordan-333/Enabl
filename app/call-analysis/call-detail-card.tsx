"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bookmark, MessageSquare, Phone } from "lucide-react"

interface CallProps {
  id: number
  prospect: string
  date: string
  time: string
  duration: string
  rating: number
  outcome: string
  insights: number
  isBookmarked?: boolean
  hasAIFeedback?: boolean
  type?: "call" | "conversation"
  feedbackReceived?: boolean
  improvement?: string[]
  rep?: string
}

export function CallDetailCard({ call }: { call: CallProps }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(call.isBookmarked || false)

  // Convert rating to a score out of 10
  const scoreOutOf10 = Math.round(call.rating * 2 * 10) / 10

  // Sample feedback data
  const feedbackData = {
    strengths: [
      "Strong opening that established rapport quickly",
      "Clear articulation of value proposition",
      "Effective use of open-ended questions",
    ],
    improvements: call.improvement || ["No specific areas for improvement identified"],
    transcript:
      call.type === "call"
        ? `
[00:00] You: Hi, this is [Your Name] from Enabl. Am I speaking with [Prospect Name]?
[00:05] Prospect: Yes, this is [Prospect Name]. What can I do for you?
[00:10] You: Thanks for taking my call. I noticed your company has been expanding its sales team recently. Many companies in your position are struggling with onboarding and training at scale. Is that something you're experiencing as well?
[00:25] Prospect: Actually, yes. We've added about 20 new reps in the last quarter, and getting them up to speed has been challenging.
[00:35] You: I understand. That's exactly why I'm reaching out. We help companies like yours accelerate sales onboarding through our AI-powered training platform...
[continues for several minutes]
    `
        : `
You: Hi [Prospect Name], I hope this message finds you well. I noticed your company has been expanding its sales team recently based on your LinkedIn announcements. Many companies in your position are struggling with onboarding and training at scale. Is that something you're experiencing as well?

Prospect: Hi [Your Name], thanks for reaching out. Yes, we've added about 20 new reps in the last quarter, and getting them up to speed has been challenging.

You: I understand completely. That's exactly why I'm reaching out. We help companies like yours accelerate sales onboarding through our AI-powered training platform. Would you be open to a quick 15-minute call to discuss how we might be able to help?

Prospect: That sounds interesting. Can you share a bit more about how your platform works specifically?

You: Of course! Our platform uses AI to analyze sales calls and provide personalized coaching to each rep. It identifies areas for improvement and recommends specific training modules. We've seen companies reduce onboarding time by 40% and increase new rep productivity by 30% in the first 90 days.

Prospect: Those are impressive numbers. I'd be interested in learning more. How about next Tuesday at 2pm?

You: Tuesday at 2pm works perfectly. I'll send over a calendar invite with a Zoom link. Looking forward to our conversation!

Prospect: Great, talk to you then.
    `,
    recommendations: [
      {
        id: 1,
        title: "Advanced Objection Handling",
        type: "Course",
        description: "Learn techniques to handle complex objections in discovery calls",
      },
      {
        id: 2,
        title: "Value Proposition Masterclass",
        type: "Workshop",
        description: "Craft compelling value propositions tailored to different industries",
      },
    ],
  }

  return (
    <>
      <Card
        className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative">
          <img
            src={
              call.type === "call"
                ? `/sales-call.png?height=200&width=400&query=sales call with ${call.prospect}`
                : `/person-typing-email.png?height=200&width=400&query=sales conversation with ${call.prospect}`
            }
            alt={`${call.type === "call" ? "Call" : "DM Conversation"} with ${call.prospect}`}
            className="w-full h-40 object-cover"
          />
          <div className="absolute top-2 right-2 flex gap-1">
            {call.hasAIFeedback && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                AI Feedback
              </Badge>
            )}
          </div>
          <Badge className="absolute bottom-2 left-2 bg-blue-100 text-blue-800">
            {call.type === "call" ? (
              <>
                <Phone className="h-3 w-3 mr-1" /> Call
              </>
            ) : (
              <>
                <MessageSquare className="h-3 w-3 mr-1" /> DM
              </>
            )}
          </Badge>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{call.prospect}</CardTitle>
          <CardDescription>
            {call.rep && `${call.rep} • `}
            {call.date} • {call.time} • {call.duration}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Score</span>
            <Badge variant="outline">{scoreOutOf10}/10</Badge>
          </div>
          <Progress value={scoreOutOf10 * 10} className="h-2 mt-1" />
        </CardContent>
        <CardFooter className="pt-0 flex justify-between">
          <Badge variant={call.outcome === "Meeting Scheduled" ? "success" : "secondary"}>{call.outcome}</Badge>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation()
              setIsBookmarked(!isBookmarked)
            }}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
            <span className="sr-only">Bookmark</span>
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>
                {call.type === "call" ? "Call" : "DM Conversation"} with {call.prospect}
              </span>
              <Badge variant="outline" className="ml-2 text-lg">
                {scoreOutOf10}/10
              </Badge>
            </DialogTitle>
            <div className="text-sm text-muted-foreground">
              {call.rep && `${call.rep} • `}
              {call.date} • {call.time} • {call.duration} • {call.outcome}
            </div>
          </DialogHeader>

          <Tabs defaultValue="feedback" className="mt-4">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="transcript">{call.type === "call" ? "Transcript" : "Conversation"}</TabsTrigger>
              <TabsTrigger value="improvement">Improvement Plan</TabsTrigger>
            </TabsList>

            <TabsContent value="feedback" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">Strengths</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {feedbackData.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-amber-600">Areas for Improvement</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {feedbackData.improvements.map((improvement, index) => (
                      <li key={index}>{improvement}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transcript">
              <Card>
                <CardContent className="pt-6">
                  <pre className="whitespace-pre-wrap font-mono text-sm bg-muted p-4 rounded-md overflow-auto max-h-[400px]">
                    {feedbackData.transcript}
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="improvement" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Resources</CardTitle>
                  <CardDescription>
                    Based on your performance in this {call.type === "call" ? "call" : "conversation"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {feedbackData.recommendations.map((resource) => (
                    <div key={resource.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{resource.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                        </div>
                        <Badge>{resource.type}</Badge>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" className="w-full">
                          Start Learning
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            <Button>Share {call.type === "call" ? "Call" : "Conversation"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
