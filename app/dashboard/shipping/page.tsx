"use client"
import { useState } from "react"
import { shippingOrders } from "@/mock/shipping"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import EmptyState from "@/components/EmptyState"

export default function ShippingListPage() {
  const [status, setStatus] = useState("all")

  const filtered = shippingOrders.filter(o => status === "all" || o.status === status)

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">รายการจัดส่ง</h1>
      <select value={status} onChange={e=>setStatus(e.target.value)} className="border rounded p-2">
        <option value="all">ทั้งหมด</option>
        <option value="รอพิมพ์">รอพิมพ์</option>
        <option value="ส่งแล้ว">ส่งแล้ว</option>
        <option value="ตีกลับ">ตีกลับ</option>
      </select>
      {filtered.length > 0 ? (
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
                <TableCell>{o.status}</TableCell>
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
