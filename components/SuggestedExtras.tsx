"use client"

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { mockOrders } from '@/lib/mock-orders'
import { mockProducts } from '@/lib/mock-products'
import { useCart } from '@/contexts/cart-context'

export function SuggestedExtras() {
  const { state, dispatch } = useCart()
  const [selected, setSelected] = useState<string[]>([])

  const suggestions = useMemo(() => {
    const count: Record<string, number> = {}
    for (const o of mockOrders) {
      for (const item of o.items) {
        count[item.productId] = (count[item.productId] || 0) + 1
      }
    }
    const ids = Object.entries(count)
      .sort((a, b) => b[1] - a[1])
      .map(([id]) => id)
    return ids
      .filter((id) => !state.items.some((it) => it.id.startsWith(id)))
      .slice(0, 3)
  }, [state.items])

  const products = mockProducts.filter((p) => suggestions.includes(p.id))

  const toggle = (id: string) => {
    setSelected((curr) =>
      curr.includes(id) ? curr.filter((c) => c !== id) : [...curr, id],
    )
  }

  const addToCart = () => {
    products.forEach((p) => {
      if (selected.includes(p.id)) {
        dispatch({
          type: 'ADD_ITEM',
          payload: {
            id: p.id,
            name: p.name,
            price: p.price,
            image: p.images[0],
            quantity: 1,
          },
        })
      }
    })
    setSelected([])
  }

  if (products.length === 0) return null

  return (
    <div className="space-y-4 mb-8">
      <h2 className="text-xl font-bold">ลูกค้ามักซื้อสิ่งนี้เพิ่ม</h2>
      {products.map((p) => (
        <div key={p.id} className="flex items-center space-x-3">
          <Checkbox checked={selected.includes(p.id)} onCheckedChange={() => toggle(p.id)} />
          <div className="relative w-12 h-12">
            <Image src={p.images[0] || '/placeholder.svg'} alt={p.name} fill className="object-cover rounded" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{p.name}</p>
            <p className="text-sm text-gray-600">฿{p.price.toLocaleString()}</p>
          </div>
        </div>
      ))}
      <Button onClick={addToCart} disabled={selected.length === 0}>เพิ่มสินค้า</Button>
    </div>
  )
}
