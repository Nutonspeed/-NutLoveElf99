"use client"
import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getFabrics, updateFabric } from '@/core/mock/store'
import { collections } from '@/mock/collections'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'

export default function EditFabricPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const fabric = getFabrics().find(f => f.id === params.id)
  const [name, setName] = useState(fabric?.name || '')
  const [imageUrl, setImageUrl] = useState(fabric?.imageUrl || '')
  const [collectionId, setCollectionId] = useState(fabric?.collectionId || '')

  if (!fabric) {
    return <div className="p-8">ไม่พบลายผ้านี้</div>
  }

  const handleSave = () => {
    if (!name.trim() || !imageUrl.trim() || !collectionId) return
    updateFabric(fabric.id, { name, imageUrl, collectionId })
    router.push('/dashboard/fabrics')
  }

  const activeCollections = collections.filter(c => !c.isDeleted)

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">แก้ไขผ้า</h1>
      <div className="space-y-2 w-64">
        <Input value={name} onChange={e => setName(e.target.value)} />
        <Input value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
        <select value={collectionId} onChange={e => setCollectionId(e.target.value)} className="w-full border rounded p-2">
          <option value="">เลือกคอลเลกชัน</option>
          {activeCollections.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <Button onClick={handleSave} disabled={!name.trim() || !imageUrl.trim() || !collectionId}>บันทึก</Button>
      </div>
    </div>
  )
}
