"use client"
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

interface Summary { orders: number; revenue: number }

export default function DailyPrintPage() {
  const params = useSearchParams()
  const date = params.get('date') || new Date().toISOString().slice(0,10)
  const [data, setData] = useState<Summary | null>(null)

  useEffect(() => {
    fetch(`/api/reports/daily?date=${date}`).then(r=>r.json()).then(setData)
  }, [date])

  useEffect(() => { if (data) setTimeout(() => window.print(), 500) }, [data])

  if (!data) return null

  return (
    <div className="p-4 space-y-2">
      <h1 className="text-xl font-semibold">Daily Report {date}</h1>
      <p>Total orders: {data.orders}</p>
      <p>Total revenue: ฿{data.revenue}</p>
    </div>
  )
}
