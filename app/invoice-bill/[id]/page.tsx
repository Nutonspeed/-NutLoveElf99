"use client"
import { getBill } from "@/mock/bills"
import { Card, CardContent } from "@/components/ui/cards/card"

export default function InvoiceBillPage({ params }: { params: { id: string } }) {
  const bill = getBill(params.id)
  if (!bill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        ไม่สามารถสร้างใบแจ้งหนี้ได้
      </div>
    )
  }
  const total = bill.items.reduce((s, it) => s + it.price * it.quantity, 0) + bill.shipping
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">ใบแจ้งหนี้ {bill.id}</h1>
      <Card className="max-w-md mx-auto">
        <CardContent className="p-4 space-y-2">
          {bill.items.map((it, i) => (
            <div key={i} className="flex justify-between">
              <span>
                {it.name} × {it.quantity}
              </span>
              <span>฿{(it.price * it.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between border-t pt-2">
            <span>ค่าจัดส่ง</span>
            <span>฿{bill.shipping.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>ยอดรวม</span>
            <span>฿{total.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>
      {bill.note && <p className="text-sm text-center">หมายเหตุ: {bill.note}</p>}
    </div>
  )
}
