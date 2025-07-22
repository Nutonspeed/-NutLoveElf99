"use client"
import { useEffect, useState } from 'react'

interface Summary {
  orders: number
  revenue: number
  feedback: number
  exportLogs: any[]
}

export default function DevSummaryPage() {
  if (process.env.NODE_ENV !== 'development') {
    return <div className="p-4">Available only in development mode.</div>
  }
  const [data, setData] = useState<Summary | null>(null)
  useEffect(() => {
    fetch('/api/admin/dev/summary').then(r => r.json()).then(setData)
  }, [])
  if (!data) return <div className="p-4">Loading...</div>
  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Dev Summary</h1>
      <p>Orders: {data.orders}</p>
      <p>Revenue: {data.revenue}</p>
      <p>Feedback: {data.feedback}</p>
      <a className="text-blue-600 underline" href="/mock/store/export-log.json" download>
        Download Export Logs
      </a>
    </div>
  )
}
