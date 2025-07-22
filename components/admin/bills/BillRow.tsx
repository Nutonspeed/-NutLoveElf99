"use client"
import { TableRow, TableCell } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Copy } from 'lucide-react'
import BillItemActions from '@/components/admin/BillItemActions'
import BillStatusDropdown from './BillStatusDropdown'
import { formatCurrency, formatDateThai } from '@/lib/utils'
import { copyToClipboard } from '@/helpers/clipboard'
import type { AdminBill } from '@/mock/bills'

interface BillRowProps {
  bill: AdminBill
  selected: boolean
  onSelect: () => void
  onStatusChange: (s: AdminBill['status']) => void
  onEdit: () => void
}

export default function BillRow({ bill, selected, onSelect, onStatusChange, onEdit }: BillRowProps) {
  const total = bill.items.reduce((s, it) => s + it.price * it.quantity, 0) + bill.shipping
  const phone = (bill as any).phone ?? (bill as any).customer?.phone ?? '-'

  return (
    <TableRow>
      <TableCell>
        <Checkbox checked={selected} onCheckedChange={onSelect} />
      </TableCell>
      <TableCell>{bill.id}</TableCell>
      <TableCell>{bill.customer}</TableCell>
      <TableCell className="text-right">{formatCurrency(total)}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell>
        <BillStatusDropdown status={bill.status} onChange={onStatusChange} />
      </TableCell>
      <TableCell>{formatDateThai(bill.createdAt)}</TableCell>
      <TableCell className="flex gap-2">
        <button
          type="button"
          className="text-sm text-blue-600 flex items-center"
          onClick={() => copyToClipboard(`${window.location.origin}/bill/${bill.id}`)}
        >
          <Copy className="h-4 w-4 mr-1" />คัดลอกลิงก์
        </button>
        <BillItemActions bill={bill} onEdit={onEdit} />
      </TableCell>
    </TableRow>
  )
}
