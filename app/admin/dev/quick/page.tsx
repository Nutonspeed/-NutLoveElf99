'use client'
import { Button } from '@/components/ui/buttons/button'
import { GripVertical, FileText, Upload, FolderDown, MessageSquare } from 'lucide-react'
import { useState } from 'react'

const actions = [
  { id: 'create', label: 'Create Bill', icon: <FileText />, href: '/admin/bills' },
  { id: 'labels', label: 'Print Labels', icon: <Upload />, href: '/admin/shipping/labels' },
  { id: 'csv', label: 'Export CSV', icon: <FolderDown />, href: '/admin/bills' },
  { id: 'feedback', label: 'Check Feedback', icon: <MessageSquare />, href: '/admin/reviews' },
]

export default function DevQuickPage() {
  const [items, setItems] = useState(actions)
  // mock-only drag reorder
  const move = (from: number, to: number) => {
    const updated = [...items]
    const [it] = updated.splice(from, 1)
    updated.splice(to, 0, it)
    setItems(updated)
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Quick Access</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map((a, idx) => (
          <Button
            key={a.id}
            asChild
            className="flex flex-col items-center py-6"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', idx.toString())
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const from = Number(e.dataTransfer.getData('text/plain'))
              move(from, idx)
            }}
          >
            <a href={a.href} className="flex flex-col items-center space-y-2">
              {a.icon}
              <span>{a.label}</span>
              <GripVertical className="opacity-50" />
            </a>
          </Button>
        ))}
      </div>
    </div>
  )
}
