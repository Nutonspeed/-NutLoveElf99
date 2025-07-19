"use client"
import { useMemo } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { getOrders } from "@/core/mock/store"

export default function OrderPeakTimePage() {
  const orders = getOrders()

  const data = useMemo(() => {
    const weekday: number[] = Array(24).fill(0)
    const weekend: number[] = Array(24).fill(0)
    orders.forEach(o => {
      const d = new Date(o.createdAt)
      const arr = d.getDay() === 0 || d.getDay() === 6 ? weekend : weekday
      arr[d.getHours()]++
    })
    return Array.from({ length:24 }).map((_,h)=>({ hour:h, weekday:weekday[h], weekend:weekend[h] }))
  }, [orders])

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">Order Peak Time (mock)</h1>
      <Card>
        <CardHeader><CardTitle>เวลาที่มียอดสั่งมากที่สุด</CardTitle></CardHeader>
        <CardContent className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="weekday" stroke="#8884d8" name="Weekday" />
              <Line type="monotone" dataKey="weekend" stroke="#82ca9d" name="Weekend" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
