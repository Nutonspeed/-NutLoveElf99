"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { mockBills } from "@/lib/mock-bills"
import { getOrders } from "@/core/mock/store"
import type { Bill } from "@/types/bill"
import { getMockNow } from "@/lib/mock-date"

export default function ProfileBillsPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [status, setStatus] = useState("all")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [showHidden, setShowHidden] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  const orders = getOrders()
  const bills = mockBills.filter((b) => {
    const order = orders.find((o) => o.id === b.orderId)
    if (!order || order.customerId !== user?.id) return false
    if (status !== "all" && b.status !== status) return false
    if (from && new Date(b.createdAt) < new Date(from)) return false
    if (to && new Date(b.createdAt) > new Date(to)) return false
    if (!showHidden && (b.status === "cancelled" || isExpired(b))) return false
    return true
  })

  const download = () => {
    alert("ดาวน์โหลด PDF (mock)")
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">ประวัติบิล</h1>
            <p className="text-gray-600">ดูสถานะการชำระเงินของคุณ</p>
          </div>
          <div className="flex gap-2 items-center">
            <select className="border rounded-md p-2" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="all">ทั้งหมด</option>
              <option value="unpaid">รอชำระ</option>
              <option value="pending">รอตรวจสอบ</option>
              <option value="paid">ชำระแล้ว</option>
              <option value="cancelled">ยกเลิก</option>
            </select>
            <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
            <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
            <label className="flex items-center gap-1 text-sm">
              <input type="checkbox" checked={showHidden} onChange={(e) => setShowHidden(e.target.checked)} />
              แสดงที่ยกเลิก/หมดอายุ
            </label>
          </div>
        </div>
        {bills.length === 0 ? (
          <p className="text-center text-sm text-gray-500">ไม่พบบิล</p>
        ) : (
          <div className="space-y-4">
            {bills.map((bill) => {
              const order = orders.find((o) => o.id === bill.orderId)!
              const expired = isExpired(bill)
              return (
                <Card key={bill.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>บิล {bill.id}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                          {expired && bill.status !== "paid" ? "หมดอายุ" : bill.status}
                        </Badge>
                        <span className="text-sm">{new Date(bill.createdAt).toLocaleDateString('th-TH')}</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">ยอดรวม</p>
                      <p className="font-semibold text-xl">฿{order.total.toLocaleString()}</p>
                    </div>
                    <div className="space-x-2">
                      <Link href={`/bill/${bill.id}`}>
                        <Button variant="outline" size="sm">ดูบิล</Button>
                      </Link>
                      <Button size="sm" onClick={download}>ดาวน์โหลด PDF</Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

function isExpired(bill: Bill) {
  const base = new Date(bill.dueDate || bill.createdAt)
  return bill.status !== "paid" && getMockNow().getTime() > base.getTime() + 3 * 24 * 60 * 60 * 1000
}
