"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, PrinterIcon as Print } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent } from "@/components/ui/cards/card"
import BillPreview from "@/components/BillPreview"
import { mockOrders } from "@/lib/mock-orders"

export default function AdminOrderPrintPage({ params }: { params: { id: string } }) {
  const { id } = params
  const searchParams = useSearchParams()
  const fromChatName = searchParams.get("fromChat")

  const order = mockOrders.find((o) => o.id === id)

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ไม่พบบิล</h1>
          <Link href="/admin/orders">
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="print:hidden bg-white border-b px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={`/admin/orders/${order.id}`}>
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
          </div>
        </div>
        {fromChatName && (
          <div className="container mx-auto mt-2">
            <p className="text-sm text-gray-500">เปิดจากลูกค้า: {fromChatName}</p>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-8 print:p-0">
        <Card className="max-w-4xl mx-auto print:shadow-none print:border-none">
          <CardContent className="p-8 print:p-6">
            <BillPreview order={order} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
