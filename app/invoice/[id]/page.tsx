"use client"
import { useEffect } from "react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent } from "@/components/ui/cards/card"
import { Separator } from "@/components/ui/separator"
import { Download, PrinterIcon as Print, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useOrder } from "@/lib/hooks/useOrder"
import { Badge } from "@/components/ui/badge"
import { packingStatusOptions } from "@/types/order"
import { mockBills } from "@/lib/mock-bills"
import { loadAutoReminder, autoReminder } from "@/lib/mock-settings"
import { createClaim } from "@/lib/mock-claims"
import { toast } from "sonner"

export default function InvoicePage({ params }: { params: { id: string } }) {
  const { id } = params
  const { order } = useOrder(id)

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ไม่พบใบเสร็จ</h1>
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
    // In a real app, this would generate and download a PDF
    alert("ดาวน์โหลดใบเสร็จ (ฟีเจอร์นี้จะพัฒนาในอนาคต)")
  }

  const handleClaim = () => {
    const reason = window.prompt('แจ้งปัญหา') || ''
    if (!reason) return
    const image = '/mock/img' + Date.now() + '.jpg'
    createClaim({ orderId: order.id, image, reason })
    alert('ส่งคำขอเคลมแล้ว')
  }

  useEffect(() => {
    loadAutoReminder()
    if (autoReminder) {
      const bill = mockBills.find((b) => b.orderId === order.id)
      if (
        bill &&
        (bill.status === "unpaid" || bill.status === "pending") &&
        bill.dueDate &&
        new Date(bill.dueDate).getTime() < Date.now() - 3 * 24 * 60 * 60 * 1000
      ) {
        toast.warning("บิลนี้เกินกำหนดชำระ")
      }
    }
  }, [order.id])

  const tax = Math.round(order.total * 0.07)
  const subtotal = order.total - tax

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Hidden when printing */}
      <div className="print:hidden bg-white border-b px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/orders">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">ใบเสร็จ {order.id}</h1>
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
            <Button variant="destructive" onClick={handleClaim}>
              แจ้งเคลม
            </Button>
          </div>
        </div>
      </div>

      {/* Invoice Content */}
      <div className="container mx-auto px-4 py-8 print:p-0">
        <Card className="max-w-4xl mx-auto print:shadow-none print:border-none">
          <CardContent className="p-8 print:p-6">
            {/* Company Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold">SC</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">SofaCover Pro</h2>
                    <p className="text-gray-600">ผ้าคลุมโซฟาคุณภาพพรีเมียม</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>123 ถนนสุขุมวิท แขวงคลองตัน</p>
                  <p>เขตวัฒนา กรุงเทพฯ 10110</p>
                  <p>โทร: 02-123-4567</p>
                  <p>อีเมล: info@sofacover.com</p>
                </div>
              </div>
              <div className="text-right">
                <h1 className="text-3xl font-bold text-primary mb-2">ใบเสร็จ</h1>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>เลขที่:</strong> {order.id}
                  </p>
                  <p>
                    <strong>วันที่:</strong> {new Date(order.createdAt).toLocaleDateString("th-TH")}
                  </p>
                  <p>
                    <strong>ครบกำหนด:</strong> {new Date(order.createdAt).toLocaleDateString("th-TH")}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6 text-right">
              <Badge>
                {packingStatusOptions.find((p) => p.value === order.packingStatus)?.label}
              </Badge>
            </div>

            {/* Customer Info */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-lg mb-3">ลูกค้า</h3>
                <div className="space-y-1 text-sm">
                  <p className="font-medium">{order.customerName}</p>
                  <p>{order.customerEmail}</p>
                  <p>{order.shippingAddress.phone}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">ที่อยู่จัดส่ง</h3>
                <div className="space-y-1 text-sm">
                  <p>{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city} {order.shippingAddress.postalCode}
                  </p>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 font-semibold">รายการ</th>
                    <th className="text-center py-3 font-semibold">จำนวน</th>
                    <th className="text-right py-3 font-semibold">ราคาต่อหน่วย</th>
                    <th className="text-right py-3 font-semibold">รวม</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-4">
                        <div>
                          <p className="font-medium">{item.productName}</p>
                          <div className="text-sm text-gray-600">
                            {item.size && <span>ขนาด: {item.size}</span>}
                            {item.color && <span> | สี: {item.color}</span>}
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-4">{item.quantity}</td>
                      <td className="text-right py-4">฿{item.price.toLocaleString()}</td>
                      <td className="text-right py-4 font-medium">฿{(item.price * item.quantity).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-80">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>ยอดรวมสินค้า:</span>
                    <span>฿{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ภาษีมูลค่าเพิ่ม (7%):</span>
                    <span>฿{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ค่าจัดส่ง:</span>
                    <span>ฟรี</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>ยอดรวมทั้งสิ้น:</span>
                    <span className="text-primary">฿{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center my-8">
              <div className="w-40 h-40 bg-gray-200 flex items-center justify-center">
                QR {order.id}
              </div>
            </div>

            {/* Payment Info */}
            <div className="mt-8 pt-8 border-t">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-2">วิธีการชำระเงิน</h3>
                  <p className="text-sm text-gray-600">บัตรเครดิต/เดบิต</p>
                  <p className="text-sm text-gray-600">สถานะ: ชำระเงินแล้ว</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">หมายเหตุ</h3>
                  <p className="text-sm text-gray-600">ขอบคุณสำหรับการสั่งซื้อ หากมีข้อสงสัยกรุณาติดต่อฝ่ายบริการลูกค้า</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
              <p>ใบเสร็จนี้สร้างขึ้นโดยระบบอัตโนมัติ</p>
              <p>SofaCover Pro - ผู้นำด้านผ้าคลุมโซฟาคุณภาพสูง</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
