"use client"
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { collections, softDeleteCollection, reorderCollections } from '@/mock/collections'
import { fabrics } from '@/mock/fabrics'
import { Button } from '@/components/ui/buttons/button'
import ModalWrapper from '@/components/ui/ModalWrapper'

export default function DashboardCollectionsPage() {
  const [items, setItems] = useState(() => collections.filter(c => !c.isDeleted).sort((a,b) => a.order - b.order))
  const [preview, setPreview] = useState<string | null>(null)
  const [dragId, setDragId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    softDeleteCollection(id)
    setItems(collections.filter(c => !c.isDeleted).sort((a,b) => a.order - b.order))
  }

  const handleDragStart = (id: string) => setDragId(id)
  const handleDrop = (id: string) => {
    if (!dragId || dragId === id) return
    const arr = items.slice()
    const from = arr.findIndex(c => c.id === dragId)
    const to = arr.findIndex(c => c.id === id)
    const [moved] = arr.splice(from,1)
    arr.splice(to,0,moved)
    reorderCollections(arr.map(c => c.id))
    setItems(arr)
    setDragId(null)
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">คอลเลกชัน</h1>
        <Link href="/dashboard/collections/new"><Button>เพิ่มคอลเลกชัน</Button></Link>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {items.map(col => {
          const count = fabrics.filter(f => f.collectionId === col.id).length
          return (
            <div
              key={col.id}
              draggable
              onDragStart={() => handleDragStart(col.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(col.id)}
              className="border rounded p-4 space-y-2 bg-white"
            >
              <h2 className="font-bold">{col.name}</h2>
              <p className="text-sm text-muted-foreground">{count} ลายผ้า</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setPreview(col.id)}>ดูตัวอย่าง</Button>
                <Link href={`/dashboard/fabrics?collection=${col.id}`} className="flex-1">
                  <Button size="sm" variant="outline" className="w-full">ดูผ้า</Button>
                </Link>
                <Button size="sm" variant="outline" onClick={() => handleDelete(col.id)}>ลบคอลเลกชัน</Button>
              </div>
            </div>
          )
        })}
      </div>
      <ModalWrapper open={!!preview} onClose={() => setPreview(null)}>
        <div className="w-80 space-y-4">
          {preview && fabrics.filter(f => f.collectionId === preview).length > 0 ? (
            fabrics
              .filter(f => f.collectionId === preview)
              .map(f => (
                <div key={f.id} className="relative aspect-square w-full border rounded overflow-hidden">
                  <Image src={f.imageUrl} alt={f.name} fill className="object-cover" />
                </div>
              ))
          ) : (
            <p>ไม่มีลายผ้าในคอลเลกชันนี้</p>
          )}
        </div>
      </ModalWrapper>
    </div>
  )
}
