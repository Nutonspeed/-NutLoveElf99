"use client"
import { useMemo } from "react"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { getOrders, getCustomers } from "@/core/mock/store"
import { formatCurrency } from "@/lib/utils"

export default function InsightKpiPage() {
  const orders = getOrders()
  const customers = getCustomers()

  const totalSales = useMemo(() => orders.reduce((s, o) => s + o.total, 0), [orders])
  const totalOrders = orders.length
  const newCustomers = customers.filter(c => {
    const d = new Date(c.createdAt)
    const aMonthAgo = new Date()
    aMonthAgo.setDate(aMonthAgo.getDate() - 30)
    return d >= aMonthAgo
  }).length

  // mock return rate 0
  const returnRate = 0

  const dailyData = useMemo(() => {
    const map: Record<string, number> = {}
    orders.forEach(o => {
      const day = o.createdAt.slice(5, 10)
      map[day] = (map[day] || 0) + 1
    })
    return Object.entries(map).map(([day, count]) => ({ day, count }))
  }, [orders])

  const monthlyData = useMemo(() => {
    const map: Record<string, number> = {}
    orders.forEach(o => {
      const month = o.createdAt.slice(0, 7)
      map[month] = (map[month] || 0) + 1
    })
    return Object.entries(map).map(([month, count]) => ({ month, count }))
  }, [orders])

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">KPI Overview (mock)</h1>
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader><CardTitle>ยอดขายรวม</CardTitle></CardHeader>
          <CardContent>{formatCurrency(totalSales)}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>ออเดอร์ทั้งหมด</CardTitle></CardHeader>
          <CardContent>{totalOrders}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>ลูกค้าใหม่</CardTitle></CardHeader>
          <CardContent>{newCustomers}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>อัตราการคืน</CardTitle></CardHeader>
          <CardContent>{returnRate}%</CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle>ยอดออเดอร์รายวัน</CardTitle></CardHeader>
        <CardContent className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" name="orders" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>ยอดออเดอร์รายเดือน</CardTitle></CardHeader>
        <CardContent className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#82ca9d" name="orders" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
