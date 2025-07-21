"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getFabrics, updateFabric } from '@/core/mock/store'
import { collections } from '@/mock/collections'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/buttons/button'
import { useToast } from '@/hooks/use-toast'

export default function BatchEditFabricPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [collectionId, setCollectionId] = useState('')

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    )
  }

  const handleSave = () => {
    selectedIds.forEach(id => updateFabric(id, { collectionId }))
    toast({ title: 'บันทึกการแก้ไขแล้ว' })
    router.push('/dashboard/fabrics')
  }

  const activeCollections = collections.filter(c => !c.isDeleted)

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">แก้ไขคอลเลกชันผ้าหลายรายการ</h1>
      <div className="space-y-2">
        {getFabrics().map(f => (
          <label key={f.id} className="flex items-center gap-2">
            <Checkbox
              checked={selectedIds.includes(f.id)}
              onCheckedChange={() => toggleSelect(f.id)}
            />
            <span>{f.name}</span>
          </label>
        ))}
      </div>
      <select
        value={collectionId}
        onChange={e => setCollectionId(e.target.value)}
        className="w-64 border rounded p-2"
      >
        <option value="">เลือกคอลเลกชัน</option>
        {activeCollections.map(c => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <Button onClick={handleSave} disabled={selectedIds.length === 0 || !collectionId}>
        บันทึก
      </Button>
    </div>
  )
}
