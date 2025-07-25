"use client"
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { useBillStore } from '@/core/store'
import { useBillById } from '@/hooks/useBillById'
import { carriers } from '@/config/carriers'
import PaymentConfirmationCard from '@/components/bill/PaymentConfirmationCard'

export default function AdminBillDetailPage({ params }: { params: { billId: string } }) {
  const bill = useBillById(params.billId)
  const store = useBillStore()
  const { toast } = useToast()
  const [status, setStatus] = useState<'waiting' | 'cutting' | 'sewing' | 'packing' | 'shipped' | 'done'>(bill.productionStatus ?? 'waiting')
  const [note, setNote] = useState('')
  const [tracking, setTracking] = useState(bill.trackingNumber || '')
  const [carrier, setCarrier] = useState<string>(bill.carrier || carriers[0])
  const [receiptUrl, setReceiptUrl] = useState(bill.receiptUrl || '')
  const [receiptNote, setReceiptNote] = useState(bill.receiptNote || '')

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
      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลขนส่ง</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <input
            className="border p-2 w-full"
            placeholder="เลขพัสดุ"
            value={tracking}
            onChange={e => setTracking(e.target.value)}
          />
          <Select value={carrier} onValueChange={setCarrier}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {carriers.map(c => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={() => {
              store.updateBill(bill.id, {
                trackingNumber: tracking,
                carrier,
                shippedAt: new Date().toISOString(),
              })
              store.updateProductionStatus(bill.id, 'shipped', 'บันทึกหมายเลขพัสดุ')
              toast({ title: 'อัปเดตหมายเลขพัสดุแล้ว' })
            }}
          >
            บันทึกหมายเลขพัสดุ
          </Button>
        </CardContent>
      </Card>
      {bill.confirmation && (
        <Card>
          <CardHeader>
            <CardTitle>แจ้งโอนโดยลูกค้า</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <PaymentConfirmationCard confirmation={bill.confirmation} />
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={!!bill.confirmation.verified}
                onChange={e => {
                  const verified = e.target.checked
                  store.updateBill(bill.id, { confirmation: { ...bill.confirmation, verified } })
                  toast({ title: 'บันทึกแล้ว' })
                }}
              />
              <span>ตรวจสอบแล้ว</span>
            </label>
            <Button
              onClick={() => {
                store.updateStatus(bill.id, 'paid')
                toast({ title: 'ยืนยันรับยอด' })
              }}
            >
              ยืนยันรับยอด
            </Button>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle>แนบใบเสร็จ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <input
            type="file"
            accept="application/pdf,image/*"
            onChange={e => {
              const f = e.target.files?.[0]
              if (f) {
                const reader = new FileReader()
                reader.onload = () => setReceiptUrl(reader.result as string)
                reader.readAsDataURL(f)
              }
            }}
          />
          <input
            className="border p-2 w-full"
            placeholder="หรือใส่ลิงก์ใบเสร็จ"
            value={receiptUrl}
            onChange={e => setReceiptUrl(e.target.value)}
          />
          <Textarea
            placeholder="หมายเหตุ"
            value={receiptNote}
            onChange={e => setReceiptNote(e.target.value)}
          />
          <Button
            onClick={() => {
              store.updateBill(bill.id, { receiptUrl, receiptNote })
              fetch('/api/bill/update-receipt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ billId: bill.id, receiptUrl, receiptNote }),
              })
              toast({ title: 'แนบใบเสร็จสำเร็จ' })
            }}
          >
            บันทึกใบเสร็จ
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>อัปเดตสถานะผลิต</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Select value={status} onValueChange={v => setStatus(v as typeof status)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="waiting">รอคิว</SelectItem>
              <SelectItem value="cutting">ตัดผ้า</SelectItem>
              <SelectItem value="sewing">เย็บ</SelectItem>
              <SelectItem value="packing">แพ็ค</SelectItem>
              <SelectItem value="shipped">จัดส่ง</SelectItem>
              <SelectItem value="done">เสร็จ</SelectItem>
            </SelectContent>
          </Select>
          <Textarea value={note} onChange={e => setNote(e.target.value)} />
          <Button
            onClick={() => {
              store.updateProductionStatus(bill.id, status, note)
              toast({ title: 'อัปเดตสถานะแล้ว' })
              setNote('')
            }}
          >
            อัปเดตสถานะ
          </Button>
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
