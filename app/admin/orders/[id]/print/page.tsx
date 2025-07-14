"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, PrinterIcon as Print } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent } from "@/components/ui/cards/card"
import { toast } from "sonner"
import { mockOrders } from "@/lib/mock-orders"
import { getPayment } from "@/lib/mock/payment"

export default function AdminOrderPrintPage({ params }: { params: { id: string } }) {
  const { id } = params
  const searchParams = useSearchParams()
  const fromChatName = searchParams.get("fromChat")

  const order = mockOrders.find((o) => o.id === id)
  const payment = getPayment(id)

  const paid = payment?.amount ?? 0
  const remaining = order ? order.total - paid : 0

  const handlePrint = () => {
    try {
      if (typeof window !== "undefined") {
        window.print()
      }
    } catch {
      toast.error("Print failed")
    }
  }

  const handleExport = () => {
    try {
      if (Math.random() < 0.05) throw new Error("fail")
      toast.success("PDF exported (mock)")
    } catch {
      toast.error("Export failed")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="print:hidden bg-white border-b px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={`/admin/orders/${id}`}>
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Order {id}</h1>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handlePrint}>
              <Print className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" onClick={handleExport}>
              Export PDF (mock)
            </Button>
          </div>
        </div>
        {fromChatName && (
          <div className="container mx-auto mt-2">
            <p className="text-sm text-gray-500">Opened from: {fromChatName}</p>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-8 print:p-0">
        <Card className="max-w-3xl mx-auto print:shadow-none print:border-none">
          <CardContent className="space-y-4 p-8 print:p-6">
            {order ? (
              <>
                <div className="space-y-1">
                  <p className="font-semibold">{order.customerName}</p>
                  <p>{order.shippingAddress.phone}</p>
                </div>
                <div className="border-t pt-4 space-y-2">
                  {order.items.map((it, i) => (
                    <div key={i} className="flex justify-between">
                      <span>{it.productName}</span>
                      <span>
                        {it.quantity} x ฿{it.price.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 space-y-1 text-right">
                  <p>รวม: ฿{order.total.toLocaleString()}</p>
                  <p>ชำระแล้ว: ฿{paid.toLocaleString()}</p>
                  <p>คงเหลือ: ฿{remaining.toLocaleString()}</p>
                </div>
                {order.note && <p>หมายเหตุ: {order.note}</p>}
                <p>สถานะ: {order.status}</p>
              </>
            ) : (
              <p className="text-center">Order not found</p>
            )}
          </CardContent>
        </Card>
        {!order && (
          <div className="mt-4 text-center">
            <Link href="/admin/orders" className="text-blue-600 underline">
              Back to orders
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
