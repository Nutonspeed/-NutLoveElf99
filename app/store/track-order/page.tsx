"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { orders } from "@/mock/orders"

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("")
  const [status, setStatus] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  const search = () => {
    const o = orders.find(o => o.id === orderId.trim())
    if (o) {
      setStatus(o.status)
      setNotFound(false)
    } else {
      setStatus(null)
      setNotFound(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>ติดตามออเดอร์</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              value={orderId}
              onChange={e => setOrderId(e.target.value)}
              placeholder="หมายเลขออเดอร์"
            />
            <Button onClick={search}>ค้นหา</Button>
            {status && <p>สถานะ: {status}</p>}
            {notFound && <p>ไม่พบออเดอร์</p>}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
