"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import type { StaffSummary } from '@/lib/report'
import { formatCurrency } from '@/lib/utils'

interface Props { summary: StaffSummary[] }

export default function StaffSummaryBar({ summary }: Props) {
  const totalBills = summary.reduce((s, b) => s + b.count, 0)
  const totalRevenue = summary.reduce((s, b) => s + b.total, 0)
  const paid = summary.reduce((s, b) => s + b.paid, 0)
  const unpaid = summary.reduce((s, b) => s + b.unpaid, 0)

  return (
    <div className="grid gap-4 sm:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>ยอดรวม</CardTitle>
        </CardHeader>
        <CardContent>{formatCurrency(totalRevenue)}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>บิลทั้งหมด</CardTitle>
        </CardHeader>
        <CardContent>{totalBills}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>บิลที่จ่ายแล้ว</CardTitle>
        </CardHeader>
        <CardContent>{paid}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>ค้างโอน</CardTitle>
        </CardHeader>
        <CardContent>{unpaid}</CardContent>
      </Card>
    </div>
  )
}
