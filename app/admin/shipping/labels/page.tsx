"use client"
import { useState } from 'react'
import { useBillStore } from '@/core/store'
import ShippingLabel from '@/components/shipping/ShippingLabel'
import billDetails from '@/mock/bill.detail.json'
import { Button } from '@/components/ui/buttons/button'
import Link from 'next/link'

export default function ShippingLabelsPage() {
  const store = useBillStore()
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    )
  }

  const details = billDetails as any[]
  const toPrint = details.filter(b => selected.includes(b.id))

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">พิมพ์ใบจ่าหน้าหลายบิล</h1>
      <div className="space-y-2">
        {store.bills.map(b => (
          <label key={b.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.includes(b.id)}
              onChange={() => toggle(b.id)}
            />
            {b.id} – {b.customer}
          </label>
        ))}
      </div>
      {toPrint.length > 0 && (
        <div className="flex gap-2 print:hidden">
          <Link href={`/admin/shipping/print?ids=${selected.join(',')}`}>\
            <Button>พิมพ์ทั้งหมด</Button>
          </Link>
        </div>
      )}
      <div className="print:block hidden space-y-4">
        {toPrint.map(b => (
          <ShippingLabel
            key={b.id}
            name={b.customer.name}
            address={b.customer.address}
            phone={b.customer.phone}
            orderId={b.id}
          />
        ))}
      </div>
    </div>
  )
}
