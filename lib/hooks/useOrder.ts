'use client'
import { useEffect, useState } from 'react'
import type { OrderType } from '@/lib/schema/order'
import { getOrderById, saveOrder } from '@/lib/store/orderStore'

export function useOrder(orderId: string) {
  const [order, setOrder] = useState<OrderType | undefined>(() => getOrderById(orderId))

  useEffect(() => {
    setOrder(getOrderById(orderId))
  }, [orderId])

  const updateOrderStatus = (status: OrderType['status']) => {
    setOrder(prev => {
      if (!prev) return prev
      const updated = { ...prev, status }
      saveOrder(updated)
      return updated
    })
  }

  return { order, updateOrderStatus }
}
