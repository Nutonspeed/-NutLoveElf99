"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, PrinterIcon as Print } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import BillPreview from "@/components/BillPreview"
import { OrderTimeline } from "@/components/order/OrderTimeline"
import { mockOrders } from "@/lib/mock-orders"
import { getBill, addBillPayment } from "@/lib/mock-bills"
import { billSecurity } from "@/lib/mock-settings"
import { getMockNow } from "@/lib/mock-date"
import { downloadPDF, getReceiptFileName } from "@/lib/mock-export"

export default function BillPage({ params }: { params: { id: string } }) {
  const { id } = params
  const bill = getBill(id)
  const order = mockOrders.find((o) => o.id === bill?.orderId)
  const [access, setAccess] = useState(!billSecurity.enabled)
  const [code, setCode] = useState("")
  const [amount, setAmount] = useState("")
  const [slip, setSlip] = useState<File | null>(null)
  const [reason, setReason] = useState(bill?.abandonReason || "")

  const baseDate = new Date(bill?.dueDate || bill.createdAt)
  const expired =
    bill.status !== "paid" &&
    getMockNow().getTime() > baseDate.getTime() + 3 * 24 * 60 * 60 * 1000

  if (!bill || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ไม่พบบิล</h1>
          <Link href="/orders">
            <Button>กลับไปหน้าคำสั่งซื้อ</Button>
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
    const name = getReceiptFileName(order?.id)
    downloadPDF('receipt', name)
  }

  const handleVerify = () => {
    if (code === billSecurity.phone || code === billSecurity.pin) {
      setAccess(true)
    } else {
      alert("ข้อมูลไม่ถูกต้อง")
    }
  }

  const handleSendSlip = () => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="print:hidden bg-white border-b px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/orders">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">บิล {order.id}</h1>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handlePrint}>
              <Print className="mr-2 h-4 w-4" />
              พิมพ์
            </Button>
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              ดาวน์โหลด PDF
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 print:p-0">
        <Card className="max-w-4xl mx-auto print:shadow-none print:border-none">
          <CardContent className="p-8 print:p-6 space-y-6">
            <BillPreview order={order} />
            <div className="flex justify-center">
              <div className="w-40 h-40 bg-gray-200 flex items-center justify-center">QR</div>
            </div>
            <OrderTimeline timeline={order.timeline} />
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
                      bill.abandonReason = r
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
  )
}

