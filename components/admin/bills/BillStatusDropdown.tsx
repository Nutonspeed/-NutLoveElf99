"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { AdminBill } from "@/mock/bills"
import {
  getBillStatusBadgeClass,
  getBillStatusLabel,
} from "@/lib/bill-status"

interface BillStatusDropdownProps {
  status: AdminBill['status']
  onChange: (status: AdminBill['status']) => void
}


export default function BillStatusDropdown({ status, onChange }: BillStatusDropdownProps) {
  return (
    <Select value={status} onValueChange={v => onChange(v as AdminBill['status'])}>
      <SelectTrigger className="w-32">
        <Badge className={getBillStatusBadgeClass(status)}>
          {getBillStatusLabel(status)}
        </Badge>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="waiting">รอคิว</SelectItem>
        <SelectItem value="cutting">ตัดผ้า</SelectItem>
        <SelectItem value="sewing">เย็บ</SelectItem>
        <SelectItem value="packing">แพ็กของ</SelectItem>
        <SelectItem value="shipped">จัดส่งแล้ว</SelectItem>
        <SelectItem value="delivered">ส่งมอบแล้ว</SelectItem>
        <SelectItem value="paid">ชำระแล้ว</SelectItem>
      </SelectContent>
    </Select>
  )
}
