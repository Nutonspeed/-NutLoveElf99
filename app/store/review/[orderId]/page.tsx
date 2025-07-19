"use client"
import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/buttons/button'
import { Star } from 'lucide-react'
import { addReview, getReviews } from '@/core/mock/store'

export default function ReviewPage({ params }: { params: { orderId: string } }) {
  const { orderId } = params
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setSubmitted(getReviews().some(r => r.orderId === orderId))
  }, [orderId])

  const submit = () => {
    if (rating === 0 || submitted) return
    const ok = addReview({ orderId, rating, comment, createdAt: new Date().toISOString() })
    if (ok) setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto space-y-4 text-center">
          <h1 className="text-xl font-bold">ให้คะแนนคำสั่งซื้อ {orderId}</h1>
          {!submitted ? (
            <>
              <div className="flex justify-center space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    onClick={() => setRating(i + 1)}
                    className={`h-5 w-5 cursor-pointer ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <textarea
                className="w-full border rounded p-2 text-sm"
                rows={3}
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="แสดงความคิดเห็น"
              />
              <Button className="w-full" onClick={submit}>ส่งรีวิว</Button>
            </>
          ) : (
            <p className="text-green-600">บันทึกรีวิวแล้ว</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
