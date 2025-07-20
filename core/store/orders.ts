import { create } from 'zustand'
import type { Order } from '@/types/order'
import { getOrders, addOrder as add, updateOrder as update } from '@/core/mock/store'

interface OrderStore {
  orders: Order[]
  addOrder: (o: Order) => void
  updateOrder: (id: string, data: Partial<Order>) => void
  refresh: () => void
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: getOrders(),
  addOrder: (o) => {
    add(o)
    set({ orders: getOrders() })
  },
  updateOrder: (id, data) => {
    update(id, data)
    set({ orders: getOrders() })
  },
  refresh: () => set({ orders: getOrders() }),
}))
