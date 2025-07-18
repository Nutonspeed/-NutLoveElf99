"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import EmptyState from "@/components/EmptyState"
import { getOrdersInRange, getDailyOrders } from "@/lib/mock/orders"
import { downloadCSV } from "@/lib/mock-export"

export default function AdminReportsPage() {
  const today = new Date()
  const past = new Date()
  past.setDate(today.getDate() - 6)
  const [start, setStart] = useState(past.toISOString().slice(0, 10))
  const [end, setEnd] = useState(today.toISOString().slice(0, 10))

  const startDate = useMemo(() => new Date(start), [start])
  const endDate = useMemo(() => new Date(end + "T23:59:59"), [end])

  const orders = useMemo(() => getOrdersInRange(startDate, endDate), [startDate, endDate])
  const daily = useMemo(() => getDailyOrders(startDate, endDate), [startDate, endDate])

  const exportCSVData = () => {
    downloadCSV(daily, "daily-orders.csv")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">สรุปออเดอร์รายวัน (mock)</h1>
        </div>
        <div className="flex gap-2">
          <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
          <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
          <Button onClick={exportCSVData} variant="outline">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
        {daily.length === 0 ? (
          <EmptyState title="ไม่มีข้อมูล" />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>จำนวนคำสั่งซื้อ</CardTitle>
            </CardHeader>
            <CardContent className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={daily}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" name="จำนวน" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
