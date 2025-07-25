"use client"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import type { BillRecord } from "@/mockDB/bills"

export default function RecentBillsTable({ bills }: { bills: BillRecord[] }) {
  return (
    <Table className="min-w-full">
      <TableHeader>
        <TableRow>
          <TableHead>รหัส</TableHead>
          <TableHead>ลูกค้า</TableHead>
          <TableHead className="text-right">ยอด</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bills.map(b => {
          const total = b.items.reduce((s, i) => s + i.price * i.quantity, 0) + (b.shipping || 0)
          return (
            <TableRow key={b.id}>
              <TableCell>{b.id}</TableCell>
              <TableCell>{b.customer}</TableCell>
              <TableCell className="text-right">฿{total.toLocaleString()}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
