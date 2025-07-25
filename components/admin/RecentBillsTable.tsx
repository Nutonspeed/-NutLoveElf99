import Link from 'next/link'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import type { AdminBill } from '@/mock/bills'
import { formatCurrency } from '@/lib/utils/format'
import { formatDateThai } from '@/lib/utils/date'

function billTotal(b: AdminBill) {
  return b.items.reduce((s, i) => s + i.price * i.quantity, 0) + b.shipping
}

export default function RecentBillsTable({ bills }: { bills: AdminBill[] }) {
  return (
    <Table className="min-w-full">
      <TableHeader>
        <TableRow>
          <TableHead>รหัส</TableHead>
          <TableHead>ลูกค้า</TableHead>
          <TableHead className="text-right">ยอด</TableHead>
          <TableHead className="hidden md:table-cell">วันที่</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bills.map(b => (
          <TableRow key={b.id}>
            <TableCell>
              <Link href={`/admin/bill/${b.id}`} className="text-blue-600 underline">
                {b.id}
              </Link>
            </TableCell>
            <TableCell>{b.customer}</TableCell>
            <TableCell className="text-right">{formatCurrency(billTotal(b))}</TableCell>
            <TableCell className="hidden md:table-cell">{formatDateThai(b.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
