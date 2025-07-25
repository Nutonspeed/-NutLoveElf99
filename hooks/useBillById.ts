"use client"
import { useEffect, useState } from 'react'
import type { AdminBill } from '@/mock/bills'
import { getBillById } from '@/lib/data/bills'

export function useBillById(id: string) {
  const [bill, setBill] = useState<AdminBill | undefined>(undefined)

  useEffect(() => {
    getBillById(id).then(setBill)
  }, [id])

  useEffect(() => {
    const handler = () => {
      getBillById(id).then(setBill)
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [id])

  return bill
}
