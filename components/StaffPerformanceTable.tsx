"use client"
import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { StaffSummary } from '@/lib/report'
import { formatCurrency } from '@/lib/utils'

interface Props {
  data: StaffSummary[]
  date: string
}

export default function StaffPerformanceTable({ data, date }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>พนักงาน</TableHead>
          <TableHead className="text-right">บิล</TableHead>
          <TableHead className="text-right">ยอดรวม</TableHead>
          <TableHead className="text-right">ชำระแล้ว</TableHead>
          <TableHead className="text-right">ค้างโอน</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(row => (
          <TableRow key={row.staff}>
            <TableCell>
              <Link className="text-blue-600" href={`/admin/reports/daily?date=${date}&staff=${encodeURIComponent(row.staff)}`}>{row.staff}</Link>
            </TableCell>
            <TableCell className="text-right">{row.count}</TableCell>
            <TableCell className="text-right">{formatCurrency(row.total)}</TableCell>
            <TableCell className="text-right">{row.paid}</TableCell>
            <TableCell className="text-right">{row.unpaid}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
