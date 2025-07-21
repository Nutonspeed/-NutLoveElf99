"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Button } from "@/components/ui/buttons/button"
import { Badge } from "@/components/ui/badge"
import ModalWrapper from "@/components/ui/ModalWrapper"
import LazyImage from "@/components/LazyImage"
import { toast } from "sonner"
import type { AdminBill } from "@/mock/bills"
import { paymentConfirmations, type PaymentConfirmation } from "@/mock/paymentConfirmations"
import { useBillStore } from "@/core/store"

export default function AdminBillViewPage({ params }: { params: { billId: string } }) {
  const store = useBillStore()
  const [bill, setBill] = useState<AdminBill | undefined>(() =>
    store.bills.find((b) => b.id === params.billId),
  )
  const [confirmations, setConfirmations] = useState<PaymentConfirmation[]>(() =>
    [...(paymentConfirmations[params.billId] || [])],
  )
  const [slip, setSlip] = useState<string | null>(null)

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

  const handleConfirm = (id: string) => {
    setConfirmations((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: 'confirmed',
              verifiedBy: 'Admin User',
              verifiedAt: new Date().toISOString(),
            }
          : c,
      ),
    )
    store.updateStatus(bill.id, 'paid')
    toast.success('อัปเดตสถานะบิลเรียบร้อย')
  }

  return (
    <div className="space-y-6" data-testid="bill-detail">
      <div className="flex items-center space-x-2">
        <Link href="/admin/bills">
          <Button variant="outline">← กลับ</Button>
        </Link>
        <h1 className="text-2xl font-bold">บิล {bill.id}</h1>
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

      <div>
        <h2 className="text-lg font-bold">แจ้งชำระเงินจากลูกค้า</h2>
        <div className="space-y-4 mt-2">
          {[...confirmations]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((c) => (
              <Card key={c.id} className="space-y-2 p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1 text-sm">
                    <div>วันที่แจ้ง: {new Date(c.date).toLocaleString()}</div>
                    <div>จำนวนเงิน: ฿{c.amount.toLocaleString()}</div>
                    <div>ช่องทาง: {c.method}</div>
                    {c.verifiedBy && (
                      <div>
                        ยืนยันโดย {c.verifiedBy} เมื่อ{' '}
                        {c.verifiedAt && new Date(c.verifiedAt).toLocaleString()}
                      </div>
                    )}
                  </div>
                  <Badge className={c.status === 'confirmed' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}>
                    {c.status === 'confirmed' ? 'ยืนยันแล้ว' : 'รอตรวจสอบ'}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  {c.slip && (
                    <Button variant="outline" size="sm" onClick={() => setSlip(c.slip!)}>
                      ดูสลิป
                    </Button>
                  )}
                  {c.status === 'pending' && (
                    <Button size="sm" onClick={() => handleConfirm(c.id)}>
                      ยืนยันการชำระเงิน
                    </Button>
                  )}
                </div>
              </Card>
            ))}
        </div>
      </div>

      <ModalWrapper open={!!slip} onClose={() => setSlip(null)}>
        {slip && <LazyImage src={slip} alt="slip" width={400} height={400} />}
      </ModalWrapper>
    </div>
  )
}
