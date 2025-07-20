"use client"
import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { mockBills } from "@/mock/bills"
import { formatCurrency, calculateTotal } from "@/lib/utils"

export default function AdminReportsPage() {
  const today = new Date()
  const past = new Date()
  past.setDate(today.getDate() - 7)
  const [start, setStart] = useState(past.toISOString().slice(0, 10))
  const [end, setEnd] = useState(today.toISOString().slice(0, 10))

  const startDate = useMemo(() => new Date(start), [start])
  const endDate = useMemo(() => new Date(end + "T23:59:59"), [end])

  const bills = useMemo(
    () =>
      mockBills.filter((b) => {
        const d = new Date(b.createdAt)
        return d >= startDate && d <= endDate
      }),
    [startDate, endDate],
  )

  const totalSales = useMemo(
    () =>
      bills.reduce(
        (sum, b) => sum + calculateTotal(b.items) + b.shipping,
        0,
      ),
    [bills],
  )
  const customerCount = useMemo(
    () => new Set(bills.map((b) => b.customer)).size,
    [bills],
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-2xl font-bold">แดชบอร์ดรายงาน (mock)</h1>
            <p className="text-sm text-gray-600">สรุปยอดในช่วงวันที่เลือก</p>
          </div>
          <div className="flex gap-2">
            <Input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
            <Input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>ยอดขาย</CardTitle>
            </CardHeader>
            <CardContent>{formatCurrency(totalSales)}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>จำนวนบิล</CardTitle>
            </CardHeader>
            <CardContent>{bills.length}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>จำนวนลูกค้า</CardTitle>
            </CardHeader>
            <CardContent>{customerCount}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
