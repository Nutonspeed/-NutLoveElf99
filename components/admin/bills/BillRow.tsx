"use client"
import { TableRow, TableCell } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Copy } from 'lucide-react'
import BillItemActions from '@/components/admin/BillItemActions'
import BillStatusTag from './BillStatusTag'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'
import { formatDateThai } from '@/lib/formatDateThai'
import { copyToClipboard } from '@/helpers/clipboard'
import type { AdminBill } from '@/mock/bills'
import { useBillStore } from '@/core/store'

interface BillRowProps {
  bill: AdminBill
  selected: boolean
  onSelect: () => void
  onEdit: () => void
  paidDate?: string | null
  highlightPayment?: boolean
}

export default function BillRow({ bill, selected, onSelect, onEdit, paidDate, highlightPayment }: BillRowProps) {
  const store = useBillStore()
  const total = bill.items.reduce((s, it) => s + it.price * it.quantity, 0) + bill.shipping
  const contact =
    (bill as any).customerPhone ??
    (bill as any).contactChannel ??
    (bill as any).phone ??
    (bill as any).customer?.phone ??
    '-'
  const lastFollow = bill.followup_log?.[bill.followup_log.length - 1]
  const diffDays = lastFollow && paidDate
    ? Math.round(
        (new Date(paidDate).getTime() - new Date(lastFollow).getTime()) / 86400000,
      )
    : null

  return (
    <TableRow className={bill.status === 'cancelled' ? 'line-through text-gray-400' : ''}>
      <TableCell>
        <Checkbox checked={selected} onCheckedChange={onSelect} />
      </TableCell>
      <TableCell className="flex items-center gap-1">
        {bill.id}
        <button
          type="button"
          onClick={() => {
            copyToClipboard(`${window.location.origin}/bill/view/${bill.id}`)
            store.recordShare(bill.id, 'admin')
          }}
          title="คัดลอกลิงก์"
        >
          🔗
        </button>
      </TableCell>
      <TableCell>{bill.customer}</TableCell>
      <TableCell className="text-right">{formatCurrency(total)}</TableCell>
      <TableCell>{contact}</TableCell>
      <TableCell className="max-w-[8rem] truncate">{bill.note}</TableCell>
      <TableCell className="space-x-1 whitespace-nowrap">
        {bill.tags.map((t) => (
          <Badge key={t} variant="secondary">
            {t}
          </Badge>
        ))}
      </TableCell>
      <TableCell>
        <BillStatusTag status={bill.status} />
      </TableCell>
      <TableCell>
        {lastFollow ? formatDateThai(lastFollow) : '-'}
        {highlightPayment && paidDate && (
          <span className="block text-xs text-green-600">
            → {formatDateThai(paidDate)}{diffDays !== null ? ` (+${diffDays}d)` : ''}
          </span>
        )}
      </TableCell>
      <TableCell>{formatDateThai(bill.createdAt)}</TableCell>
      <TableCell className="flex gap-2">
        <button
          type="button"
          className="text-sm text-blue-600 flex items-center"
          onClick={() => {
            copyToClipboard(`${window.location.origin}/bill/view/${bill.id}`)
            store.recordShare(bill.id, 'admin')
          }}
        >
          <Copy className="h-4 w-4 mr-1" />คัดลอกลิงก์
        </button>
        <BillItemActions bill={bill} onEdit={onEdit} />
      </TableCell>
    </TableRow>
  )
}
