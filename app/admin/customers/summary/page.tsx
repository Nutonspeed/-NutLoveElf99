"use client"
import { useEffect, useState } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

interface Summary {
  totalCustomers: number
  repeatRate: number
  avgSpend: number
  top: Array<{ name: string; total: number }>
}

export default function CustomerSummaryPage() {
  const [data, setData] = useState<Summary | null>(null)

  useEffect(() => {
    fetch('/api/customers/summary').then(r => r.json()).then(setData)
  }, [])

  if (!data) return <p className="p-4">Loading...</p>

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Customer Summary</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="border rounded p-4">Total customers: {data.totalCustomers}</div>
        <div className="border rounded p-4">Repeat rate: {(data.repeatRate*100).toFixed(1)}%</div>
        <div className="border rounded p-4">Average spend: ฿{data.avgSpend.toFixed(0)}</div>
      </div>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.top}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
