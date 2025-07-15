import { useState } from "react"
import Image from "next/image"
import { Star } from "lucide-react"
import type { Fabric } from "@/lib/mock-fabrics"
import { mockFabrics } from "@/lib/mock-fabrics"

export function FabricDetailModal({ fabric, onClose }: { fabric: Fabric; onClose: () => void }) {
  const [keywords, setKeywords] = useState<string>(fabric.keywords?.join(', ') || '')
  const [popular, setPopular] = useState<boolean>(!!fabric.popular)

  const save = () => {
    const idx = mockFabrics.findIndex((f) => f.id === fabric.id)
    if (idx !== -1) {
      mockFabrics[idx] = {
        ...mockFabrics[idx],
        keywords: keywords.split(',').map((k) => k.trim()).filter(Boolean),
        popular,
      }
    }
    onClose()
  }

  const parsed = keywords.split(',').map((k) => k.trim()).filter(Boolean)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
        <div className="relative w-full h-48">
          <Image src={fabric.images[0] || '/placeholder.svg'} alt={fabric.name} fill className="object-cover rounded" />
        </div>
        <h2 className="text-xl font-bold">{fabric.name}</h2>
        <button
          className={`flex items-center gap-2 ${popular ? 'text-yellow-500' : 'text-gray-600'}`}
          onClick={() => setPopular(!popular)}
        >
          <Star className={popular ? 'fill-current' : ''} />
          ติดดาวผ้ายอดนิยม
        </button>
        <div>
          <label className="block text-sm font-medium mb-1">คำค้นหา</label>
          <input
            className="w-full border p-2 rounded"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="เช่น ลายดอกไม้, ผ้านุ่ม"
          />
          <p className="text-sm text-gray-500 mt-1">
            {parsed.length === 0 ? 'ผ้านี้ยังไม่มีคำค้น' : parsed.join(', ')}
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <button className="text-gray-500" onClick={onClose}>ยกเลิก</button>
          <button className="bg-primary text-white px-4 py-2 rounded" onClick={save}>บันทึก</button>
        </div>
      </div>
    </div>
  )
}
