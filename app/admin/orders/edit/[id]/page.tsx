"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import OrderForm from "@/components/admin/orders/OrderForm"
import { Button } from "@/components/ui/button"
import { mockOrders, type Order } from "@/data/mock-orders"
import type { OrderItem, ShippingStatus } from "@/types/order"

export default function EditOrderPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const orderIndex = mockOrders.findIndex((o) => o.id === params.id)
  const order = mockOrders[orderIndex]

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        ไม่พบคำสั่งซื้อ
      </div>
    )
  }

  const initialValues = {
    customerName: order.customerName,
    customerPhone: order.shippingAddress.phone,
    shippingStatus: order.shippingStatus,
    shippingProvider: order.shippingProvider,
    trackingNumber: order.trackingNumber,
  }

  const initialItems: OrderItem[] = order.items.map((item, idx) => ({
    id: `${item.productId}-${idx}`,
    productName: item.productName,
    size: item.size || "",
    pattern: "",
    color: item.color || "",
    price: item.price,
    quantity: item.quantity,
    image: "",
  }))

  const handleSave = (data: {
    customerName: string
    customerPhone: string
    items: OrderItem[]
    discount: number
    deposit: number
    total: number
    totalDue: number
    note: string
    shippingStatus: ShippingStatus
    shippingProvider: string
    trackingNumber: string
  }) => {
    const updated: Order = {
      ...order,
      customerName: data.customerName,
      items: data.items.map((i) => ({
        productId: i.id,
        productName: i.productName,
        quantity: i.quantity,
        price: i.price,
        size: i.size,
        color: i.color,
      })),
      total: data.total,
      depositPercent: data.deposit,
      note: data.note,
      shippingAddress: {
        ...order.shippingAddress,
        name: data.customerName,
        phone: data.customerPhone,
      },
      shippingStatus: data.shippingStatus,
      shippingProvider: data.shippingProvider,
      trackingNumber: data.trackingNumber,
    }
    mockOrders[orderIndex] = updated
    router.push(`/admin/orders/${order.id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-2">
          <Link href="/admin/orders">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">แก้ไขคำสั่งซื้อ</h1>
        </div>
        <OrderForm
          onSave={handleSave}
          initialValues={initialValues}
          initialItems={initialItems}
        />
      </div>
    </div>
  )
}
