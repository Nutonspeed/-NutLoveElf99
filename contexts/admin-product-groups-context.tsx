"use client"

import { createContext, useContext, type ReactNode } from 'react'
import { useAdminStore } from './admin-store'
import type { ProductGroup } from '@/lib/mock-product-groups'

interface AdminProductGroupsContextValue {
  groups: ProductGroup[]
  addGroup: (data: Omit<ProductGroup, 'id'>) => void
  updateGroup: (id: string, data: Partial<ProductGroup>) => void
  deleteGroup: (id: string) => void
}

const AdminProductGroupsContext = createContext<AdminProductGroupsContextValue | null>(null)

export function AdminProductGroupsProvider({ children }: { children: ReactNode }) {
  const store = useAdminStore((state) => ({
    groups: state.groups,
    addGroup: state.addGroup,
    updateGroup: state.updateGroup,
    deleteGroup: state.deleteGroup,
  }))

  return (
    <AdminProductGroupsContext.Provider value={store}>
      {children}
    </AdminProductGroupsContext.Provider>
  )
}

export function useAdminProductGroups() {
  const ctx = useContext(AdminProductGroupsContext)
  if (!ctx) throw new Error('useAdminProductGroups must be used within AdminProductGroupsProvider')
  return ctx
}
