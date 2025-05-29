import { Trophy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useUser } from "@/components/user-context"

export function CallLeaderboard() {
  const { isNewAccount } = useUser()

  // Sample data for the leaderboard - only used when not a new account
  const topCalls = isNewAccount ? [] : [
    {
      id: 1,
      rep: { name: "Jane Smith", avatar: "JS", role: "Setter" },
      company: "Enterprise Corp",
      type: "Discovery",
      score: 9.5,
      date: "May 18, 2023",
    },
    {
      id: 2,
      rep: { name: "Robert Johnson", avatar: "RJ", role: "Closer" },
      company: "TechStart Inc",
      type: "Demo",
      score: 9.2,
      date: "May 16, 2023",
    },
    {
      id: 3,
      rep: { name: "Mike Brown", avatar: "MB", role: "Setter" },
      company: "Innovate Inc",
      type: "Chat",
      score: 9.0,
      date: "May 16, 2023",
    },
    {
      id: 4,
      rep: { name: "Sarah Johnson", avatar: "SJ", role: "Closer" },
      company: "Global Solutions",
      type: "Closing",
      score: 8.8,
      date: "May 14, 2023",
    },
    {
      id: 5,
      rep: { name: "Alex Wong", avatar: "AW", role: "Setter" },
      company: "Nexus Technologies",
      type: "Discovery",
      score: 8.5,
      date: "May 14, 2023",
    },
  ]

  if (isNewAccount) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Calls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Trophy className="mx-auto h-8 w-8 mb-2" />
            <p>No calls have been reviewed yet</p>
            <p className="text-sm">Submit calls for review to see them here</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center">
          <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
          <CardTitle>Top Calls Leaderboard</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topCalls.map((call, index) => (
            <div
              key={call.id}
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
                  <AvatarImage src={`/placeholder-icon.png?height=32&width=32&text=${call.rep.avatar}`} />
                  <AvatarFallback>{call.rep.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm flex items-center">
                    {call.rep.name}
                    <Badge variant="outline" className="ml-2 text-xs py-0">
                      {call.rep.role}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {call.company} • {call.type} • {call.date}
                  </div>
                </div>
              </div>
              <div className="font-bold text-sm">{call.score}/10</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
