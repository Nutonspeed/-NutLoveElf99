"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, PrinterIcon as Print, Copy } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Label } from "@/components/ui/label"
import BillPreview from "@/components/BillPreview"
import { OrderTimeline } from "@/components/order/OrderTimeline"
import { mockOrders } from "@/lib/mock-orders"
import { getBill, addBillPayment } from "@/lib/mock-bills"
import { getBill as getAdminBill } from "@/mock/bills"
import { getQuickBill, getBillLink } from "@/lib/mock-quick-bills"
import { billSecurity } from "@/lib/mock-settings"
import ErrorBoundary from "@/components/ErrorBoundary"
import EmptyState from "@/components/EmptyState"
import { Badge } from "@/components/ui/badge"
import { getMockNow } from "@/lib/mock-date"

export default function BillPage({ params }: { params: { id: string } }) {
  const { id } = params
  const bill = getBill(id)
  const quickBill = getQuickBill(id)
  const simpleBill = getAdminBill(id)
  const order = mockOrders.find((o) => o.id === bill?.orderId)
  const [access, setAccess] = useState(!billSecurity.enabled)
  const [code, setCode] = useState("")
  const [amount, setAmount] = useState("")
  const [slip, setSlip] = useState<File | null>(null)
  const [reason, setReason] = useState(bill?.abandonReason || "")

  if (simpleBill) {
    const sum = simpleBill.items.reduce(
      (s, it) => s + it.price * it.quantity,
      0,
    )
    const total = sum + simpleBill.shipping
    return (
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-bold text-center">บิล {simpleBill.id}</h1>
        <div className="max-w-md mx-auto border rounded-lg p-4 space-y-2">
          {simpleBill.items.map((it, i) => (
            <div key={i} className="flex justify-between">
              <span>
                {it.name} × {it.quantity}
              </span>
              <span>฿{(it.price * it.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between border-t pt-2">
            <span>ค่าจัดส่ง</span>
            <span>฿{simpleBill.shipping.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>ยอดรวม</span>
            <span>฿{total.toLocaleString()}</span>
          </div>
        </div>
        {simpleBill.note && (
          <p className="text-sm text-center">หมายเหตุ: {simpleBill.note}</p>
        )}
        <div className="text-center">
          <Button onClick={() => alert('ส่งบิลใหม่แทนใบเดิม (mock)')}>
            ส่งบิลใหม่แทนใบเดิม
          </Button>
        </div>
      </div>
    )
  }

  const baseDate = new Date(bill?.dueDate || bill?.createdAt || '')
  const expired =
    bill &&
    bill.status !== "paid" &&
    getMockNow().getTime() > baseDate.getTime() + 3 * 24 * 60 * 60 * 1000

  if (!bill && !quickBill) {
    if (!getBillLink(id)) {
      if (typeof window !== "undefined") {
        window.location.replace("/bill/unknown")
      }
      return null
    }
    if (typeof window !== "undefined") {
      setTimeout(() => window.location.replace('/chat'), 3000)
    }
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p>ไม่พบข้อมูลบิล อาจถูกลบหรือหมดอายุ</p>
          <Link href="/chat" className="text-primary underline">
            ไปที่แชท
          </Link>
        </div>
      </div>
    )
  }

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print()
    }
  }

  const handleDownload = () => {
    alert("ดาวน์โหลดบิล (ฟีเจอร์นี้จะพัฒนาในอนาคต)")
  }

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const handleVerify = () => {
    if (code === billSecurity.phone || code === billSecurity.pin) {
      setAccess(true)
    } else {
      alert("ข้อมูลไม่ถูกต้อง")
    }
  }

  const handleSendSlip = () => {
    if (!bill) return
    addBillPayment(bill.id, {
      id: `pay-${Date.now()}`,
      date: new Date().toISOString(),
      amount: parseFloat(amount) || 0,
      slip: slip?.name,
    })
    setAmount("")
    setSlip(null)
    alert("ส่งข้อมูลแล้ว")
  }

  if (!access) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-4">
          <div>
            <Label htmlFor="code">เบอร์โทรหรือ PIN</Label>
            <Input id="code" value={code} onChange={(e) => setCode(e.target.value)} />
          </div>
          <Button onClick={handleVerify}>ยืนยัน</Button>
        </div>
      </div>
    )
  }

  if (quickBill && !bill) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold">บิล {quickBill.id}</h1>
        <p>{quickBill.customerName}</p>
        <img src="/placeholder.svg" alt="QR" className="w-40 h-40" />
        <Button asChild>
          <a href="/placeholder.svg" download>
            ดาวน์โหลด QR
          </a>
        </Button>
      </div>
    )
  }

  return (
    <ErrorBoundary>
    <div className="min-h-screen bg-gray-50">
      <div className="print:hidden bg-white border-b px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/orders">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
              <h1 className="text-xl font-semibold">บิล {order?.id}</h1>
              <Badge variant="secondary">{bill?.status}</Badge>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handlePrint}>
              <Print className="mr-2 h-4 w-4" />
              พิมพ์
            </Button>
            <Button variant="outline" onClick={handleCopy}>
              <Copy className="mr-2 h-4 w-4" />
              คัดลอกลิงก์
            </Button>
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              ดาวน์โหลด PDF
            </Button>
            <Link href="/admin/chat">
              <Button variant="outline">เปิดแชท</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 print:p-0">
        <Card className="max-w-4xl mx-auto print:shadow-none print:border-none">
          <CardContent className="p-8 print:p-6 space-y-6">
              {order && <BillPreview order={order} />}
            <div className="flex justify-center">
              <div className="w-40 h-40 bg-gray-200 flex items-center justify-center">QR</div>
            </div>
              <OrderTimeline timeline={order?.timeline ?? []} />
            <div className="space-y-2">
              <Label htmlFor="amt">จำนวนเงินที่โอน</Label>
              <Input id="amt" value={amount} onChange={(e) => setAmount(e.target.value)} />
              <Input type="file" onChange={(e) => setSlip(e.target.files?.[0] ?? null)} />
              <Button onClick={handleSendSlip}>ส่งหลักฐานโอน</Button>
              {expired && !reason && (
                <Button
                  variant="outline"
                  onClick={() => {
                    const r = window.prompt("บอกเหตุผลการไม่ชำระ")
                    if (r) {
                      setReason(r)
                      if (bill) bill.abandonReason = r
                    }
                  }}
                >
                  บอกเหตุผล
                </Button>
              )}
              {reason && <p className="text-sm text-gray-600">เหตุผล: {reason}</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </ErrorBoundary>
  )
}

