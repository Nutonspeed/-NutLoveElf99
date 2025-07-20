"use client"
import { useState } from "react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { mockBills } from "@/lib/mock-bills"
import { mockOrders } from "@/lib/mock-orders"

export default function AdminBillsPage() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  const [sort, setSort] = useState("date")

  const filtered = mockBills
    .filter((b) => {
      const order = mockOrders.find((o) => o.id === b.orderId)
      const term = search.toLowerCase()
      const name = order?.customerName.toLowerCase() || ""
      return (
        b.id.toLowerCase().includes(term) ||
        b.orderId.toLowerCase().includes(term) ||
        name.includes(term)
      )
    })
    .filter((b) => {
      if (status === "all") return true
      const overdue =
        b.status === "unpaid" &&
        b.dueDate &&
        new Date(b.dueDate).getTime() < Date.now()
      if (status === "overdue") return overdue
      return b.status === status
    })

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "amount") {
      const aAmt = mockOrders.find((o) => o.id === a.orderId)?.total || 0
      const bAmt = mockOrders.find((o) => o.id === b.orderId)?.total || 0
      return bAmt - aAmt
    }
    if (sort === "dueDate") {
      const aDue = a.dueDate ? new Date(a.dueDate).getTime() : 0
      const bDue = b.dueDate ? new Date(b.dueDate).getTime() : 0
      return aDue - bDue
    }
    return (
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  })

  const getStatusBadge = (b: (typeof mockBills)[number]) => {
    const overdue =
      b.status === "unpaid" &&
      b.dueDate &&
      new Date(b.dueDate).getTime() < Date.now()
    if (overdue)
      return <Badge className="bg-red-500 text-white">ค้างชำระ</Badge>
    if (b.status === "paid")
      return <Badge className="bg-green-500 text-white">ชำระแล้ว</Badge>
    return <Badge className="bg-yellow-500 text-white">รอชำระ</Badge>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold">บิลทั้งหมด</h1>
        <Card>
          <CardHeader>
            <CardTitle>รายการบิล</CardTitle>
            <div className="mt-4 flex flex-wrap gap-2">
              <Input
                placeholder="ค้นหาเลขบิล ลูกค้า หรือ Order"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-64"
              />
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="สถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="unpaid">รอชำระ</SelectItem>
                  <SelectItem value="paid">ชำระแล้ว</SelectItem>
                  <SelectItem value="overdue">ค้างชำระ</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="เรียงตาม" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">วันที่</SelectItem>
                  <SelectItem value="amount">ยอดเงิน</SelectItem>
                  <SelectItem value="dueDate">กำหนดชำระ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>เลขบิล</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>ลูกค้า</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>วันที่</TableHead>
                  <TableHead>ครบกำหนด</TableHead>
                  <TableHead className="text-right">ยอดรวม</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((b) => {
                  const order = mockOrders.find((o) => o.id === b.orderId)
                  const amount = order?.total || 0
                  return (
                    <TableRow
                      key={b.id}
                      className="hover:bg-muted transition-colors"
                    >
                      <TableCell>
                        <Link
                          className="underline"
                          href={`/bill/${b.id}`}
                        >
                          {b.id}
                        </Link>
                      </TableCell>
                      <TableCell>{b.orderId}</TableCell>
                      <TableCell>{order?.customerName || "-"}</TableCell>
                      <TableCell>{getStatusBadge(b)}</TableCell>
                      <TableCell>
                        {new Date(b.createdAt).toLocaleDateString("th-TH")}
                      </TableCell>
                      <TableCell>
                        {b.dueDate
                          ? new Date(b.dueDate).toLocaleDateString("th-TH")
                          : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        ฿{amount.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  )
                })}
                {sorted.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-sm">
                      ไม่พบข้อมูล
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
