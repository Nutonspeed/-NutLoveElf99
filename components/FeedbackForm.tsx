"use client"
import { useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Textarea } from '@/components/ui/textarea'
import { useBillStore } from '@/core/store'

export default function FeedbackForm({ billId, onSubmitted }: { billId: string; onSubmitted?: () => void }) {
  const store = useBillStore()
  const [rating, setRating] = useState(0)
  const [msg, setMsg] = useState('')

  const submit = () => {
    if (!rating) return
    store.setFeedback(billId, {
      rating,
      message: msg || undefined,
      date: new Date().toISOString(),
    })
    if (onSubmitted) onSubmitted()
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            onClick={() => setRating(i + 1)}
            className={`h-5 w-5 cursor-pointer ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <Textarea
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        rows={3}
        placeholder="แสดงความคิดเห็น (ไม่จำเป็น)"
      />
      <Button onClick={submit} disabled={rating === 0} className="w-full">
        ส่งความคิดเห็น
      </Button>
    </div>
  )
}
