"use client"
import { useEffect, useState } from 'react'

export interface BillItem { name: string; quantity: number; price: number }
export interface BillData {
  id: string
  customer: { name: string; address: string; phone: string }
  items: BillItem[]
  discount?: number
  shipping?: number
  note?: string
}

export function useBillData(id: string) {
  const [bill, setBill] = useState<BillData | null>(null)

  useEffect(() => {
    fetch(`/api/mock/bill/${id}`)
      .then((r) => r.json())
      .then(setBill)
      .catch(() => setBill(null))
  }, [id])

  return bill
}
