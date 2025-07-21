"use client"
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/cards/card'

interface Feedback {
  id: string
  rating: number
  message?: string
  public?: boolean
}

export default function StoreReviewsPage() {
  const [list, setList] = useState<Feedback[]>([])
  useEffect(() => {
    fetch('/api/feedback')
      .then((r) => r.json())
      .then((d) => setList((d.feedback || []).filter((f: Feedback) => (f.public || f.tags?.includes('👍 featured')) && f.rating >= 4)))
  }, [])

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      {list.map((f) => (
        <Card key={f.id} className="p-4">
          <p className="font-semibold">{f.message}</p>
          <p className="text-sm text-gray-500">{f.rating} stars</p>
        </Card>
      ))}
      {list.length === 0 && <p className="text-center text-sm text-gray-500">No reviews</p>}
    </div>
  )
}
