"use client"
import { useState } from 'react'
import { orders as mockOrders, SimpleOrder } from '@/mock/orders'
import OrderCard from '@/components/orders/OrderCard'
import EmptyState from '@/components/EmptyState'
import { Input } from '@/components/ui/inputs/input'

export default function DashboardOrdersPage() {
  const [orders, setOrders] = useState<SimpleOrder[]>([...mockOrders])
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('newest')

  const filtered = orders.filter(o => {
    const matchStatus = statusFilter === 'all' || o.status === statusFilter
    const term = search.toLowerCase()
    const matchSearch = o.id.toLowerCase().includes(term) || o.customer.toLowerCase().includes(term)
    return matchStatus && matchSearch
  })

  const sorted = [...filtered]
  if (sort === 'oldest') sorted.reverse()
  if (sort === 'high') sorted.sort((a, b) => b.total - a.total)
  if (sort === 'low') sorted.sort((a, b) => a.total - b.total)


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
          <select
            className="border rounded-md p-2"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="high">High Total</option>
            <option value="low">Low Total</option>
          </select>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">แสดงทั้งหมด {sorted.length} รายการ</p>

      {sorted.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((order) => (
            <OrderCard
              key={order.id}
              id={order.id}
              customer={order.customer}
              status={order.status}
              total={order.total}
            />
          ))}
        </div>
      ) : (
        <EmptyState title="ยังไม่มีคำสั่งซื้อ" />
      )}
    </div>
  )
}
