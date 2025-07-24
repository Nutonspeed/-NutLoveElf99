"use client"
import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatCurrency } from '@/lib/utils'
import { billTotal } from '@/lib/report'

interface Props { bills: any[] }

export default function DailyReportTable({ bills }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No.</TableHead>
          <TableHead>Bill ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead className="text-right">Items</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Production</TableHead>
          <TableHead>Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bills.map((b, idx) => {
          const count = b.items?.reduce((s: number, it: any) => s + it.quantity, 0) || 0
          const total = billTotal(b)
          const time = new Date(b.createdAt).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
          const paid = (b.paymentStatus || b.status) === 'paid' || b.status === 'แจ้งโอนแล้ว'
          return (
            <TableRow key={b.id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>
                <Link className="text-blue-600" href={`/admin/bill/view/${b.id}`}>{b.id}</Link>
              </TableCell>
              <TableCell>{b.customer}</TableCell>
              <TableCell className="text-right">{count}</TableCell>
              <TableCell className="text-right">{formatCurrency(total)}</TableCell>
              <TableCell>{paid ? 'Paid' : 'Unpaid'}</TableCell>
              <TableCell>{b.productionStatus || '-'}</TableCell>
              <TableCell>{time}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
