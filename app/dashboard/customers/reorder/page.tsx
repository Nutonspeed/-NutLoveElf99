"use client"
import { mockCustomers } from "@/core/mock/customers"
import { orders as mockOrders } from "@/core/mock/orders"
import { Button } from "@/components/ui/buttons/button"
import { useState } from "react"
import { toast } from "sonner"

export default function ReorderCustomersPage() {
  const [customers, setCustomers] = useState([...mockCustomers])
  const ordersByCustomer: Record<string, number> = {}
  mockOrders.forEach(o => {
    ordersByCustomer[o.customer] = (ordersByCustomer[o.customer] || 0) + 1
  })
  const handleSuggest = (name: string) => {
    toast.success(`ส่งข้อเสนอซื้อซ้ำให้ ${name}`)
    setCustomers(prev => {
      const next = prev.map(c => {
        if (c.name === name) {
          const tags = c.tags || []
          if (!tags.includes("เคยซื้อ")) tags.push("เคยซื้อ")
          return { ...c, tags }
        }
        return c
      })
      return next
    })
  }
  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">ลูกค้าที่เคยสั่งซื้อ</h1>
      <div className="space-y-2">
        {customers
          .filter(c => ordersByCustomer[c.name])
          .map(c => (
            <div key={c.id} className="flex items-center justify-between rounded border p-4">
              <div>
                <p className="font-medium">{c.name}</p>
                <p className="text-sm text-muted-foreground">
                  ออเดอร์ {ordersByCustomer[c.name] || 0} ครั้ง
                  {c.tags?.includes("เคยซื้อ") && <span className="ml-2 rounded bg-muted px-2 py-0.5 text-xs">เคยซื้อ</span>}
                </p>
              </div>
              <Button size="sm" onClick={() => handleSuggest(c.name)}>
                เสนอซื้อซ้ำ
              </Button>
            </div>
          ))}
      </div>
    </div>
  )
}
