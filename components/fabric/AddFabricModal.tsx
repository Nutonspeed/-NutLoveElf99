"use client"
import { useState } from 'react'
import ModalWrapper from '@/components/ui/ModalWrapper'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'
import type { Fabric } from '@/mock/fabrics'
import { addFabric } from '@/mock/fabrics'

export default function AddFabricModal({
  open,
  onClose,
  onAdd,
}: {
  open: boolean
  onClose: () => void
  onAdd?: (fabric: Fabric) => void
}) {
  const [name, setName] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const handleSave = () => {
    if (!name.trim()) return
    const fabric = addFabric({ name, imageUrl })
    setName('')
    setImageUrl('')
    onAdd?.(fabric)
    onClose()
  }

  return (
    <ModalWrapper open={open} onClose={onClose}>
      <div className="space-y-4 w-72">
        <h2 className="text-lg font-bold">เพิ่มลายผ้าใหม่</h2>
        <Input placeholder="ชื่อผ้า" value={name} onChange={e => setName(e.target.value)} />
        <Input placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>ยกเลิก</Button>
          <Button onClick={handleSave} disabled={!name.trim()}>บันทึก</Button>
        </div>
      </div>
    </ModalWrapper>
  )
}
