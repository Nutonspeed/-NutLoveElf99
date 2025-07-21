"use client"
import Link from "next/link"
import { ArrowLeft, PrinterIcon as Print } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent } from "@/components/ui/cards/card"
import { mockOrders } from "@/lib/mock-orders"

export default function AdminInvoicePrintPage({ params }: { params: { id: string } }) {
  const { id } = params
  const order = mockOrders.find((o) => o.id === id)

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="print:hidden bg-white border-b px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/invoices">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">บิล {id}</h1>
          </div>
          <Button variant="outline" onClick={handlePrint}>
            <Print className="mr-2 h-4 w-4" /> พิมพ์
          </Button>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 print:p-0">
        <Card className="max-w-4xl mx-auto print:shadow-none print:border-none">
          <CardContent className="p-8 print:p-6">
            {order ? (
              <div className="space-y-4">
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
                <div className="border-t pt-4 text-right font-semibold">
                  รวม ฿{order.total.toLocaleString()}
                </div>
              </div>
            ) : (
              <p className="text-center">ไม่พบข้อมูลบิล</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
