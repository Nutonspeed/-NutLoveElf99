"use client"
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/buttons/button'
import { Edit, Trash2 } from 'lucide-react'
import EditFabricModal from './EditFabricModal'
import type { Fabric } from '@/mock/fabrics'
import { removeFabric } from '@/mock/fabrics'

export default function FabricCard({
  fabric,
  onUpdated,
  onDelete,
}: {
  fabric: Fabric
  onUpdated?: (fabric: Fabric) => void
  onDelete?: (id: string) => void
}) {
  const [open, setOpen] = useState(false)

  const handleDelete = () => {
    if (confirm('ลบลายผ้านี้?')) {
      removeFabric(fabric.id)
      onDelete?.(fabric.id)
    }
  }

  return (
    <div className="relative overflow-hidden rounded border bg-white group">
      <div className="relative aspect-square">
        <Image src={fabric.imageUrl} alt={fabric.name} fill className="object-cover" />
      </div>
      <div className="flex items-center justify-between p-2 text-sm">
        <span className="font-medium">{fabric.name}</span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <EditFabricModal
        fabric={fabric}
        open={open}
        onClose={() => setOpen(false)}
        onUpdated={(f) => {
          setOpen(false)
          onUpdated?.(f)
        }}
      />
    </div>
  )
}
