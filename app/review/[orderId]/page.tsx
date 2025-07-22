"use client"
import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Star } from 'lucide-react'

export default function ReviewPage({ params }: { params: { orderId: string } }) {
  const { orderId } = params
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    fetch(`/api/review/${orderId}`).then(r => r.json()).then(d => {
      if (d && d.orderId) setSubmitted(true)
    })
  }, [orderId])

  const toBase64 = (file: File) => new Promise<string>((res, rej) => {
    const reader = new FileReader()
    reader.onload = () => res(reader.result as string)
    reader.onerror = () => rej()
    reader.readAsDataURL(file)
  })

  const submit = async () => {
    if (rating === 0 || submitted) return
    let img
    if (image) {
      try {
        img = await toBase64(image)
      } catch {}
    }
    const res = await fetch(`/api/review/${orderId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating, comment, image: img })
    })
    const data = await res.json()
    if (data.success) setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>ให้คะแนนคำสั่งซื้อ {orderId}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-center">
            {!submitted ? (
              <>
                <div className="flex justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
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
                <input type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)} />
                <Button onClick={submit} disabled={rating === 0} className="w-full">บันทึกรีวิว</Button>
              </>
            ) : (
              <p className="text-green-600">บันทึกรีวิวแล้ว</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
