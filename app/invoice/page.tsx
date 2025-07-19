"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { mockBills } from "@/lib/mock-bills"
import { mockOrders } from "@/core/mock/orders"
import { loadAutoArchive, autoArchive } from "@/lib/mock-settings"
import { format } from "date-fns"

export default function InvoiceListPage() {
  const [bills, setBills] = useState(mockBills)

  useEffect(() => {
    loadAutoArchive()
    setBills([...mockBills])
  }, [])

  const filtered = bills.filter((b) => {
    if (!autoArchive) return true
    const order = mockOrders.find((o) => o.id === b.orderId)
    if (b.status === "paid" || order?.demo) return true
    if (b.status === "unpaid") {
      return new Date(b.createdAt).getTime() >=
        Date.now() - 14 * 24 * 60 * 60 * 1000
    }
    return true
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">รายการบิล</h1>
        <Card>
          <CardHeader>
            <CardTitle>บิลทั้งหมด</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {filtered.map((b) => (
              <div key={b.id} className="flex items-center justify-between border-b py-2">
                <div className="flex-1">{b.id}</div>
                <div className="flex-1">{b.orderId}</div>
                <div className="flex-1">{format(new Date(b.createdAt), "yyyy-MM-dd")}</div>
                <div className="flex-1 text-right">
                  <Link href={`/bill/${b.id}`}>
                    <Button variant="outline" size="sm">เปิด</Button>
                  </Link>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-sm text-gray-500">ไม่พบข้อมูล</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
