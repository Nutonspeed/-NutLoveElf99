"use client"

import Link from "next/link"
import { ArrowLeft, PrinterIcon as Print } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent } from "@/components/ui/cards/card"
import BillPreview from "@/components/BillPreview"
import { getBill } from "@/lib/mock-bills"
import { mockOrders } from "@/lib/mock-orders"

interface BillPrintPageProps {
  params: { id: string }
}

export default function BillPrintPage({ params }: BillPrintPageProps) {
  const { id } = params
  const bill = getBill(id)
  const order = bill ? mockOrders.find((o) => o.id === bill.orderId) : null

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print()
    }
  }

  if (!bill || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">ไม่พบข้อมูลบิล</h1>
          <Link href="/orders" className="text-primary underline">
            กลับไปหน้าคำสั่งซื้อ
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="print:hidden bg-white border-b px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={`/bill/${id}`}> 
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">บิล {bill.id}</h1>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handlePrint}>
              <Print className="mr-2 h-4 w-4" />
              พิมพ์
            </Button>
          </div>
        </div>
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
