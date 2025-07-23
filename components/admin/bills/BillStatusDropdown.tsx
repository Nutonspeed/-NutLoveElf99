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
  if (status === 'shipped') return 'bg-purple-500 text-white'
  if (status === 'delivered') return 'bg-blue-500 text-white'
  if (status === 'packing') return 'bg-yellow-500 text-white'
  if (status === 'cutting' || status === 'sewing' || status === 'waiting')
    return 'bg-gray-500 text-white'
  return 'bg-gray-500 text-white'
}

function getLabel(status: AdminBill['status']) {
  if (status === 'paid') return 'ชำระแล้ว'
  if (status === 'shipped') return 'จัดส่งแล้ว'
  if (status === 'delivered') return 'ส่งมอบแล้ว'
  if (status === 'packing') return 'แพ็กของ'
  if (status === 'cutting') return 'ตัดผ้า'
  if (status === 'sewing') return 'เย็บ'
  if (status === 'waiting') return 'รอคิว'
  return status
}

export default function BillStatusDropdown({ status, onChange }: BillStatusDropdownProps) {
  return (
    <Select value={status} onValueChange={v => onChange(v as AdminBill['status'])}>
      <SelectTrigger className="w-32">
        <Badge className={getBadgeClass(status)}>{getLabel(status)}</Badge>
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
