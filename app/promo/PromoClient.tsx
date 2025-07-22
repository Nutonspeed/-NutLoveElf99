'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/buttons/button'

interface Product { id: string; name: string; image: string }

export default function PromoClient() {
  const [end] = useState(Date.now() + 3600 * 1000)
  const [left, setLeft] = useState(3600)
  const [products, setProducts] = useState<Product[]>([])
  const lang = typeof document !== 'undefined' ? document.documentElement.lang : 'th'
  const th = lang === 'th'

  useEffect(() => {
    fetch('/mock/store/products.json')
      .then((r) => r.json())
      .then((d) => setProducts(d.slice(0, 3)))
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      const diff = Math.max(0, Math.floor((end - Date.now()) / 1000))
      setLeft(diff)
    }, 1000)
    return () => clearInterval(t)
  }, [end])

  const claim = () => {
    fetch('/mock/store/promo-log.json')
      .then((r) => r.json())
      .then((list) => {
        list.push({ ts: Date.now() })
        return fetch('/mock/store/promo-log.json', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(list),
        })
      })
    console.log('track', 'claim promo')
  }

  const format = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    console.log('track', 'view promo')
  }, [])

  return (
    <div className="max-w-lg mx-auto p-6 space-y-4 text-center">
      <h1 className="text-3xl font-bold">{th ? 'โปรโมชันเวลาจำกัด' : 'Limited Time Promo'}</h1>
      <p>{th ? 'เหลือเวลา' : 'Time left'}: {format(left)}</p>
      <div className="grid grid-cols-3 gap-2">
        {products.map((p) => (
          <img key={p.id} src={p.image} alt={p.name} className="border" />
        ))}
      </div>
      <Link href="/store/gallery" onClick={() => console.log('track', 'click cta')}>
        <Button onClick={claim}>{th ? 'รับสิทธิ์เลย' : 'Claim Now'}</Button>
      </Link>
    </div>
  )
}
