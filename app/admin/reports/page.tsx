"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { ArrowLeft, Download, ListOrdered } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import {
  getOrdersInRange,
  getDailySales,
  getTopSellingItems,
} from "@/lib/mock/orders"
import { downloadExcel } from "@/lib/mock-export"
import { formatCurrency } from "@/lib/utils"
import { orderStatusOptions, type OrderStatus } from "@/types/order"
import {
  getOrderStatusBadgeVariant,
  getOrderStatusText,
} from "@/lib/order-status"

export default function AdminReportsPage() {
  const today = new Date()
  const past = new Date()
  past.setDate(today.getDate() - 6)

  const [start, setStart] = useState(past.toISOString().slice(0, 10))
  const [end, setEnd] = useState(today.toISOString().slice(0, 10))
  const [channel, setChannel] = useState("all")
  const [status, setStatus] = useState<OrderStatus | "all">("all")

  const startDate = useMemo(() => new Date(start), [start])
  const endDate = useMemo(() => new Date(end + "T23:59:59"), [end])

  const orders = useMemo(() => {
    let list = getOrdersInRange(startDate, endDate)
    if (channel !== "all") list = list.filter((o) => o.delivery_method === channel)
    if (status !== "all") list = list.filter((o) => o.status === status)
    return list
  }, [startDate, endDate, channel, status])

  const daily = useMemo(() => getDailySales(startDate, endDate), [startDate, endDate])
  const total = useMemo(() => orders.reduce((s, o) => s + o.total, 0), [orders])

  const prevStart = useMemo(() => {
    const diff = endDate.getTime() - startDate.getTime()
    const d = new Date(startDate.getTime() - diff - 24 * 60 * 60 * 1000)
    return d
  }, [startDate, endDate])
  const prevEnd = useMemo(() => new Date(startDate.getTime() - 24 * 60 * 60 * 1000), [startDate])
  const prevTotal = useMemo(() => {
    const prev = getOrdersInRange(prevStart, prevEnd)
    return prev.reduce((s, o) => s + o.total, 0)
  }, [prevStart, prevEnd])
  const diff = total - prevTotal

  const topItems = useMemo(() => getTopSellingItems(startDate, endDate), [startDate, endDate])

  const exportOrders = async () => {
    await downloadExcel(
      orders.map((o) => ({
        id: o.id,
        customer: o.customerName,
        date: o.createdAt.slice(0, 10),
        total: o.total,
        status: o.status,
      })),
      "orders-report.xlsx",
    )
    toast.success("Export completed (mock)")
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
          <div>
            <h1 className="text-3xl font-bold">รายงานประจำวัน (mock)</h1>
            <p className="text-gray-600">สถิติยอดขายและสินค้าขายดี</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
          <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
          <Select value={channel} onValueChange={setChannel}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="ช่องทาง" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทุกช่องทาง</SelectItem>
              <SelectItem value="TH Post">ออนไลน์</SelectItem>
              <SelectItem value="Shop">หน้าร้าน</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={(v) => setStatus(v as OrderStatus | "all") }>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="สถานะ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทุกสถานะ</SelectItem>
              {orderStatusOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={exportOrders} variant="outline">
            <Download className="h-4 w-4" /> ส่งออก Excel
          </Button>
          <Link href="/admin/orders">
            <Button variant="outline">
              <ListOrdered className="h-4 w-4" /> ดูคำสั่งซื้อทั้งหมดของวันนี้
            </Button>
          </Link>
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
                <CardTitle>
                  ยอดขายรวม {formatCurrency(total)} ({diff >= 0 ? '+' : ''}{formatCurrency(diff)})
                </CardTitle>
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
            <Card>
              <CardHeader>
                <CardTitle>คำสั่งซื้อ ({orders.length})</CardTitle>
              </CardHeader>
              <CardContent className="overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>ลูกค้า</TableHead>
                      <TableHead>ยอด</TableHead>
                      <TableHead>สถานะ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((o) => (
                      <TableRow key={o.id}>
                        <TableCell>{o.id}</TableCell>
                        <TableCell>{o.customerName}</TableCell>
                        <TableCell>{formatCurrency(o.total)}</TableCell>
                        <TableCell>
                          <Badge variant={getOrderStatusBadgeVariant(o.status)}>
                            {getOrderStatusText(o.status)}
                          </Badge>
                        </TableCell>
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
