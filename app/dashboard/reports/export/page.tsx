"use client"
import { useState } from 'react'
import { downloadCSV } from '@/lib/mock-export'
import { getOrdersInRange } from '@/lib/mock-orders'

export default function DashboardReportExport() {
  const today = new Date().toISOString().slice(0,10)
  const [start, setStart] = useState(today)
  const [end, setEnd] = useState(today)
  const [type, setType] = useState('sales')

  const handleExport = () => {
    const s = new Date(start)
    const e = new Date(end + 'T23:59:59')
    if (type === 'sales') {
      const data = getOrdersInRange(s,e).map(o=>({id:o.id,date:o.createdAt.slice(0,10),total:o.total}))
      downloadCSV(data,'sales.csv')
    } else {
      downloadCSV([{note:'mock data'}], `${type}.csv`)
    }
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Export รายงาน (mock)</h1>
      <div className="flex gap-2">
        <input type="date" className="border rounded p-2" value={start} onChange={e=>setStart(e.target.value)} />
        <input type="date" className="border rounded p-2" value={end} onChange={e=>setEnd(e.target.value)} />
        <select className="border rounded p-2" value={type} onChange={e=>setType(e.target.value)}>
          <option value="sales">ยอดขาย</option>
          <option value="products">สินค้า</option>
          <option value="customers">ลูกค้า</option>
          <option value="staff">พนักงาน</option>
        </select>
        <button className="border rounded px-3" onClick={handleExport}>Export CSV</button>
      </div>
    </div>
  )
}
