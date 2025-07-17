"use client"

import React, { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/buttons/button"
import { OrderItemsRepeater } from "@/components/OrderItemsRepeater"
import { OrderSummary } from "@/components/order/order-summary"
import type { OrderItem } from "@/types/order"
import { supabase } from "@/lib/supabase"
import { mockProducts } from "@/lib/mock-products"

export default function NewOrderPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultProduct = searchParams.get("product")
  const [items, setItems] = useState<OrderItem[]>([])
  const [discount, setDiscount] = useState(0)
  const [shippingCost, setShippingCost] = useState(0)
  const [tax, setTax] = useState(0)

  // Preload item if product query provided
  React.useEffect(() => {
    if (defaultProduct) {
      const p = mockProducts.find((m) => m.slug === defaultProduct)
      if (p) {
        setItems([
          {
            id: `item-${Date.now()}`,
            productName: p.name,
            size: p.sizes[0] || "",
            pattern: "",
            color: p.colors[0] || "",
            price: p.price,
            quantity: 1,
            image: p.images[0] || "",
          },
        ])
      }
    }
  }, [defaultProduct])

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal - discount + shippingCost + tax

  const createOrder = async () => {
    const order = {
      id: `o-${Date.now()}`,
      items,
      subtotal,
      discount,
      shippingCost,
      tax,
      total,
      createdAt: new Date().toISOString(),
    }
    try {
      if (supabase) {
        await supabase.from("orders").insert({ id: order.id, data: JSON.stringify(order) })
      } else if (typeof window !== "undefined") {
        const existing = JSON.parse(localStorage.getItem("orders") || "[]")
        existing.push(order)
        localStorage.setItem("orders", JSON.stringify(existing))
      }
      router.push(`/orders/${order.id}`)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1 space-y-6">
        <h1 className="text-3xl font-bold mb-4">สร้างบิลใหม่</h1>
        <OrderItemsRepeater items={items} onItemsChange={setItems} />
        <OrderSummary
          items={items}
          discount={discount}
          shippingCost={shippingCost}
          tax={tax}
          onDiscountChange={setDiscount}
          onShippingCostChange={setShippingCost}
          onTaxChange={setTax}
        />
        <Button className="w-full" onClick={createOrder}>สร้างบิล</Button>
      </div>
      <Footer />
    </div>
  )
}
