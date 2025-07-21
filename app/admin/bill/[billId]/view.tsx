"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Button } from "@/components/ui/buttons/button"
import { Badge } from "@/components/ui/badge"
import type { AdminBill } from "@/mock/bills"
import { useBillStore } from "@/core/store"
import { generateReceiptPDF } from "@/lib/pdf/receipt"
import { exportPDF } from "@/lib/pdf/export"
import { Star } from "lucide-react"

export default function AdminBillViewPage({ params }: { params: { billId: string } }) {
  const store = useBillStore()
  const [bill, setBill] = useState<AdminBill | undefined>(() =>
    store.bills.find((b) => b.id === params.billId),
  )

  useEffect(() => {
    store.refresh()
    setBill(store.bills.find((b) => b.id === params.billId))
  }, [params.billId, store])

  if (!bill) {
    return <div className="p-4">ไม่พบข้อมูลบิล</div>
  }

  const subtotal = bill.items.reduce((sum, it) => sum + it.price * it.quantity, 0)
  const discount = (bill as any).discount || 0
  const total = subtotal - discount + bill.shipping

  const handleDownload = async () => {
    const data = {
      id: bill.id,
      customer: { name: bill.customer, address: '-', phone: '-' },
      items: bill.items,
      shipping: bill.shipping,
      discount,
      note: bill.note,
    }
    const qr = `${window.location.origin}/receipt/${bill.id}`
    const blob = await generateReceiptPDF(data as any, { mock: true, qr })
    exportPDF(blob, `receipt-${bill.id}.pdf`)
  }

  return (
    <div className="space-y-6" data-testid="bill-detail">
      <div className="flex flex-wrap items-center gap-2">
        <Link href="/admin/bills">
          <Button variant="outline">← กลับ</Button>
        </Link>
        <h1 className="text-2xl font-bold">บิล {bill.id}</h1>
        {bill.status === 'paid' && (
          <Button onClick={handleDownload}>
            ดาวน์โหลดใบเสร็จ/ใบกำกับภาษี (PDF)
          </Button>
        )}
      </div>

      <Card data-testid="customer-info">
        <CardHeader>
          <CardTitle>ข้อมูลลูกค้า</CardTitle>
        </CardHeader>
        <CardContent>{bill.customer}</CardContent>
      </Card>

      <Card data-testid="items-list">
        <CardHeader>
          <CardTitle>รายการสินค้า</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {bill.items.map((it, i) => (
            <div key={i} className="flex justify-between">
              <span>
                {it.name} × {it.quantity}
              </span>
              <span>฿{(it.price * it.quantity).toLocaleString()}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card data-testid="summary">
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

      <Card data-testid="payment-method">
        <CardHeader>
          <CardTitle>วิธีชำระเงิน</CardTitle>
        </CardHeader>
        <CardContent>โอนชำระ</CardContent>
      </Card>

      <Card data-testid="shipping-method">
        <CardHeader>
          <CardTitle>การจัดส่ง</CardTitle>
        </CardHeader>
        <CardContent>
          <p>ขนส่งเอกชน</p>
          <p>Tracking: -</p>
        </CardContent>
      </Card>

      <Card data-testid="status">
        <CardHeader>
          <CardTitle>สถานะ</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2 items-center">
          <Badge>{bill.status}</Badge>
          {bill.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </CardContent>
      </Card>
      {bill.feedback && (
        <Card>
          <CardHeader>
            <CardTitle>Feedback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${bill.feedback?.rating && i < bill.feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
              {bill.feedback.date && (
                <span className="ml-2 text-xs text-gray-500">
                  {new Date(bill.feedback.date).toLocaleDateString()}
                </span>
              )}
            </div>
            {bill.feedback.message && <p className="text-sm">{bill.feedback.message}</p>}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
