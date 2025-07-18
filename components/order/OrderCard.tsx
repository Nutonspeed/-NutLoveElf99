"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import type { SimpleOrder } from '@/mock/orders'
import InlineStatusBadge from '@/components/ui/InlineStatusBadge'

export default function OrderCard({ order, onCancel }: { order: SimpleOrder; onCancel?: (id: string) => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">คำสั่งซื้อ {order.id}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p>ลูกค้า: {order.customer}</p>
        <p>
          สถานะ: <InlineStatusBadge status={order.status} />
        </p>
        <p>ยอดรวม: ฿{order.total.toLocaleString()}</p>
        <div className="flex gap-2 pt-2">
          <Link href={`/dashboard/orders/${order.id}`}>
            <Button variant="outline" size="sm">ดู</Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCancel?.(order.id)}
          >
            ยกเลิก
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
