"use client"
import { useState, useEffect } from 'react'
import FabricCard from '@/components/fabric/FabricCard'
import { fabrics } from '@/mock/fabrics'

export default function FabricGalleryPage() {
  const [items, setItems] = useState<typeof fabrics | null>(null)

  useEffect(() => {
    setItems([...fabrics])
  }, [])

  if (!items) return <div className="p-8">กำลังโหลด...</div>

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Gallery ลายผ้า</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map(f => (
          <FabricCard key={f.id} fabric={f} />
        ))}
      </div>
    </div>
  )
}
