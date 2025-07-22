'use client'
import { useEffect, useRef, useState } from 'react'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

export function generateMetadata(): Metadata {
  const lang = headers().get('accept-language') || ''
  const th = lang.includes('th')
  return {
    title: th ? 'การสั่งซื้อแบบเรียลไทม์' : 'Live Order Feed',
    description: th ? 'ออเดอร์ใหม่กำลังเข้ามา' : 'Recent orders streaming',
  }
}

interface Item { province: string; product: string }

export default function LiveFeedPage() {
  const [items, setItems] = useState<Item[]>([])
  const box = useRef<HTMLDivElement>(null)
  const lang = typeof document !== 'undefined' ? document.documentElement.lang : 'th'
  const th = lang === 'th'

  useEffect(() => {
    fetch('/mock/store/live-orders.json')
      .then((r) => r.json())
      .then(setItems)
  }, [])

  useEffect(() => {
    if (!items.length) return
    const id = setInterval(() => {
      setItems((prev) => {
        const [first, ...rest] = prev
        return [...rest, first]
      })
    }, 3000)
    return () => clearInterval(id)
  }, [items])

  useEffect(() => {
    if (box.current) box.current.scrollTop = box.current.scrollHeight
  }, [items])

  return (
    <div className="max-w-md mx-auto p-4">
      <div ref={box} className="h-64 overflow-y-auto space-y-2 scroll-smooth">
        {items.map((o, i) => (
          <p key={i} className="animate-fade">
            {th ? `ลูกค้าจาก ${o.province} เพิ่งสั่ง ${o.product}` : `User from ${o.province} just ordered ${o.product}`}
          </p>
        ))}
      </div>
    </div>
  )
}
