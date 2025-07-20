"use client"
import { useState } from 'react'
import Link from 'next/link'
import { orders as mockOrders, type SimpleOrder } from '@/mock/orders'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/buttons/button'
import EmptyState from '@/components/EmptyState'

export default function DashboardOrdersPage() {
  const [status, setStatus] = useState('all')

  const filtered = mockOrders.filter(o => status === 'all' || o.status === status)

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">ออเดอร์ทั้งหมด</h1>
      <select
        className="border rounded-md p-2"
        value={status}
        onChange={e => setStatus(e.target.value)}
      >
        <option value="all">ทั้งหมด</option>
        <option value="pendingPayment">รอชำระ</option>
        <option value="processing">กำลังแพ็ก</option>
        <option value="shipped">ส่งแล้ว</option>
      </select>

      {filtered.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>เลขบิล</TableHead>
              <TableHead>ลูกค้า</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead className="text-right">ยอดรวม</TableHead>
              <TableHead className="text-right">วันที่</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(order => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell className="text-right">฿{order.total.toLocaleString()}</TableCell>
                <TableCell className="text-right">{new Date(order.date).toLocaleDateString('th-TH')}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/dashboard/orders/${order.id}`}>
                    <Button variant="outline" size="sm">ดู</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <EmptyState title="ไม่มีออเดอร์" />
      )}
    </div>
  )
}
