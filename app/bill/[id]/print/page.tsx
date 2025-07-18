"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, PrinterIcon as Print } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent } from "@/components/ui/cards/card"
import BillPreview from "@/components/BillPreview"
import { mockOrders } from "@/lib/mock-orders"
import { getBill } from "@/lib/mock-bills"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function BillPrintPage({ params }: { params: { id: string } }) {
  const { id } = params
  const bill = getBill(id)
  const order = bill ? mockOrders.find((o) => o.id === bill.orderId) : null
  const [font, setFont] = useState<"sm" | "md" | "lg">("md")

  if (!bill || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        ไม่สามารถพิมพ์บิลนี้ได้
      </div>
    )
  }

  const handlePrint = () => {
    try {
      if (typeof window !== "undefined") window.print()
    } catch {
      alert("ไม่สามารถพิมพ์บิลนี้ได้")
    }
  }

  const fontClass = font === "sm" ? "text-sm" : font === "lg" ? "text-lg" : "text-base"

  return (
    <div className={`min-h-screen bg-gray-50 ${fontClass}`}>
      <div className="print:hidden bg-white border-b px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={`/bill/${id}`}>
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">บิล {order.id}</h1>
          </div>
          <div className="flex space-x-2 items-center">
            <Select value={font} onValueChange={(v) => setFont(v as "sm" | "md" | "lg") }>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="ขนาด" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sm">S</SelectItem>
                <SelectItem value="md">M</SelectItem>
                <SelectItem value="lg">L</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handlePrint}>
              <Print className="mr-2 h-4 w-4" /> พิมพ์
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
