"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import OrderForm from "@/components/admin/orders/OrderForm"
import { Button } from "@/components/ui/button"
import { mockOrders } from "@/lib/mock-orders"

export default function CreateOrderPage() {
  const router = useRouter()

  const handleSave = (data: {
    customerName: string
    customerPhone: string
    items: any[]
    deposit: number
    note: string
  }) => {
    const total = data.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    )
    const newOrder = {
      id: `ORD-${String(mockOrders.length + 1).padStart(3, "0")}`,
      customerId: "0",
      customerName: data.customerName,
      customerEmail: "",
      items: data.items,
      total,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
      shippingAddress: {
        name: data.customerName,
        address: "",
        city: "",
        postalCode: "",
        phone: data.customerPhone,
      },
      depositPercent: data.deposit,
      note: data.note,
    } as any

    mockOrders.push(newOrder)
    router.push("/admin/orders")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin/orders">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">สร้างคำสั่งซื้อ</h1>
        </div>
        <OrderForm onSave={handleSave} />
      </div>
    </div>
  )
}
