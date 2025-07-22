"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { AdminBill } from "@/mock/bills"

interface BillStatusDropdownProps {
  status: AdminBill['status']
  onChange: (status: AdminBill['status']) => void
}

function getBadgeClass(status: AdminBill['status']) {
  if (status === 'paid') return 'bg-green-500 text-white'
  if (status === 'cancelled') return 'bg-gray-500 text-white'
  if (status === 'unpaid') return 'bg-red-500 text-white'
  if (status === 'shipped') return 'bg-purple-500 text-white'
  if (status === 'pending') return 'bg-blue-500 text-white'
  return 'bg-yellow-500 text-white'
}

function getLabel(status: AdminBill['status']) {
  if (status === 'paid') return '🟢 ชำระแล้ว'
  if (status === 'cancelled') return '⚫️ ยกเลิก'
  if (status === 'unpaid') return '🔴 รอชำระ'
  if (status === 'shipped') return 'จัดส่งแล้ว'
  if (status === 'pending') return 'รอตรวจสอบ'
  return status
}

export default function BillStatusDropdown({ status, onChange }: BillStatusDropdownProps) {
  return (
    <Select value={status} onValueChange={v => onChange(v as AdminBill['status'])}>
      <SelectTrigger className="w-32">
        <Badge className={getBadgeClass(status)}>{getLabel(status)}</Badge>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="unpaid">รอชำระ</SelectItem>
        <SelectItem value="paid">ชำระแล้ว</SelectItem>
        <SelectItem value="shipped">จัดส่งแล้ว</SelectItem>
        <SelectItem value="cancelled">ยกเลิก</SelectItem>
      </SelectContent>
    </Select>
  )
}
