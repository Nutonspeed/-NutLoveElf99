"use client"
import { useEffect, useState } from 'react'
import type { AdminBill } from '@/mock/bills'
import { getBill } from '@/core/mock/store'

export function useBillById(id: string) {
  const [bill, setBill] = useState<AdminBill | undefined>(() => getBill(id))

  useEffect(() => {
    setBill(getBill(id))
  }, [id])

  useEffect(() => {
    const handler = () => setBill(getBill(id))
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [id])

  return bill
}
