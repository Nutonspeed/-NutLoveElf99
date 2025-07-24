"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { formatCurrency } from '@/lib/utils'
import { billTotal } from '@/lib/report'

interface Props { bills: any[] }

export default function DailySummaryBar({ bills }: Props) {
  const total = bills.reduce((s, b) => s + billTotal(b), 0)
  const paid = bills.filter(b => (b.paymentStatus || b.status) === 'paid' || b.status === 'แจ้งโอนแล้ว').length
  const unpaid = bills.length - paid

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>ยอดรวม</CardTitle>
        </CardHeader>
        <CardContent>{formatCurrency(total)}</CardContent>
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
