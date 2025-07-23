"use client"
import { Badge } from '@/components/ui/badge'
import type { AdminBill } from '@/mock/bills'
import { getBillStatusBadgeClass, getBillStatusLabel } from '@/lib/bill-status'

export default function BillStatusTag({ status }: { status: AdminBill['status'] }) {
  return (
    <Badge className={getBillStatusBadgeClass(status)}>
      {getBillStatusLabel(status)}
    </Badge>
  )
}
