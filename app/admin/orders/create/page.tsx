"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import OrderForm from "@/components/admin/orders/OrderForm"
import { Button } from "@/components/ui/button"
import { mockOrders, type Order } from "@/lib/mock-orders"
import { mockProducts } from "@/lib/mock-products"
import type { OrderItem } from "@/types/order"

export default function CreateOrderPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const fromChatName = searchParams.get("name")
  const fromChat = searchParams.get("fromChat")

  const initialValues = {
    customerName: fromChatName || "",
    customerPhone: searchParams.get("phone") || "",
  }

  const productParam = searchParams.get("products")
  const initialItems: OrderItem[] = productParam
    ? (productParam
        .split(",")
        .map((id) => {
          const product = mockProducts.find((p) => p.id === id)
          if (!product) return null
          return {
            id: `item-${id}-${Date.now()}`,
            productName: product.name,
            size: product.sizes?.[0] || "",
            pattern: "",
            color: product.colors?.[0] || "",
            price: product.price,
            quantity: 1,
            image: product.images?.[0] || "",
          } as OrderItem
        })
        .filter(Boolean) as OrderItem[])
    : []

  const handleSave = (data: {
    customerName: string
    customerPhone: string
    items: any[]
    discount: number
    deposit: number
    total: number
    totalDue: number
    note: string
  }) => {
    const newOrder = {
      id: `ORD-${String(mockOrders.length + 1).padStart(3, "0")}`,
      customerId: "0",
      customerName: data.customerName,
      customerEmail: "",
      items: data.items,
      total: data.total,
      status: "pendingPayment" as const,
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
    } as Order

    mockOrders.push(newOrder)
    router.push("/admin/orders")
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
          <h1 className="text-3xl font-bold">สร้างคำสั่งซื้อ</h1>
        </div>
        {fromChat && (
          <p className="text-sm text-gray-500 mb-6">เปิดจากลูกค้า: {fromChatName}</p>
        )}
        <OrderForm
          onSave={handleSave}
          initialValues={initialValues}
          initialItems={initialItems}
        />
      </div>
    </div>
  )
}
