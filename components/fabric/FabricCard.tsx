"use client"
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/buttons/button'
import { Edit } from 'lucide-react'
import EditFabricModal from './EditFabricModal'
import type { Fabric } from '@/mock/fabrics'

export default function FabricCard({ fabric, onUpdated }: { fabric: Fabric; onUpdated?: (fabric: Fabric) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border rounded overflow-hidden bg-white">
      <div className="relative aspect-square">
        <Image src={fabric.imageUrl} alt={fabric.name} fill className="object-cover" />
      </div>
      <div className="flex items-center justify-between p-2 text-sm">
        <span className="font-medium">{fabric.name}</span>
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
          <Edit className="w-4 h-4" />
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
