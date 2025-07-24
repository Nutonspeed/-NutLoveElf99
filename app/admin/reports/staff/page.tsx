"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'
import StaffSummaryBar from '@/components/StaffSummaryBar'
import StaffPerformanceTable from '@/components/StaffPerformanceTable'
import type { StaffSummary } from '@/lib/report'
import { getStaffSummary } from '@/lib/report'
import { downloadCSV } from '@/lib/mock-export'

export default function StaffReportPage() {
  const params = useSearchParams()
  const [date, setDate] = useState(
    params.get('date') || new Date().toISOString().slice(0, 10),
  )
  const [data, setData] = useState<StaffSummary[]>([])

  useEffect(() => {
    getStaffSummary(date).then(setData).catch(() => setData([]))
  }, [date])

  const exportCsv = () => {
    downloadCSV(
      data.map(d => ({
        staff: d.staff,
        count: d.count,
        total: d.total,
        paid: d.paid,
        unpaid: d.unpaid,
      })),
      `staff-${date}.csv`,
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
          <h1 className="text-3xl font-bold">สรุปผลงานแอดมิน</h1>
        </div>
        <div className="flex gap-2 items-end">
          <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
          <Button variant="outline" onClick={exportCsv}>
            <Download className="h-4 w-4 mr-1" /> CSV
          </Button>
        </div>
        <StaffSummaryBar summary={data} />
        <StaffPerformanceTable data={data} date={date} />
      </div>
    </div>
  )
}
