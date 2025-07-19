"use client"
import { useState } from 'react'
import { downloadCSV } from '@/lib/mock-export'
import { getOrders } from '@/core/mock/store'
import { Button } from '@/components/ui/buttons/button'
import { addImportExportLog } from '@/lib/mock-import-log'

export default function ExportOrdersPage() {
  const all = getOrders()
  const [status, setStatus] = useState('all')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const filtered = all.filter(o => {
    const d = new Date(o.createdAt)
    return (status === 'all' || o.status === status) &&
      (!from || d >= new Date(from)) &&
      (!to || d <= new Date(to))
  })

  const rows = filtered.map(o => ({
    id: o.id,
    customer: o.customerName,
    status: o.status,
    total: o.total,
    date: o.createdAt,
  }))

  const handleDownload = () => {
    downloadCSV(rows, 'orders.csv')
    addImportExportLog('orders.csv', rows.length)
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Export Orders</h1>
      <div className="flex gap-2">
        <select className="border p-2 rounded" value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="all">ทั้งหมด</option>
          <option value="pendingPayment">pendingPayment</option>
          <option value="depositPaid">depositPaid</option>
          <option value="paid">paid</option>
        </select>
        <input type="date" className="border p-2 rounded" value={from} onChange={e=>setFrom(e.target.value)} />
        <input type="date" className="border p-2 rounded" value={to} onChange={e=>setTo(e.target.value)} />
        <Button onClick={handleDownload}>Download CSV</Button>
      </div>
    </div>
  )
}
