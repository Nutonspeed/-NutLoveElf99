"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/buttons/button'

export default function RequestReviewPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSent(!!localStorage.getItem('reviewRequest-' + id))
    }
  }, [id])

  const send = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('reviewRequest-' + id, '1')
    }
    setSent(true)
    alert(`ส่งลิงก์ /store/review/${id} ให้ลูกค้า (mock)`)
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">ขอรีวิวคำสั่งซื้อ {id}</h1>
      {sent ? (
        <p className="text-green-600">ส่งคำขอไปแล้ว</p>
      ) : (
        <Button onClick={send}>ส่งคำขอรีวิว</Button>
      )}
      <div>
        <Link href={`/dashboard/orders/${id}`}>กลับ</Link>
      </div>
    </div>
  )
}
