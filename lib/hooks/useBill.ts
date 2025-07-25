"use client"
import { useEffect, useState } from 'react'
import type { Bill } from '../data/bills'
import { getBillById } from '../data/bills'

export function useBill(id: string) {
  const [bill, setBill] = useState<Bill | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getBillById(id).then(b => {
      setBill(b)
      setLoading(false)
    })
  }, [id])

  return { bill, loading }
}
