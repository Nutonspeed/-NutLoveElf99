"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Download, PrinterIcon as Print } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent } from "@/components/ui/cards/card"
import BillPreview from "@/components/BillPreview"
import { orderDb } from "@/lib/order-database"
import type { ManualOrder, Order } from "@/types/order"
import { downloadPDF, getReceiptFileName } from "@/lib/mock-export"

interface PublicBillPageProps {
  params: {
    publicLink: string
  }
}

export default function PublicBillPage({ params }: PublicBillPageProps) {
  const [order, setOrder] = useState<ManualOrder | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadOrder()
  }, [params.publicLink])

  const loadOrder = async () => {
    try {
      const data = await orderDb.getManualOrderByPublicLink(params.publicLink)
      if (!data) {
        setError("ไม่พบบิลที่ระบุ")
        return
      }
      setOrder(data)
    } catch (err) {
      setError("ไม่สามารถโหลดข้อมูลบิลได้")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">กำลังโหลดข้อมูล...</div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ไม่พบบิล</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  const mappedOrder: Order = {
    id: order.orderNumber,
    customerId: "",
    customerName: order.customerName,
    customerEmail: order.customerEmail || "",
    items: order.items.map((item) => ({
      productId: item.id,
      productName: item.productName,
      quantity: item.quantity,
      price: item.price,
      size: item.size,
      color: item.color,
    })),
    total: order.total,
    status: order.status,
    createdAt: order.createdAt,
    shippingAddress: {
      name: order.customerName,
      address: order.customerAddress || "",
      city: "",
      postalCode: "",
      phone: order.customerPhone,
    },
    delivery_method: "",
    tracking_number: "",
    shipping_fee: order.shippingCost,
    shipping_status: "pending",
    shipping_date: "",
    delivery_note: "",
    depositPercent: 100,
    note: order.notes,
    timeline: order.timeline,
  }

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print()
    }
  }

  const handleDownload = () => {
    const name = getReceiptFileName(mappedOrder.id)
    downloadPDF('receipt', name)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="print:hidden bg-white border-b px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">บิล {mappedOrder.id}</h1>
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
          <CardContent className="p-8 print:p-6">
            <BillPreview order={mappedOrder} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
