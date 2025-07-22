"use client"
import { useMemo } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/cards/card"
import Link from "next/link"
import { getBills } from "@/core/mock/store"

export default function UnpaidFollowupAnalytics() {
  const bills = getBills()

  const totalUnpaid = useMemo(
    () => bills.filter(b => b.status !== "paid").length,
    [bills]
  )

  const followupsToday = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10)
    return bills.reduce(
      (count, b) =>
        count + (b.followup_log?.filter(f => f.slice(0, 10) === today).length || 0),
      0
    )
  }, [bills])

  const followupBills = useMemo(
    () => bills.filter(b => (b.followup_log?.length || 0) > 0),
    [bills]
  )
  const paidAfterFollowup = useMemo(
    () => followupBills.filter(b => b.status === "paid").length,
    [followupBills]
  )
  const conversionRate = useMemo(
    () =>
      followupBills.length
        ? Math.round((paidAfterFollowup / followupBills.length) * 100)
        : 0,
    [paidAfterFollowup, followupBills]
  )

  const chartData = useMemo(() => {
    const now = new Date()
    const start = new Date()
    start.setDate(now.getDate() - 6)
    const days: { date: string; count: number }[] = []
    for (let d = new Date(start); d <= now; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().slice(0, 10)
      const count = bills.reduce(
        (c, b) => c + (b.followup_log?.filter(f => f.slice(0, 10) === key).length || 0),
        0
      )
      days.push({ date: key.slice(5), count })
    }
    return days
  }, [bills])

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">การติดตามบิลค้าง</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>บิลค้างชำระ</CardTitle>
          </CardHeader>
          <CardContent>{totalUnpaid}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ติดตามวันนี้</CardTitle>
          </CardHeader>
          <CardContent>{followupsToday}</CardContent>
        </Card>
        <Link href="/admin/bills?filter=followup-success" className="no-underline">
          <Card className="cursor-pointer hover:bg-accent/50">
            <CardHeader>
              <CardTitle>ชำระหลังติดตาม</CardTitle>
            </CardHeader>
            <CardContent>
              {paidAfterFollowup} / {followupBills.length} ({conversionRate}%)
            </CardContent>
          </Card>
        </Link>
      </div>
      {chartData.some(d => d.count > 0) ? (
        <ChartContainer className="h-60" config={{ follow: { color: "hsl(10,80%,50%)" } }}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="var(--color-follow)" />
          </BarChart>
        </ChartContainer>
      ) : (
        <p className="text-sm text-muted-foreground">ไม่มีข้อมูลการติดตาม</p>
      )}
    </div>
  )
}
