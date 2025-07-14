"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"
import {
  getOrdersInRange,
  getDailySales,
  getTopSellingItems,
} from "@/lib/mock/orders"
import { downloadExcel } from "@/lib/mock-export"
import { formatCurrency } from "@/lib/utils"

export default function AdminSalesReport() {
  const today = new Date()
  const past = new Date()
  past.setDate(today.getDate() - 6)
  const [start, setStart] = useState(past.toISOString().slice(0, 10))
  const [end, setEnd] = useState(today.toISOString().slice(0, 10))

  const startDate = useMemo(() => new Date(start), [start])
  const endDate = useMemo(() => new Date(end + "T23:59:59"), [end])

  const orders = useMemo(() => getOrdersInRange(startDate, endDate), [startDate, endDate])
  const daily = useMemo(() => getDailySales(startDate, endDate), [startDate, endDate])
  const total = useMemo(() => orders.reduce((s, o) => s + o.total, 0), [orders])
  const topItems = useMemo(() => getTopSellingItems(startDate, endDate), [startDate, endDate])

  const exportSummary = () => {
    const lines = ["date,total", ...daily.map((d) => `${d.date},${d.total}`), "", "item,quantity", ...topItems.map((i) => `${i.name},${i.count}`)]
    const blob = new Blob([lines.join("\n")], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "sales-summary.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportOrders = async () => {
    await downloadExcel(
      orders.map((o) => ({
        id: o.id,
        customer: o.customerName,
        date: o.createdAt.slice(0, 10),
        total: o.total,
        status: o.status,
      })),
      "orders.xlsx",
    )
    toast.success("Export completed (mock)")
  }

  const exportAll = async () => {
    exportSummary()
    await exportOrders()
    toast.success("ดาวน์โหลดไฟล์ทั้งหมดแล้ว (mock)")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/reports">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">รายงานยอดขาย (mock)</h1>
            <p className="text-gray-600">ดูยอดขายและสินค้าขายดี</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
          <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
          <Button onClick={exportSummary} variant="outline">
            <Download className="h-4 w-4" /> Export Summary (.csv)
          </Button>
          <Button onClick={exportOrders} variant="outline">
            <Download className="h-4 w-4" /> Export Orders (.xlsx)
          </Button>
          <Button onClick={exportAll} variant="outline">
            <Download className="h-4 w-4" /> ดาวน์โหลดทั้งหมด (CSV + Excel)
          </Button>
        </div>
        {orders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="mb-2">ไม่มีข้อมูลในช่วงเวลานี้</p>
              <p className="text-sm text-gray-500">ลองปรับช่วงวันที่ใหม่</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>ยอดขายรวม {formatCurrency(total)}</CardTitle>
              </CardHeader>
              <CardContent className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={daily}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total" fill="#8884d8" name="ยอดขาย" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>สินค้า Top 5</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>สินค้า</TableHead>
                      <TableHead className="text-right">จำนวน</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topItems.map((item) => (
                      <TableRow key={item.name}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-right">{item.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
