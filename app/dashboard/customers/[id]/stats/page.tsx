"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import SalesChart from "@/components/dashboard/SalesChart"
import { mockCustomers, getCustomerStats, getCustomerOrders } from "@/lib/mock-customers"

export default function CustomerStatsPage() {
  const params = useParams<{ id: string }>()
  const customer = mockCustomers.find((c) => c.id === params.id)
  if (!customer) return <div className="p-8">ไม่พบลูกค้า</div>
  const stats = getCustomerStats(customer.id)
  const orders = getCustomerOrders(customer.id)
  const chartData = orders.map((o) => ({ date: o.createdAt.slice(5, 10), total: o.total }))
  return (
    <div className="container mx-auto py-8 space-y-4">
      <Link href={`/dashboard/customers/${customer.id}`}> <Button variant="outline">กลับ</Button></Link>
      <h1 className="text-2xl font-bold">สถิติการสั่งซื้อของ {customer.name}</h1>
      <Card>
        <CardHeader>
          <CardTitle>ภาพรวม</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>จำนวนออเดอร์: {stats.totalOrders}</p>
          <p>มูลค่ารวม: ฿{stats.totalSpent.toLocaleString()}</p>
          <p>ความถี่การสั่งซื้อ: {stats.totalOrders > 0 ? `${(stats.totalOrders / orders.length).toFixed(1)} ครั้ง` : '-'}</p>
          {chartData.length > 0 && <SalesChart data={chartData} />}
        </CardContent>
      </Card>
    </div>
  )
}
