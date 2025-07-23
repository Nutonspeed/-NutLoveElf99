'use client'
import { useEffect, useRef, useState } from 'react'
import { usePathname, notFound } from 'next/navigation'
import { getBills, getOrders, getCustomers } from '@/core/mock/store'

export default function DebugPage() {
  if (process.env.NODE_ENV === 'production') return notFound()
  const pathname = usePathname()
  const renders = useRef(0)
  renders.current += 1
  const [info, setInfo] = useState({ ua: '', size: 0 })
  useEffect(() => {
    const store = { bills: getBills(), orders: getOrders(), customers: getCustomers() }
    const size = new TextEncoder().encode(JSON.stringify(store)).length
    setInfo({ ua: navigator.userAgent, size })
  }, [])
  return (
    <div className="p-4 space-y-2 text-sm">
      <div>Active route: {pathname}</div>
      <div>Render count: {renders.current}</div>
      <div>Mock store size: {info.size} bytes</div>
      <div>Browser: {info.ua}</div>
    </div>
  )
}

