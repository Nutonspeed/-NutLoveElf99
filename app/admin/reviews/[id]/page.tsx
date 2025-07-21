"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Textarea } from '@/components/ui/textarea'

interface Feedback {
  id: string
  billId: string
  rating: number
  message?: string
  timestamp: string
  reply?: { message: string; date: string }
  tags?: string[]
}

export default function ReviewDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [fb, setFb] = useState<Feedback | null>(null)
  const [reply, setReply] = useState('')
  useEffect(() => {
    fetch(`/api/feedback?id=${id}`)
      .then((r) => r.json())
      .then((d) => setFb(d.feedback))
  }, [id])

  const sendReply = () => {
    fetch('/api/feedback', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, reply: { message: reply, date: new Date().toISOString() } }),
    }).then(() => {
      setFb((f) => (f ? { ...f, reply: { message: reply, date: new Date().toISOString() } } : f))
      setReply('')
    })
  }

  if (!fb) return <div className="p-4">Loading...</div>
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin/reviews">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Review Detail</h1>
        </div>
        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>Bill {fb.billId}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Rating: {fb.rating}</p>
            <p>Comment: {fb.message}</p>
            <p>Date: {new Date(fb.timestamp).toLocaleString()}</p>
            {fb.reply && (
              <div className="border-t pt-2 text-sm text-gray-600">
                <p>Reply: {fb.reply.message}</p>
                <p>{new Date(fb.reply.date).toLocaleString()}</p>
              </div>
            )}
            <Textarea value={reply} onChange={(e) => setReply(e.target.value)} rows={3} className="mt-2" />
            <Button onClick={sendReply} disabled={!reply} className="mt-2">
              Send Reply
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
