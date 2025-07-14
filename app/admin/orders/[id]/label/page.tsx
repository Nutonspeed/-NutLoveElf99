"use client"
import Link from "next/link"
import { ArrowLeft, PrinterIcon as Print } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent } from "@/components/ui/cards/card"
import { mockOrders } from "@/lib/mock-orders"

export default function AdminOrderLabelPage({ params }: { params: { id: string } }) {
  const order = mockOrders.find((o) => o.id === params.id)
  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">ไม่พบออเดอร์</div>
    )
  }

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print()
  }

  const address = order.shippingAddress

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="print:hidden flex items-center justify-between mb-4">
        <Link href={`/admin/orders/${order.id}`}>\
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <Button variant="outline" onClick={handlePrint}>
          <Print className="mr-2 h-4 w-4" /> พิมพ์
        </Button>
      </div>
      <Card className="max-w-md mx-auto print:border-none">
        <CardContent className="p-6 space-y-2 text-sm">
          <p className="font-bold text-lg">ใบจ่าหน้า</p>
          <p>{address.name}</p>
          <p>{address.address}</p>
          <p>{address.city} {address.postalCode}</p>
          <p>โทร {address.phone}</p>
          <p className="pt-4">เลขพัสดุ: {order.tracking_number || '-'}</p>
        </CardContent>
      </Card>
    </div>
  )
}
