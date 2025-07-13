"use client"

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getFabricRanking } from '@/lib/get-fabric-ranking'

export default function AdminRankingPage() {
  const [ranking, setRanking] = useState(getFabricRanking())

  const onDragStart = (e: React.DragEvent<HTMLLIElement>, idx: number) => {
    e.dataTransfer.setData('idx', idx.toString())
  }
  const onDrop = (e: React.DragEvent<HTMLLIElement>, idx: number) => {
    const from = Number(e.dataTransfer.getData('idx'))
    if (from === idx) return
    const items = [...ranking]
    const [moved] = items.splice(from, 1)
    items.splice(idx, 0, moved)
    setRanking(items)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin/analytics">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">จัดอันดับผ้า</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>ลากเพื่อเปลี่ยนลำดับ</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 list-decimal list-inside">
              {ranking.map((f, idx) => (
                <li
                  key={f.slug}
                  draggable
                  onDragStart={(e) => onDragStart(e, idx)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => onDrop(e, idx)}
                  className="border p-2 rounded bg-white"
                >
                  {f.name} <span className="text-gray-600">({f.count})</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
