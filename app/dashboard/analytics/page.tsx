"use client"
import { useState, useMemo } from 'react'
import SalesChart from '@/components/dashboard/SalesChart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { mockOrders } from '@/lib/mock-orders'
import { mockBills } from '@/mock/bills'
import { getMockNow } from '@/lib/mock-date'

export default function AnalyticsPage() {
  const [range, setRange] = useState<'1' | '7' | '30'>('7')
  const now = getMockNow()

  const billsInRange = useMemo(() => {
    const days = Number(range)
    return mockBills.filter(b => {
      const diff = now.getTime() - new Date(b.createdAt).getTime()
      return diff <= days * 24 * 60 * 60 * 1000
    })
  }, [range, now])

  const dailyData = useMemo(() => {
    const days = Number(range)
    return Array.from({ length: days }).map((_, i) => {
      const d = new Date(now)
      d.setDate(d.getDate() - (days - 1 - i))
      const total = billsInRange
        .filter(b => new Date(b.createdAt).toDateString() === d.toDateString())
        .reduce((s, b) =>
          s + b.items.reduce((t, it) => t + it.price * it.quantity, 0) + b.shipping,
        0)
      return {
        name: d.toLocaleDateString('th-TH', { month: 'short', day: 'numeric' }),
        total,
      }
    })
  }, [billsInRange, range, now])

  const salesToday = billsInRange
    .filter(b => new Date(b.createdAt).toDateString() === now.toDateString())
    .reduce((s, b) => s + b.items.reduce((t, it) => t + it.price * it.quantity, 0) + b.shipping, 0)

  const salesMonth = billsInRange
    .filter(b => b.createdAt.slice(0,7) === now.toISOString().slice(0,7))
    .reduce((s, b) => s + b.items.reduce((t, it) => t + it.price * it.quantity, 0) + b.shipping, 0)

  const paidOrders = mockOrders.filter(o => o.status === 'paid')

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold">สถิติยอดขาย</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>วันนี้</CardTitle>
          </CardHeader>
          <CardContent>
            ฿{salesToday.toLocaleString()}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>เดือนนี้</CardTitle>
          </CardHeader>
          <CardContent>
            ฿{salesMonth.toLocaleString()}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ชำระแล้ว</CardTitle>
          </CardHeader>
          <CardContent>
            {paidOrders.length}/{mockOrders.length} ออเดอร์
          </CardContent>
        </Card>
      </div>
      <div className="space-y-2">
        <div className="flex justify-end">
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">วันนี้</SelectItem>
              <SelectItem value="7">7 วัน</SelectItem>
              <SelectItem value="30">30 วัน</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <SalesChart data={dailyData} />
      </div>
    </div>
  )
}
