"use client"
import { useState, useMemo } from 'react'
import SalesChart from '@/components/dashboard/SalesChart'
import { mockOrders, getOrdersInRange, getDailySales } from '@/lib/mock-orders'
import { formatCurrency } from '@/lib/utils'

export default function DashboardReportSales() {
  const [type, setType] = useState<'day' | 'month' | 'year'>('day')

  const { start, end } = useMemo(() => {
    const now = new Date()
    if (type === 'day') {
      const d = new Date(now.toISOString().slice(0, 10))
      return { start: d, end: new Date(d.getTime() + 24*60*60*1000 - 1) }
    }
    if (type === 'month') {
      const s = new Date(now.getFullYear(), now.getMonth(), 1)
      const e = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      return { start: s, end: e }
    }
    const s = new Date(now.getFullYear(), 0, 1)
    const e = new Date(now.getFullYear(), 11, 31)
    return { start: s, end: e }
  }, [type])

  const orders = useMemo(() => getOrdersInRange(start, end), [start, end])
  const total = useMemo(() => orders.reduce((s, o) => s + o.total, 0), [orders])
  const chart = useMemo(() => getDailySales(start, end), [start, end])

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">สรุปยอดขาย (mock)</h1>
      <select className="border rounded p-2" value={type} onChange={e=>setType(e.target.value as any)}>
        <option value="day">วันนี้</option>
        <option value="month">เดือนนี้</option>
        <option value="year">ปีนี้</option>
      </select>
      <div className="text-sm text-muted-foreground">
        <p>ออเดอร์ {orders.length} รายการ</p>
        <p>ยอดรวม {formatCurrency(total)}</p>
        <p>ส่วนลด 0</p>
      </div>
      {chart.length > 0 && <SalesChart data={chart} />}
    </div>
  )
}
