"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { fabrics as mockFabrics, updateFabric } from '@/mock/fabrics'
import { collections } from '@/mock/collections'
import { Button } from '@/components/ui/buttons/button'
import { Checkbox } from '@/components/ui/checkbox'

export default function BatchEditFabricsPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])
  const [collectionId, setCollectionId] = useState('')

  const handleToggle = (id: string, checked: boolean) => {
    setSelected(prev => checked ? [...prev, id] : prev.filter(i => i !== id))
  }

  const handleSave = () => {
    selected.forEach(id => updateFabric(id, { collectionId }))
    router.push('/dashboard/fabrics')
  }

  const activeCollections = collections.filter(c => !c.isDeleted)

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">แก้ไขหลายรายการ</h1>
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mockFabrics.map(f => (
          <label key={f.id} className="flex items-center space-x-2 border p-2 rounded">
            <Checkbox checked={selected.includes(f.id)} onCheckedChange={c => handleToggle(f.id, !!c)} />
            <span>{f.name}</span>
          </label>
        ))}
      </div>
      <div className="space-y-2 w-64">
        <select value={collectionId} onChange={e => setCollectionId(e.target.value)} className="w-full border rounded p-2">
          <option value="">เลือกคอลเลกชัน</option>
          {activeCollections.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <Button onClick={handleSave} disabled={selected.length === 0 || !collectionId}>บันทึก</Button>
      </div>
    </div>
  )
}
