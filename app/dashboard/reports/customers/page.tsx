"use client"
import { useMemo } from 'react'
import { mockCustomers, getCustomerStats } from '@/lib/mock-customers'

export default function DashboardReportCustomers() {
  const now = Date.now()
  const newCustomers = useMemo(() => mockCustomers.filter(c => now - new Date(c.createdAt).getTime() <= 30*24*60*60*1000), [])
  const top = useMemo(() => {
    return mockCustomers.map(c => ({ name: c.name, total: getCustomerStats(c.id).totalSpent }))
      .sort((a,b)=>b.total-a.total)
      .slice(0,10)
  }, [])
  const repeatPercent = useMemo(() => {
    const repeat = mockCustomers.filter(c => getCustomerStats(c.id).totalOrders > 1).length
    return mockCustomers.length === 0 ? 0 : Math.round((repeat / mockCustomers.length)*100)
  }, [])

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">รายงานลูกค้า (mock)</h1>
      <p className="text-sm text-muted-foreground">ลูกค้าใหม่ {newCustomers.length} ราย</p>
      <p className="text-sm text-muted-foreground">ซื้อซ้ำ {repeatPercent}%</p>
      <div>
        <h2 className="font-semibold mb-2">Top 10</h2>
        <ul className="list-decimal pl-6 space-y-1">
          {top.map(t => (<li key={t.name}>{t.name} - ฿{t.total.toLocaleString()}</li>))}
        </ul>
      </div>
    </div>
  )
}
