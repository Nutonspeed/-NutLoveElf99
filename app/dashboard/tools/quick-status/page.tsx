"use client"
import Link from 'next/link'
import { mockOrders } from '@/lib/mock-orders'
import { mockBills } from '@/mock/bills'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Button } from '@/components/ui/buttons/button'

export default function QuickStatusPage() {
  const latestOrder = mockOrders[0]
  const latestBill = mockBills[0]

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">สถานะด่วน</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="text-sm">
          <CardHeader>
            <CardTitle>ออเดอร์ล่าสุด</CardTitle>
          </CardHeader>
          <CardContent>
            {latestOrder ? (
              <div className="space-y-1">
                <div>{latestOrder.id}</div>
                <div>{latestOrder.customerName}</div>
                <div>฿{latestOrder.total.toLocaleString()}</div>
              </div>
            ) : (
              <p className="text-muted-foreground">ไม่มีข้อมูล</p>
            )}
          </CardContent>
        </Card>
        <Card className="text-sm">
          <CardHeader>
            <CardTitle>บิลล่าสุด</CardTitle>
          </CardHeader>
          <CardContent>
            {latestBill ? (
              <div className="space-y-1">
                <div>{latestBill.id}</div>
                <div>{latestBill.customer}</div>
                <div>{latestBill.status}</div>
              </div>
            ) : (
              <p className="text-muted-foreground">ไม่มีข้อมูล</p>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="flex gap-2">
        <Link href="/dashboard/fabrics"><Button size="sm">Fabrics</Button></Link>
        <Link href="/dashboard/orders"><Button size="sm">Orders</Button></Link>
        <Link href="/dashboard/bill/BILL-001"><Button size="sm">Bills</Button></Link>
      </div>
    </div>
  )
}
