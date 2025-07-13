"use client"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockOrders } from "@/lib/mock-orders"
import { autoMessage, loadAutoMessage } from "@/lib/mock-settings"
import { useEffect, useState } from "react"

export default function SuccessPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [message, setMessage] = useState(autoMessage)
  useEffect(() => {
    loadAutoMessage()
    setMessage(autoMessage)
  }, [])
  const order = mockOrders.find((o) => o.id === id)
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>การชำระเงินสำเร็จ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p>{message}</p>
            <div className="flex justify-center">
              <div className="w-40 h-40 bg-gray-200 flex items-center justify-center">
                QR {id}
              </div>
            </div>
            <p className="font-semibold">รหัสคำสั่งซื้อ: {id}</p>
            <div className="space-x-2">
              <Link href={`/orders/${id}`}>
                <Button>ดูคำสั่งซื้อ</Button>
              </Link>
              {order && (
                <Link href={`/invoice/${id}`}>
                  <Button variant="outline">ดูใบเสร็จ</Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
