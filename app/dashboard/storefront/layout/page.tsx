"use client"
import { useEffect, useState } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/buttons/button'
import { getConfig, setLayout } from '@/core/mock/store'
import type { LayoutComponent, LayoutComponentType } from '@/types/storefront'

const options: { label: string; type: LayoutComponentType }[] = [
  { label: 'Banner', type: 'banner' },
  { label: 'Product List', type: 'product' },
  { label: 'CTA', type: 'cta' },
  { label: 'Review', type: 'review' },
]

export default function LayoutBuilderPage() {
  const [items, setItems] = useState<LayoutComponent[]>([])
  const [dragId, setDragId] = useState<string | null>(null)

  useEffect(() => {
    const cfg = getConfig()
    setItems(cfg.layout.length ? cfg.layout : [])
  }, [])

  const addComponent = (type: LayoutComponentType) =>
    setItems((it) => [...it, { id: Date.now().toString(), type }])

  const handleDragStart = (id: string) => setDragId(id)
  const handleDrop = (id: string) => {
    if (!dragId || dragId === id) return
    const arr = items.slice()
    const from = arr.findIndex((i) => i.id === dragId)
    const to = arr.findIndex((i) => i.id === id)
    const [m] = arr.splice(from, 1)
    arr.splice(to, 0, m)
    setItems(arr)
    setDragId(null)
  }

  const handleSave = () => setLayout(items)

  return (
    <div className="container mx-auto py-8 space-y-4">
      <SectionHeader title="หน้าแรก" description="Drag & Drop ปรับลำดับ" />
      <div className="flex gap-2">
        {options.map((o) => (
          <Button key={o.type} variant="outline" onClick={() => addComponent(o.type)}>
            {o.label}
          </Button>
        ))}
      </div>
      <div className="space-y-2">
        {items.map((it) => (
          <div
            key={it.id}
            draggable
            onDragStart={() => handleDragStart(it.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(it.id)}
            className="border p-2 rounded bg-white"
          >
            {it.type}
          </div>
        ))}
      </div>
      <Button onClick={handleSave}>บันทึก Layout</Button>
    </div>
  )
}
