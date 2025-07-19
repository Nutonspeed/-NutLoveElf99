"use client"
import { useEffect, useState } from "react"
import { logs, loadLogs } from "@/lib/logs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface Usage { code: string; count: number }

export default function CouponAnalyticsPage() {
  const [data, setData] = useState<Usage[]>([])

  useEffect(() => {
    loadLogs()
    const counts: Record<string, number> = {}
    logs.filter(l => l.action === 'coupon-used').forEach(l => {
      const code = l.payload?.code || 'unknown'
      counts[code] = (counts[code] || 0) + 1
    })
    setData(Object.keys(counts).map(c => ({ code: c, count: counts[c] })))
  }, [])

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">รายงานการใช้คูปอง</h1>
      {data.length > 0 ? (
        <ChartContainer className="h-60" config={{ coupon: { color: "hsl(262,80%,48%)" } }}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="code" />
            <YAxis allowDecimals={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="var(--color-coupon)" />
          </BarChart>
        </ChartContainer>
      ) : (
        <p className="text-muted-foreground">ไม่มีการใช้คูปอง</p>
      )}
    </div>
  )
}
