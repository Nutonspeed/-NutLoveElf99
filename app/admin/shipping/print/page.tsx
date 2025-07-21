"use client"
import { useEffect, useState } from 'react'
import ShippingLabel from '@/components/shipping/ShippingLabel'
import billDetails from '@/mock/bill.detail.json'

export default function PrintAllLabelsPage({ searchParams }: { searchParams: { ids?: string } }) {
  const [ids, setIds] = useState<string[]>([])

  useEffect(() => {
    if (searchParams.ids) {
      setIds(searchParams.ids.split(','))
    }
  }, [searchParams.ids])

  useEffect(() => {
    if (ids.length > 0 && typeof window !== 'undefined') {
      setTimeout(() => window.print(), 500)
    }
  }, [ids])

  const details = billDetails as any[]
  const toPrint = details.filter(b => ids.includes(b.id))

  return (
    <div className="p-4 space-y-4">
      {toPrint.map(b => (
        <ShippingLabel
          key={b.id}
          name={b.customer.name}
          address={b.customer.address}
          phone={b.customer.phone}
          orderId={b.id}
        />
      ))}
    </div>
  )
}
