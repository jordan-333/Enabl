"use client"

import { Progress } from "@/components/ui/progress"

interface RoleSpecificKPIsProps {
  role: "setter" | "closer" | "manager"
}

export function RoleSpecificKPIs({ role }: RoleSpecificKPIsProps) {
  if (role === "setter") {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {/* Setter Monthly Targets */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Monthly Targets</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Total Inputs Target</span>
              <span className="font-medium">500 inputs</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Positive Conversations Target</span>
              <span className="font-medium">100 conversations</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Calls Booked Target</span>
              <span className="font-medium">40 calls</span>
            </div>
          </div>
        </div>

        {/* Setter Progress */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Progress to Target</h4>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Total Inputs (420/500)</span>
                <span className="text-sm font-medium">84%</span>
              </div>
              <Progress value={84} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Positive Conversations (88/100)</span>
                <span className="text-sm font-medium">88%</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Calls Booked (35/40)</span>
                <span className="text-sm font-medium">88%</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (role === "closer") {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {/* Closer Monthly Targets */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Monthly Targets</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Calls Taken Target</span>
              <span className="font-medium">50 calls</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Deals Closed Target</span>
              <span className="font-medium">12 deals</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Revenue Generated Target</span>
              <span className="font-medium">$15,000</span>
            </div>
          </div>
        </div>

        {/* Closer Progress */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Progress to Target</h4>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Calls Taken (42/50)</span>
                <span className="text-sm font-medium">84%</span>
              </div>
              <Progress value={84} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Deals Closed (10/12)</span>
                <span className="text-sm font-medium">83%</span>
              </div>
              <Progress value={83} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Revenue Generated ($12,450/$15,000)</span>
                <span className="text-sm font-medium">83%</span>
              </div>
              <Progress value={83} className="h-2" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (role === "manager") {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {/* Manager Monthly Targets */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Monthly Targets</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Team Meetings Booked Target</span>
              <span className="font-medium">200 meetings</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Team Deals Closed Target</span>
              <span className="font-medium">60 deals</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Total Revenue Generated Target</span>
              <span className="font-medium">$150,000</span>
            </div>
          </div>
        </div>

        {/* Manager Progress */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Progress to Target</h4>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Team Meetings Booked (175/200)</span>
                <span className="text-sm font-medium">88%</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Team Deals Closed (52/60)</span>
                <span className="text-sm font-medium">87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Total Revenue Generated ($142K/$150K)</span>
                <span className="text-sm font-medium">95%</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export function RoleSpecificQuarterlyGoals({ role }: RoleSpecificKPIsProps) {
  if (role === "setter") {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        <div className="text-center p-4 rounded-lg bg-muted/50">
          <div className="text-2xl font-bold text-primary">1,500</div>
          <div className="text-sm text-muted-foreground">Total Inputs Goal</div>
          <div className="text-xs mt-1">1,260 completed (84%)</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-muted/50">
          <div className="text-2xl font-bold text-primary">300</div>
          <div className="text-sm text-muted-foreground">Positive Conversations</div>
          <div className="text-xs mt-1">264 achieved (88%)</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-muted/50">
          <div className="text-2xl font-bold text-primary">120</div>
          <div className="text-sm text-muted-foreground">Calls Booked</div>
          <div className="text-xs mt-1">105 booked (88%)</div>
        </div>
      </div>
    )
  }

  if (role === "closer") {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        <div className="text-center p-4 rounded-lg bg-muted/50">
          <div className="text-2xl font-bold text-primary">150</div>
          <div className="text-sm text-muted-foreground">Calls Taken Goal</div>
          <div className="text-xs mt-1">126 taken (84%)</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-muted/50">
          <div className="text-2xl font-bold text-primary">36</div>
          <div className="text-sm text-muted-foreground">Deals Closed</div>
          <div className="text-xs mt-1">30 closed (83%)</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-muted/50">
          <div className="text-2xl font-bold text-primary">$45K</div>
          <div className="text-sm text-muted-foreground">Revenue Generated</div>
          <div className="text-xs mt-1">$37.2K achieved (83%)</div>
        </div>
      </div>
    )
  }

  if (role === "manager") {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        <div className="text-center p-4 rounded-lg bg-muted/50">
          <div className="text-2xl font-bold text-primary">600</div>
          <div className="text-sm text-muted-foreground">Team Meetings Booked</div>
          <div className="text-xs mt-1">525 booked (88%)</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-muted/50">
          <div className="text-2xl font-bold text-primary">180</div>
          <div className="text-sm text-muted-foreground">Team Deals Closed</div>
          <div className="text-xs mt-1">156 closed (87%)</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-muted/50">
          <div className="text-2xl font-bold text-primary">$450K</div>
          <div className="text-sm text-muted-foreground">Total Revenue Generated</div>
          <div className="text-xs mt-1">$426K achieved (95%)</div>
        </div>
      </div>
    )
  }

  return null
}
