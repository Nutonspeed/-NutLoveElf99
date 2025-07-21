"use client"

import { useState } from "react"
import { mockOrders, setOrderShippingInfo } from "@/lib/mock-orders"
import type { ShippingStatus } from "@/types/order"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/inputs/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/buttons/button"

export default function ShippingDashboardPage() {
  const [orders, setOrders] = useState(() => mockOrders.map((o) => ({ ...o })))
  const [search, setSearch] = useState("")
  const [providerFilter, setProviderFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const providers = Array.from(
    new Set(orders.map((o) => o.delivery_method || "Other")),
  )

  const filtered = orders.filter((o) => {
    const matchProvider =
      providerFilter === "all" || o.delivery_method === providerFilter
    const matchStatus =
      statusFilter === "all" || o.shipping_status === statusFilter
    const term = search.toLowerCase()
    const matchSearch =
      o.customerName.toLowerCase().includes(term) ||
      o.shippingAddress.phone.toLowerCase().includes(term) ||
      (o.tracking_number || "").toLowerCase().includes(term)
    return matchProvider && matchStatus && matchSearch
  })

  const grouped: Record<string, typeof filtered> = {}
  for (const o of filtered) {
    const p = o.delivery_method || "Other"
    grouped[p] = grouped[p] || []
    grouped[p].push(o)
  }

  const updateStatus = (id: string, status: ShippingStatus) => {
    const order = orders.find((o) => o.id === id)
    if (!order) return
    setOrderShippingInfo(id, order.tracking_number, order.delivery_method, status)
    setOrders(mockOrders.map((o) => ({ ...o })))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Shipping Dashboard</h1>
        <Button>เพิ่มรายการส่งแบบ manual</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ค้นหา ชื่อ/เบอร์/Tracking"
          className="w-56"
        />
        <Select value={providerFilter} onValueChange={setProviderFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="ขนส่ง" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ทั้งหมด</SelectItem>
            {providers.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="สถานะ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ทั้งหมด</SelectItem>
            <SelectItem value="pending">เตรียมส่ง</SelectItem>
            <SelectItem value="shipped">ส่งแล้ว</SelectItem>
            <SelectItem value="delivered">ส่งมอบแล้ว</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {Object.entries(grouped).map(([provider, items]) => (
        <div key={provider} className="space-y-2">
          <h2 className="text-xl font-semibold">
            {provider} ({items.length})
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>วันที่</TableHead>
                <TableHead>ลูกค้า</TableHead>
                <TableHead>Tracking No.</TableHead>
                <TableHead>สถานะ</TableHead>
                <TableHead>หมายเหตุ</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((o) => (
                <TableRow key={o.id}>
                  <TableCell>
                    {new Date(o.shipping_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{o.customerName}</TableCell>
                  <TableCell>{o.tracking_number || "-"}</TableCell>
                  <TableCell>
                    <Select
                      value={o.shipping_status}
                      onValueChange={(v) =>
                        updateStatus(o.id, v as ShippingStatus)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">เตรียมส่ง</SelectItem>
                        <SelectItem value="shipped">ส่งแล้ว</SelectItem>
                        <SelectItem value="delivered">ส่งมอบแล้ว</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{o.delivery_note || "-"}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      อัปโหลดสลิป
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  )
}
