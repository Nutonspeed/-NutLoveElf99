"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, Printer, Download } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'
import DailySummaryBar from '@/components/DailySummaryBar'
import DailyReportTable from '@/components/DailyReportTable'
import { downloadCSV } from '@/lib/mock-export'
import { billTotal } from '@/lib/report'

export default function DailyReportPage() {
  const params = useSearchParams()
  const [date, setDate] = useState(
    params.get('date') || new Date().toISOString().slice(0, 10),
  )
  const [bills, setBills] = useState<any[]>([])
  const staff = params.get('staff') || ''

  useEffect(() => {
    fetch('/mock/store/bills.json')
      .then(r => r.json())
      .then((list: any[]) =>
        setBills(
          list.filter(b => {
            if (!b.createdAt.startsWith(date)) return false
            if (staff && b.createdBy !== staff) return false
            return true
          }),
        ),
      )
      .catch(() => setBills([]))
  }, [date, staff])

  const exportCsv = () => {
    downloadCSV(
      bills.map(b => ({
        id: b.id,
        customer: b.customer,
        total: billTotal(b),
        status: (b.paymentStatus || b.status) as string,
      })),
      `daily-${date}.csv`,
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/reports">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">รายงานบิลรายวัน</h1>
        </div>
        <div className="flex gap-2 items-end">
          <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
          <Link href={`/admin/reports/daily/print?date=${date}`}>
            <Button variant="outline">
              <Printer className="h-4 w-4 mr-1" /> พิมพ์
            </Button>
          </Link>
          <Button variant="outline" onClick={exportCsv}>
            <Download className="h-4 w-4 mr-1" /> CSV
          </Button>
        </div>
        <DailySummaryBar bills={bills} />
        <DailyReportTable bills={bills} />
      </div>
    </div>
  )
}
