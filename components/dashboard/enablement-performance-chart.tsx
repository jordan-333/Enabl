"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Scatter, ScatterChart } from "recharts"
import { useUser } from "@/components/user-context"
import { LineChart } from "lucide-react"

// Sample data for the scatter plot - only used when not a new account
const getData = (isNewAccount: boolean) => isNewAccount ? [] : [
  // Setters
  { enablementScore: 65, performanceScore: 58, role: "setter" },
  { enablementScore: 70, performanceScore: 63, role: "setter" },
  { enablementScore: 75, performanceScore: 67, role: "setter" },
  { enablementScore: 80, performanceScore: 74, role: "setter" },
  { enablementScore: 85, performanceScore: 78, role: "setter" },
  { enablementScore: 90, performanceScore: 82, role: "setter" },
  // Closers
  { enablementScore: 60, performanceScore: 57, role: "closer" },
  { enablementScore: 68, performanceScore: 62, role: "closer" },
  { enablementScore: 73, performanceScore: 68, role: "closer" },
  { enablementScore: 78, performanceScore: 72, role: "closer" },
  { enablementScore: 83, performanceScore: 77, role: "closer" },
  { enablementScore: 88, performanceScore: 80, role: "closer" },
  { enablementScore: 92, performanceScore: 85, role: "closer" },
]

// Trend line data - only used when not a new account
const getTrendLineData = (isNewAccount: boolean) => isNewAccount ? [] : [
  { x: 0, y: 0 },
  { x: 100, y: 100 },
]

export default function EnablementPerformanceChart() {
  const { isNewAccount } = useUser()
  const data = getData(isNewAccount)
  const trendLineData = getTrendLineData(isNewAccount)

  if (isNewAccount) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <div className="flex flex-col space-y-1.5">
            <CardTitle>Enablement Score vs Performance</CardTitle>
            <CardDescription>How enablement scores correlate with performance metrics</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="relative pt-6">
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            <div className="text-center">
              <LineChart className="mx-auto h-8 w-8 mb-2" />
              <p>No data available yet</p>
              <p className="text-sm">Complete training and activities to see your performance data</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex flex-col space-y-1.5">
          <CardTitle>Enablement Score vs Performance</CardTitle>
          <CardDescription>How enablement scores correlate with performance metrics</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="relative pt-6">
        {/* Position the correlation and legend above the chart */}
        <div className="flex justify-between items-center mb-4">
          <div></div> {/* Empty div for spacing */}
          <div className="flex items-center gap-6">
            <div className="text-sm font-medium px-3 py-1 bg-white/90 border rounded-md shadow-sm">
              Correlation: 0.78
            </div>
            <div className="flex items-center gap-4 px-3 py-1 bg-white/90 border rounded-md shadow-sm">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="text-xs">Setters</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                <span className="text-xs">Closers</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="enablementScore"
                name="Enablement Score"
                domain={[0, 100]}
                label={{ value: "Enablement Score", position: "bottom", offset: 0 }}
              />
              <YAxis
                type="number"
                dataKey="performanceScore"
                name="Performance Score"
                domain={[0, 100]}
                label={{ value: "Performance Score", angle: -90, position: "left" }}
              />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                formatter={(value, name) => [
                  `${value}`,
                  name === "enablementScore" ? "Enablement Score" : "Performance Score",
                ]}
              />

              {/* Trend line */}
              <Line
                data={trendLineData}
                type="monotone"
                dataKey="y"
                stroke="#a5d6b7"
                strokeWidth={2}
                dot={false}
                activeDot={false}
                isAnimationActive={false}
              />

              {/* Setters data points */}
              <Scatter name="Setters" data={data.filter((d) => d.role === "setter")} fill="#3b82f6" shape="circle" />

              {/* Closers data points */}
              <Scatter name="Closers" data={data.filter((d) => d.role === "closer")} fill="#a855f7" shape="diamond" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
