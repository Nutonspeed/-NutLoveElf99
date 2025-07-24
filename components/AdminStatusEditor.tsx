"use client"
import { useState } from 'react'

const options = [
  { value: 'waiting', label: 'รอตัด' },
  { value: 'cutting', label: 'กำลังตัด' },
  { value: 'sewing', label: 'รอเย็บ' },
  { value: 'done', label: 'เย็บเสร็จ' },
  { value: 'packing', label: 'แพ็คแล้ว' },
  { value: 'shipped', label: 'จัดส่งแล้ว' },
] as const

type Step = typeof options[number]['value']

export default function AdminStatusEditor({ billId, step }: { billId: string; step: Step }) {
  const [value, setValue] = useState<Step>(step)
  const update = async (newStep: Step) => {
    setValue(newStep)
    await fetch('/api/bill/update-production-status', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ billId, newStatus: newStep }),
    })
  }
  return (
    <select
      className="border px-2 py-1"
      value={value}
      onChange={e => update(e.target.value as Step)}
    >
      {options.map(o => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}
