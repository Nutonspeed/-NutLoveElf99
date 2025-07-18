"use client"
import { useState } from 'react'
import { Button } from '@/components/ui/buttons/button'
import type { Fabric } from '@/mock/fabrics'
import AddFabricModal from './AddFabricModal'

export default function AddNewFabricButton({ onAdd }: { onAdd?: (fabric: Fabric) => void }) {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)

  const handleAdd = (fabric: Fabric) => {
    handleClose()
    onAdd?.(fabric)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>เพิ่มลายผ้าใหม่</Button>
      <AddFabricModal open={open} onClose={handleClose} onAdd={handleAdd} />
    </>
  )
}
