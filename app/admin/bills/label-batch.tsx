"use client"
import { useState } from 'react'
import { useBillStore } from '@/core/store'
import { submitFlashShipment } from '@/lib/flashApi'
import { Button } from '@/components/ui/buttons/button'

export default function BillLabelBatchPage() {
  const store = useBillStore()
  const [selected, setSelected] = useState<string[]>([])
  const [progress, setProgress] = useState<Record<string, 'success' | 'error'>>({})

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    )
  }

  const sendFlash = async () => {
    for (const id of selected) {
      const bill = store.bills.find(b => b.id === id)
      if (!bill) continue
      try {
        const res = await submitFlashShipment(bill as any)
        if (res.success) {
          store.updateBill(id, { tags: [...bill.tags, 'flash-submitted'] })
          setProgress(p => ({ ...p, [id]: 'success' }))
        } else {
          setProgress(p => ({ ...p, [id]: 'error' }))
        }
      } catch {
        setProgress(p => ({ ...p, [id]: 'error' }))
      }
    }
  }

  const hasFlash = selected.some(id => {
    const b = store.bills.find(bill => bill.id === id)
    return b && b.tags.includes('flash')
  })

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">เลือกบิลพิมพ์ใบจ่าหน้า</h1>
      <div className="space-y-2">
        {store.bills.map(b => (
          <label key={b.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.includes(b.id)}
              onChange={() => toggle(b.id)}
            />
            {b.id} – {b.customer}
            {progress[b.id] === 'success' && (
              <span className="text-green-600">ส่งสำเร็จ</span>
            )}
            {progress[b.id] === 'error' && (
              <span className="text-red-600">ล้มเหลว</span>
            )}
          </label>
        ))}
      </div>
      <Button onClick={sendFlash} disabled={selected.length === 0 || !hasFlash}>
        ส่งข้อมูลไป Flash Express
      </Button>
    </div>
  )
}
