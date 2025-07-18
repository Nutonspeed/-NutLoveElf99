"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import OrderForm from "@/components/admin/orders/OrderForm"
import { Button } from "@/components/ui/buttons/button"
import { mockOrders } from "@/lib/mock-orders"
import type { Order } from "@/types/order"
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
    shipping_status: order.shipping_status,
    delivery_method: order.delivery_method,
    tracking_number: order.tracking_number,
    shipping_fee: order.shipping_fee,
    shipping_date: order.shipping_date,
    delivery_note: order.delivery_note,
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
    shipping_status: ShippingStatus
    delivery_method: string
    tracking_number: string
    shipping_fee: number
    shipping_date: string
    delivery_note: string
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
      shipping_status: data.shipping_status,
      delivery_method: data.delivery_method,
      tracking_number: data.tracking_number,
      shipping_fee: data.shipping_fee,
      shipping_date: data.shipping_date,
      delivery_note: data.delivery_note,
      timeline: order.timeline,
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
