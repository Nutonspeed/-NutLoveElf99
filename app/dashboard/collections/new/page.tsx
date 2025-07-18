"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addCollection } from '@/mock/collections'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'

export default function NewCollectionPage() {
  const router = useRouter()
  const [name, setName] = useState('')

  const handleSave = () => {
    if (!name.trim()) return
    addCollection({ name })
    router.push('/dashboard/collections')
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">สร้างคอลเลกชันใหม่</h1>
      <div className="space-y-2 w-64">
        <Input placeholder="ชื่อคอลเลกชัน" value={name} onChange={e => setName(e.target.value)} />
        <Button onClick={handleSave} disabled={!name.trim()}>สร้างคอลเลกชัน</Button>
      </div>
    </div>
  )
}
