"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { fabrics as fabricsMock, updateFabric } from '@/mock/fabrics'
import { collections } from '@/mock/collections'
import { Button } from '@/components/ui/buttons/button'
import { Checkbox } from '@/components/ui/checkbox'
import EmptyState from '@/components/ui/EmptyState'

export default function BatchEditFabricsPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])
  const [collectionId, setCollectionId] = useState('')

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    )
  }

  const handleSave = () => {
    selected.forEach(id => {
      updateFabric(id, { collectionId })
    })
    router.push('/dashboard/fabrics')
  }

  const activeCollections = collections.filter(c => !c.isDeleted)

  if (fabricsMock.length === 0) {
    return <EmptyState title="ยังไม่มีลายผ้าในระบบ" />
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">แก้ไขหลายลายผ้า</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {fabricsMock.map(f => (
          <label key={f.id} className="flex items-center gap-2">
            <Checkbox
              checked={selected.includes(f.id)}
              onCheckedChange={() => toggle(f.id)}
            />
            <span>{f.name}</span>
          </label>
        ))}
      </div>
      <div className="space-y-2 w-64">
        <select
          className="w-full border rounded p-2"
          value={collectionId}
          onChange={e => setCollectionId(e.target.value)}
        >
          <option value="">เลือกคอลเลกชัน</option>
          {activeCollections.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <Button
          onClick={handleSave}
          disabled={selected.length === 0 || !collectionId}
        >
          บันทึก
        </Button>
      </div>
    </div>
  )
}
