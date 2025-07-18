"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { getCollection, updateCollection } from '@/mock/collections'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'

export default function EditCollectionPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const collection = getCollection(params.id)

  const [name, setName] = useState(collection?.name || '')

  if (!collection) {
    return <div className="p-8">ไม่พบคอลเลกชันนี้</div>
  }

  const handleSave = () => {
    if (!name.trim()) return
    updateCollection(collection.id, { name })
    router.push('/dashboard/collections')
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">แก้ไขคอลเลกชัน</h1>
      <div className="space-y-2 w-64">
        <Input value={name} onChange={e => setName(e.target.value)} />
        <Button onClick={handleSave} disabled={!name.trim()}>บันทึก</Button>
      </div>
    </div>
  )
}
