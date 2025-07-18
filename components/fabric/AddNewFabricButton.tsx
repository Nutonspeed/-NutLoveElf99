"use client"
import { useState } from 'react'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'
import type { Fabric } from '@/mock/fabrics'
import { addFabric } from '@/mock/fabrics'

export default function AddNewFabricButton({ onAdd }: { onAdd?: (fabric: Fabric) => void }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const handleSubmit = () => {
    if (!name.trim()) return
    const fabric = addFabric({ name, imageUrl })
    setName('')
    setImageUrl('')
    setOpen(false)
    onAdd?.(fabric)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>เพิ่มลายผ้าใหม่</Button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-80 space-y-4 rounded bg-white p-4">
            <h2 className="text-lg font-bold">เพิ่มลายผ้าใหม่</h2>
            <Input placeholder="ชื่อผ้า" value={name} onChange={e => setName(e.target.value)} />
            <Input placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>ยกเลิก</Button>
              <Button onClick={handleSubmit} disabled={!name.trim()}>บันทึก</Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
