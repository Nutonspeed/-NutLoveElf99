"use client"
import { useState } from "react"
import { shippingOrders } from "@/mock/shipping"
import { Button } from "@/components/ui/buttons/button"

export default function PrintShippingLabelPage() {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    )
  }

  const toPrint = shippingOrders.filter(o => selected.includes(o.id))

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">พิมพ์ใบจ่าหน้า</h1>
      <div className="space-y-2">
        {shippingOrders.map(o => (
          <label key={o.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.includes(o.id)}
              onChange={() => toggle(o.id)}
            />
            {o.id} – {o.name}
          </label>
        ))}
      </div>
      {toPrint.length > 0 && (
        <Button onClick={() => window.print()}>พิมพ์</Button>
      )}
      <div className="print:block hidden">
        {toPrint.map(o => (
          <div key={o.id} className="mb-4 border p-4 w-80">
            <p className="font-semibold">{o.name}</p>
            <p className="text-sm whitespace-pre-line">{o.address}</p>
            <p className="text-sm">โทร {o.phone}</p>
            <p className="text-sm">Tracking: {o.tracking || '-'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
