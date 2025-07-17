"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import type { Order } from "@/types/order"
import Link from "next/link"

interface Props {
  orders: Order[]
  onMarkReady: (id: string) => void
  onMarkCompleted: (id: string) => void
}

function StatusBadge({ order }: { order: Order }) {
  if (order.status === "depositPaid") return <Badge className="bg-blue-500 text-white">รอมัดจำ</Badge>
  if (order.status === "paid" && order.shipping_status === "pending") return <Badge className="bg-yellow-500 text-white">รอจัดส่ง</Badge>
  if (order.status === "completed" || order.shipping_status === "delivered") return <Badge className="bg-green-500 text-white">ปิดยอดแล้ว</Badge>
  if (order.status === "pendingPayment") return <Badge className="bg-red-500 text-white">ยังไม่โอน</Badge>
  return <Badge variant="outline" className="text-xs">{order.status}</Badge>
}

export default function LatestOrders({ orders, onMarkReady, onMarkCompleted }: Props) {
  const latest = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>รายการล่าสุด</CardTitle>
        <Link href="/admin/orders">
          <Button size="sm" variant="outline">View all orders</Button>
        </Link>
      </CardHeader>
      <CardContent>
        {latest.length ? (
          <ul className="space-y-2">
            {latest.map(o => (
              <li key={o.id} className="flex items-center justify-between border-b pb-2 last:border-b-0">
                <div>
                  <p className="font-medium">{o.id}</p>
                  <p className="text-sm text-gray-600">{new Date(o.createdAt).toLocaleDateString("th-TH")}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <StatusBadge order={o} />
                  <Button size="sm" variant="outline" onClick={() => onMarkReady(o.id)}>
                    Mark as Ready
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => onMarkCompleted(o.id)}>
                    Mark as Completed
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>ไม่มีข้อมูลคำสั่งซื้อ</p>
        )}
      </CardContent>
    </Card>
  )
}
