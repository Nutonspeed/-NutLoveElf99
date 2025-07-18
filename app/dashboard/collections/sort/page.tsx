"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { collections, reorderCollections } from '@/mock/collections'
import { Button } from '@/components/ui/buttons/button'
import SectionHeader from '@/components/ui/SectionHeader'

export default function SortCollectionsPage() {
  const router = useRouter()
  const [items, setItems] = useState(() =>
    collections.filter(c => !c.isDeleted).sort((a,b) => a.order - b.order)
  )
  const [dragId, setDragId] = useState<string | null>(null)

  const handleDragStart = (id: string) => setDragId(id)
  const handleDrop = (id: string) => {
    if (!dragId || dragId === id) return
    const arr = items.slice()
    const from = arr.findIndex(c => c.id === dragId)
    const to = arr.findIndex(c => c.id === id)
    const [moved] = arr.splice(from,1)
    arr.splice(to,0,moved)
    setItems(arr)
    setDragId(null)
  }

  const handleSave = () => {
    reorderCollections(items.map(c => c.id))
    console.log('new order', items.map(c => c.id))
    router.push('/dashboard/collections')
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <SectionHeader title="จัดลำดับคอลเลกชัน" />
      {items.length > 0 ? (
        <div className="space-y-2">
          {items.map(col => (
            <div
              key={col.id}
              draggable
              onDragStart={() => handleDragStart(col.id)}
              onDragOver={e => e.preventDefault()}
              onDrop={() => handleDrop(col.id)}
              className="rounded border p-2 bg-white"
            >
              {col.name}
            </div>
          ))}
        </div>
      ) : (
        <p>ยังไม่มีคอลเลกชัน</p>
      )}
      <Button onClick={handleSave}>บันทึกลำดับ</Button>
    </div>
  )
}
