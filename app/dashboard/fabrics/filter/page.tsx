"use client"
import { useState } from 'react'
import FabricCard from '@/components/fabric/FabricCard'
import { fabrics } from '@/mock/fabrics'
import { Checkbox } from '@/components/ui/checkbox'

const colors = ['แดง', 'เขียว', 'น้ำเงิน']

export default function FilterFabricByColorPage() {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (c: string) => {
    setSelected(prev => prev.includes(c) ? prev.filter(i => i !== c) : [...prev, c])
  }

  const filtered = selected.length === 0 ? fabrics : fabrics.filter(f =>
    f.variants?.some(v => selected.includes(v.color))
  )

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">กรองผ้าตามสี</h1>
      <div className="flex gap-4">
        {colors.map(c => (
          <label key={c} className="flex items-center gap-1 text-sm">
            <Checkbox checked={selected.includes(c)} onCheckedChange={() => toggle(c)} />
            {c}
          </label>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filtered.map(f => (
          <FabricCard key={f.id} fabric={f} />
        ))}
      </div>
    </div>
  )
}
