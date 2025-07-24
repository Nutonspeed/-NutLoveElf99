"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { AdminBill } from '@/mock/bills'

interface Props {
  status: NonNullable<AdminBill['productionStatus']>
  onChange: (status: NonNullable<AdminBill['productionStatus']>) => void
}

const options: { value: NonNullable<AdminBill['productionStatus']>; label: string }[] = [
  { value: 'waiting', label: 'รอคิว' },
  { value: 'cutting', label: 'ตัดผ้า' },
  { value: 'sewing', label: 'เย็บ' },
  { value: 'packing', label: 'แพ็ค' },
  { value: 'shipped', label: 'จัดส่ง' },
]

export default function ProductionStatusDropdown({ status, onChange }: Props) {
  return (
    <Select value={status} onValueChange={v => onChange(v as NonNullable<AdminBill['productionStatus']>)}>
      <SelectTrigger className="w-28">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map(o => (
          <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
