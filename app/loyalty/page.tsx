"use client"
import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/buttons/button'
import Link from 'next/link'

interface Record { phone: string; points: number }

export default function LoyaltyPage() {
  const [phone, setPhone] = useState('')
  const [points, setPoints] = useState<number | null>(null)

  const check = async () => {
    const res = await fetch('/mock/store/loyalty.json')
    const data: Record[] = await res.json()
    const r = data.find(d => d.phone === phone)
    setPoints(r ? r.points : 0)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1 space-y-6">
        <h1 className="text-3xl font-bold text-center">โปรแกรมสะสมแต้ม</h1>
        <p className="text-center">สะสม 1 แต้มทุกการซื้อครบ 100 บาท แลกส่วนลดได้เมื่อครบ 100 แต้ม</p>
        <div className="flex justify-center gap-2">
          <input className="border rounded p-2" placeholder="เบอร์โทร" value={phone} onChange={e => setPhone(e.target.value)} />
          <Button onClick={check}>ตรวจสอบ</Button>
        </div>
        {points !== null && (
          <p className="text-center">คุณมี {points} แต้ม</p>
        )}
        <p className="text-center">
          ให้รีวิวสินค้าเพื่อรับแต้มเพิ่มเติม <Link href="/review/test" className="text-blue-600 underline">คลิกที่นี่</Link>
        </p>
      </div>
      <Footer />
    </div>
  )
}
