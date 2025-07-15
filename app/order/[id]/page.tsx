"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { supabase } from "@/lib/supabase"

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>()
  const { id } = params
  const [order, setOrder] = useState<any | null>(null)

  useEffect(() => {
    const load = async () => {
      if (supabase) {
        const { data } = await supabase.from("orders").select("data").eq("id", id).single()
        if (data) setOrder(JSON.parse(data.data as string))
      } else if (typeof window !== "undefined") {
        const orders = JSON.parse(localStorage.getItem("orders") || "[]")
        setOrder(orders.find((o: any) => o.id === id) || null)
      }
    }
    load()
  }, [id])

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        กำลังโหลดข้อมูล...
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>บิล {order.id}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {order.items.map((item: any) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.productName} x {item.quantity}
                  {item.location && (
                    <span className="text-sm text-gray-500"> (คลัง {item.location})</span>
                  )}
                </span>
                <span>฿{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t pt-4 space-y-1">
              <div className="flex justify-between">
                <span>ส่วนลด</span>
                <span>฿{order.discount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>ค่าจัดส่ง</span>
                <span>฿{order.shippingCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>ภาษี</span>
                <span>฿{order.tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>รวม</span>
                <span>฿{order.total.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
