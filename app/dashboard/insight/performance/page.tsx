"use client"
import { useMemo, useState } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Input } from "@/components/ui/inputs/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { mockBills } from "@/mock/bills"
import { mockCustomers } from "@/core/mock/customers"
import { orders as mockOrders } from "@/core/mock/orders"
import { formatCurrency } from "@/lib/utils"

export default function PerformanceDashboard() {
  const [range, setRange] = useState(7)

  const start = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() - (range - 1))
    return d
  }, [range])

  const kpi = useMemo(() => {
    const sales = mockBills
      .filter(b => b.status === 'paid' && new Date(b.createdAt) >= start)
      .reduce((s, b) => s + b.items.reduce((n, i) => n + i.price * i.quantity, 0) + b.shipping, 0)
    const customers = mockCustomers.filter(c => new Date(c.createdAt) >= start).length
    const orders = mockOrders.filter(o => new Date(o.date) >= start).length
    return { sales, customers, orders }
  }, [start])

  const daily = useMemo(() => {
    const arr: { day: string; orders: number }[] = []
    for (let i = 0; i < range; i++) {
      const d = new Date(start)
      d.setDate(d.getDate() + i)
      const key = d.toISOString().slice(5,10)
      const count = mockOrders.filter(o => o.date.slice(0,10) === d.toISOString().slice(0,10)).length
      arr.push({ day: key, orders: count })
    }
    return arr
  }, [start, range])

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">Performance (mock)</h1>
      <div className="flex gap-2 items-center">
        <label className="text-sm">ช่วงวัน:</label>
        <Input type="number" min={1} value={range} onChange={e=>setRange(parseInt(e.target.value)||1)} className="w-20" />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>ยอดขาย</CardTitle>
          </CardHeader>
          <CardContent>{formatCurrency(kpi.sales)}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ลูกค้าใหม่</CardTitle>
          </CardHeader>
          <CardContent>{kpi.customers}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ออเดอร์</CardTitle>
          </CardHeader>
          <CardContent>{kpi.orders}</CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>ออเดอร์ต่อวัน</CardTitle>
        </CardHeader>
        <CardContent className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={daily}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#8884d8" name="orders" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
