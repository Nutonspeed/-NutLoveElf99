"use client"
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Badge } from '@/components/ui/badge'
import { useBillById } from '@/hooks/useBillById'

export default function AdminBillDetailPage({ params }: { params: { id: string } }) {
  const bill = useBillById(params.id)

  if (bill === undefined) {
    return <div className="p-4 text-center">Loading...</div>
  }

  if (!bill) {
    return <div className="p-4 text-center">ไม่พบบิล</div>
  }

  const subtotal = bill.items.reduce((sum, it) => sum + it.price * it.quantity, 0)
  const discount = (bill as any).discount || 0
  const total = subtotal - discount + bill.shipping

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center gap-2">
        <Link href="/admin/bills">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">บิล {bill.id}</h1>
        <Badge className="ml-auto">{bill.status}</Badge>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลลูกค้า</CardTitle>
        </CardHeader>
        <CardContent>{bill.customer}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>รายการสินค้า</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          {bill.items.map((it, idx) => (
            <div key={idx} className="flex justify-between">
              <span>{it.name} × {it.quantity}</span>
              <span>฿{(it.price * it.quantity).toLocaleString()}</span>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>สรุปยอด</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>ยอดรวมสินค้า</span>
            <span>฿{subtotal.toLocaleString()}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between">
              <span>ส่วนลด</span>
              <span>-฿{discount.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>ค่าจัดส่ง</span>
            <span>฿{bill.shipping.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-semibold border-t pt-2">
            <span>รวมทั้งหมด</span>
            <span className="text-primary">฿{total.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>
      <div className="flex gap-2">
        <Button>Approve</Button>
        <Button variant="outline">Mark as Paid</Button>
        <Button variant="destructive">Cancel</Button>
      </div>
    </div>
  )
}
