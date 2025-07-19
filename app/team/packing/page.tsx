"use client"
import { useState } from "react"
import { mockOrders } from "@/core/mock/orders"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"

interface PickItem {
  key: string
  name: string
  quantity: number
}

export default function PackingPage() {
  const [items, setItems] = useState<PickItem[]>([])

  const generate = () => {
    const orders = mockOrders.filter(
      (o) => o.status === "paid" && o.shipping_status === "pending",
    )
    const map = new Map<string, PickItem>()
    orders.forEach((o) => {
      o.items.forEach((it) => {
        const key = `${it.productId}-${it.size}-${it.color}`
        const existing = map.get(key)
        if (existing) {
          existing.quantity += it.quantity
        } else {
          map.set(key, {
            key,
            name: it.productName,
            quantity: it.quantity,
          })
        }
      })
    })
    setItems(Array.from(map.values()))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 space-y-4">
        <h1 className="text-2xl font-bold">รายการแพ็กวันนี้</h1>
        <Button onClick={generate}>รวมสินค้าที่ต้องแพ็กวันนี้</Button>
        {items.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Pick List</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {items.map((it) => (
                <div key={it.key} className="flex justify-between border-b py-1">
                  <span>{it.name}</span>
                  <span>{it.quantity}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
      <Footer />
    </div>
  )
}
