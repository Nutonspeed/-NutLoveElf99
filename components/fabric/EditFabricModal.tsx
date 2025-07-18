"use client"
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'
import type { Fabric } from '@/mock/fabrics'
import { updateFabric } from '@/mock/fabrics'

interface Props {
  fabric: Fabric
  open: boolean
  onClose: () => void
  onUpdated?: (fabric: Fabric) => void
}

export default function EditFabricModal({ fabric, open, onClose, onUpdated }: Props) {
  const [name, setName] = useState(fabric.name)
  const [imageUrl, setImageUrl] = useState(fabric.imageUrl)

  useEffect(() => {
    if (open) {
      setName(fabric.name)
      setImageUrl(fabric.imageUrl)
    }
  }, [open, fabric])

  const handleSave = () => {
    const updated = updateFabric(fabric.id, { name, imageUrl })
    if (updated) onUpdated?.(updated)
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-80 space-y-4 rounded bg-white p-4">
        <h2 className="text-lg font-bold">แก้ไขลายผ้า</h2>
        <Input placeholder="ชื่อผ้า" value={name} onChange={e => setName(e.target.value)} />
        <Input placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>ยกเลิก</Button>
          <Button onClick={handleSave}>บันทึก</Button>
        </div>
      </div>
    </div>
  )
}
