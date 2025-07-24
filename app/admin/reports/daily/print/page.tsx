"use client"
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import BillPrintLayout from '@/components/bill/BillPrintLayout'
import DailySummaryBar from '@/components/DailySummaryBar'
import DailyReportTable from '@/components/DailyReportTable'

export default function DailyPrintPage() {
  const params = useSearchParams()
  const date = params.get('date') || new Date().toISOString().slice(0, 10)
  const [bills, setBills] = useState<any[]>([])

  useEffect(() => {
    fetch('/mock/store/bills.json')
      .then(r => r.json())
      .then((list: any[]) => setBills(list.filter(b => b.createdAt.startsWith(date))))
      .catch(() => setBills([]))
  }, [date])

  useEffect(() => {
    if (bills.length && typeof window !== 'undefined') {
      setTimeout(() => window.print(), 500)
    }
  }, [bills])

  return (
    <BillPrintLayout>
      <h1 className="text-lg font-semibold mb-2">Daily Report {date}</h1>
      <DailySummaryBar bills={bills} />
      <DailyReportTable bills={bills} />
    </BillPrintLayout>
  )
}
