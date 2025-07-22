"use client"
import { useState, useEffect } from "react"
import { shippingOrders } from "@/mock/shipping"
import { shippingOrderStatusLabel, type ShippingOrderStatus } from "@/types/shipping"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import EmptyState from "@/components/EmptyState"

export default function ShippingListPage() {
  const [status, setStatus] = useState<"all" | ShippingOrderStatus>("all")
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState(shippingOrders)

  useEffect(() => {
    const t = setTimeout(() => {
      setOrders([...shippingOrders])
      setLoading(false)
    }, 300)
    return () => clearTimeout(t)
  }, [])

  const filtered = orders.filter(
    (o) => status === "all" || o.status === status,
  )

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">รายการจัดส่ง</h1>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as ShippingOrderStatus | 'all')}
        className="border rounded p-2"
      >
        <option value="all">ทั้งหมด</option>
        {Object.entries(shippingOrderStatusLabel).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 animate-pulse rounded" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>ชื่อ</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead>Tracking</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(o => (
              <TableRow key={o.id}>
                <TableCell>{o.id}</TableCell>
                <TableCell>{o.name}</TableCell>
                <TableCell>{shippingOrderStatusLabel[o.status]}</TableCell>
                <TableCell>{o.tracking || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <EmptyState title="ไม่มีข้อมูล" />
      )}
    </div>
  )
}
