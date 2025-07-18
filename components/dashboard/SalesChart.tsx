"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import React from "react"

class ChartBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

export default function SalesChart({ data }: { data: { date: string; total: number }[] }) {
  if (!data.length) return null
  return (
    <ChartBoundary>
      <ChartContainer
        className="h-60 w-full"
        config={{ sales: { color: "hsl(221, 83%, 53%)" } }}
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="total" stroke="var(--color-sales)" />
        </LineChart>
      </ChartContainer>
    </ChartBoundary>
  )
}
