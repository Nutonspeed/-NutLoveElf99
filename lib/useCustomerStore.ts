"use client"
import { create } from 'zustand'
import type { Customer } from './mock-customers'

interface CustomerSelectionState {
  selected: Customer | null
  setSelected: (c: Customer | null) => void
}

export const useCustomerStore = create<CustomerSelectionState>((set) => ({
  selected: null,
  setSelected: (c) => set({ selected: c }),
}))
