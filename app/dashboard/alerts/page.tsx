"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/buttons/button'
import { Card } from '@/components/ui/cards/card'
import { mockOrders } from '@/core/mock/orders'
import { getMockNow } from '@/lib/mock-date'

export default function DashboardAlertsPage() {
  const now = getMockNow().getTime()
  const pending = mockOrders
    .filter(o => o.status === 'pending')
    .map(o => ({
      ...o,
      wait: now - new Date(o.createdAt).getTime(),
    }))
    .sort((a, b) => b.wait - a.wait)

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">การแจ้งเตือน</h1>
      {pending.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pending.map(o => {
            const days = Math.floor(o.wait / (24 * 60 * 60 * 1000))
            const highlight =
              days >= 3
                ? 'border-red-300 bg-red-50'
                : days >= 1
                ? 'border-orange-300 bg-orange-50'
                : 'border-muted'
            return (
              <Card key={o.id} className={`p-4 space-y-2 border ${highlight}`}>
                <div className="flex justify-between text-sm font-medium">
                  <span>{o.id}</span>
                  <span>{days}d</span>
                </div>
                <p className="text-sm">{o.customerName}</p>
                <Link href={`/orders/${o.id}`}>
                  <Button size="sm">จัดการ</Button>
                </Link>
              </Card>
            )
          })}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">ไม่มีแจ้งเตือน</p>
      )}
    </div>
  )
}
