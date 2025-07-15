"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import { mockOrders } from "@/lib/mock-orders"

export default function OrderTrackEntryPage() {
  const [orderId, setOrderId] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!orderId) return
    if (mockOrders.some((o) => o.id === orderId)) {
      router.push(`/order-track/${orderId}`)
    } else {
      setError("ไม่พบบิลนี้ในระบบ")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>ติดตามคำสั่งซื้อ</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="หมายเลขคำสั่งซื้อ"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <Button type="submit" className="w-full">
                เช็คสถานะ
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
