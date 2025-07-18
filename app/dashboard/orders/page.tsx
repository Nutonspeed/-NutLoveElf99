"use client"
import { useState } from 'react'
import Link from 'next/link'
import { orders as mockOrders, SimpleOrder } from '@/mock/orders'
import OrderCard from '@/components/order/OrderCard'
import EmptyState from '@/components/EmptyState'
import { Input } from '@/components/ui/inputs/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/buttons/button'

export default function DashboardOrdersPage() {
  const [orders, setOrders] = useState<SimpleOrder[]>([...mockOrders])
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = orders.filter(o => {
    const matchStatus = statusFilter === 'all' || o.status === statusFilter
    const term = search.toLowerCase()
    const matchSearch = o.id.toLowerCase().includes(term) || o.customer.toLowerCase().includes(term)
    return matchStatus && matchSearch
  })

  const handleCancel = (id: string) => {
    if (confirm('ยืนยันยกเลิกคำสั่งซื้อ?')) {
      setOrders(prev => prev.map(o => (o.id === id ? { ...o, status: 'Cancelled' } : o)))
    }
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">คำสั่งซื้อ</h1>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex gap-2">
          <select
            className="border rounded-md p-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <Input
            placeholder="ค้นหา..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <>
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>รหัส</TableHead>
                  <TableHead>ลูกค้า</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>ยอดรวม</TableHead>
                  <TableHead className="text-right">การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>฿{order.total.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/dashboard/orders/${order.id}`}>
                          <Button variant="outline" size="sm">ดู</Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancel(order.id)}
                        >
                          ยกเลิก
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="md:hidden space-y-4">
            {filtered.map((order) => (
              <OrderCard key={order.id} order={order} onCancel={handleCancel} />
            ))}
          </div>
        </>
      ) : (
        <EmptyState title="ยังไม่มีคำสั่งซื้อในระบบ" />
      )}
    </div>
  )
}
