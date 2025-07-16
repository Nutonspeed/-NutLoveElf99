"use client"
import { Button } from "@/components/ui/buttons/button"

interface MockPromoModalProps {
  open: boolean
  onClose: () => void
}

const promos = [
  { id: 'p1', title: 'ลด 10% สำหรับผ้าใหม่' },
  { id: 'p2', title: 'ส่งฟรี เมื่อครบ 1,000 บาท' },
  { id: 'p3', title: 'ซื้อ 2 แถม 1 เฉพาะสัปดาห์นี้' },
]

export default function MockPromoModal({ open, onClose }: MockPromoModalProps) {
  if (!open) return null
  const send = (title: string) => {
    alert(`✅ ส่งแล้ว: ${title}`)
    onClose()
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-80 space-y-4 rounded bg-white p-4">
        <h2 className="text-lg font-bold">เลือกโปรโมชัน</h2>
        {promos.map((p) => (
          <button
            key={p.id}
            className="w-full rounded border p-2 text-left hover:bg-gray-50"
            onClick={() => send(p.title)}
          >
            {p.title}
          </button>
        ))}
        <div className="text-right">
          <Button variant="outline" onClick={onClose}>ปิด</Button>
        </div>
      </div>
    </div>
  )
}
