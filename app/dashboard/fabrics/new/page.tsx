"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addFabric } from '@/core/mock/store'
import { collections } from '@/mock/collections'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'

export default function NewFabricPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [collectionId, setCollectionId] = useState('')

  const handleSave = () => {
    if (!name.trim() || !imageUrl.trim() || !collectionId) return
    addFabric({ name, imageUrl, collectionId })
    router.push('/dashboard/fabrics')
  }

  const activeCollections = collections.filter(c => !c.isDeleted)

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">เพิ่มผ้าใหม่</h1>
      <div className="space-y-2 w-64">
        <Input placeholder="ชื่อผ้า" value={name} onChange={e => setName(e.target.value)} />
        <Input placeholder="รูป URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
        <select value={collectionId} onChange={e => setCollectionId(e.target.value)} className="w-full border rounded p-2">
          <option value="">เลือกคอลเลกชัน</option>
          {activeCollections.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <Button onClick={handleSave} disabled={!name.trim() || !imageUrl.trim() || !collectionId}>เพิ่มผ้า</Button>
      </div>
    </div>
  )
}
