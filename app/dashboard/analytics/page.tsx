"use client"
import { useMemo, useState } from "react"
import SalesChart from "@/components/dashboard/SalesChart"
import { getSimpleOrders, getBills } from "@/core/mock/store"
import { formatCurrency } from "@/lib/utils"

export default function DashboardAnalyticsPage() {
  const [range, setRange] = useState(7)
  const paidOrders = getSimpleOrders().filter(o => o.status === "paid").length
  const totalOrders = getSimpleOrders().length

  const salesToday = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10)
    return getBills()
      .filter(b => b.status === "paid" && b.createdAt.slice(0, 10) === today)
      .reduce((s, b) => s + b.items.reduce((n, i) => n + i.price * i.quantity, 0) + b.shipping, 0)
  }, [])

  const salesMonth = useMemo(() => {
    const month = new Date().toISOString().slice(0, 7)
    return getBills()
      .filter(b => b.status === "paid" && b.createdAt.slice(0, 7) === month)
      .reduce((s, b) => s + b.items.reduce((n, i) => n + i.price * i.quantity, 0) + b.shipping, 0)
  }, [])

  const chartData = useMemo(() => {
    const now = new Date()
    const start = new Date()
    start.setDate(now.getDate() - range + 1)
    const days: { date: string; total: number }[] = []
    for (let d = new Date(start); d <= now; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().slice(5, 10)
      const total = getBills()
        .filter(b => b.status === "paid" && b.createdAt.slice(0, 10) === d.toISOString().slice(0, 10))
        .reduce((s, b) => s + b.items.reduce((n, i) => n + i.price * i.quantity, 0) + b.shipping, 0)
      days.push({ date: dateStr, total })
    }
    return days
  }, [range])

  if (getSimpleOrders().length === 0 && getBills().length === 0) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-center text-muted-foreground">ไม่มีข้อมูลในช่วงเวลานี้</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">สถิติ</h1>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">ชำระเงินแล้ว {paidOrders} / {totalOrders} คำสั่งซื้อ</p>
        <select
          className="rounded-md border p-2"
          value={range}
          onChange={e => setRange(parseInt(e.target.value))}
        >
          <option value={1}>วันนี้</option>
          <option value={7}>7 วัน</option>
          <option value={30}>30 วัน</option>
        </select>
      </div>
      <div className="text-sm text-muted-foreground">
        <p>ยอดขายวันนี้: {formatCurrency(salesToday)}</p>
        <p>ยอดขายเดือนนี้: {formatCurrency(salesMonth)}</p>
      </div>
      {chartData.length > 0 && <SalesChart data={chartData} />}
    </div>
  )
}
