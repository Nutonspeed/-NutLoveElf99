"use client"

import { createContext, useContext, type ReactNode } from 'react'
import { type ProductGroup } from '@/lib/mock-product-groups'
import { useAdminStore } from '@/core/store'

type AdminProductGroupsContextValue = {
  groups: ProductGroup[]
  addGroup: (data: Omit<ProductGroup, 'id'>) => void
  updateGroup: (id: string, data: Partial<ProductGroup>) => void
  deleteGroup: (id: string) => void
}

const AdminProductGroupsContext = createContext<AdminProductGroupsContextValue | null>(null)

export function AdminProductGroupsProvider({ children }: { children: ReactNode }) {
  const store = useAdminStore()

  const value = {
    groups: store.productGroups,
    addGroup: store.addGroup,
    updateGroup: store.updateGroup,
    deleteGroup: store.deleteGroup,
  }

  return (
    <AdminProductGroupsContext.Provider value={value}>
      {children}
    </AdminProductGroupsContext.Provider>
  )
}

export function useAdminProductGroups() {
  const ctx = useContext(AdminProductGroupsContext)
  if (!ctx) throw new Error('useAdminProductGroups must be used within AdminProductGroupsProvider')
  return ctx
}
