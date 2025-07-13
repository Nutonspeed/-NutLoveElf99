"use client"

import { createContext, useContext, type ReactNode } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { mockProductGroups, type ProductGroup } from '@/lib/mock-product-groups'

interface AdminProductGroupsContextValue {
  groups: ProductGroup[]
  addGroup: (data: Omit<ProductGroup, 'id'>) => void
  updateGroup: (id: string, data: Partial<ProductGroup>) => void
  deleteGroup: (id: string) => void
}

const AdminProductGroupsContext = createContext<AdminProductGroupsContextValue | null>(null)

export function AdminProductGroupsProvider({ children }: { children: ReactNode }) {
  const [groups, setGroups] = useLocalStorage<ProductGroup[]>('admin-product-groups', mockProductGroups)

  const addGroup = (data: Omit<ProductGroup, 'id'>) => {
    const newGroup: ProductGroup = { id: Date.now().toString(), ...data }
    setGroups(prev => [...prev, newGroup])
  }

  const updateGroup = (id: string, data: Partial<ProductGroup>) => {
    setGroups(prev => prev.map(g => (g.id === id ? { ...g, ...data } : g)))
  }

  const deleteGroup = (id: string) => {
    setGroups(prev => prev.filter(g => g.id !== id))
  }

  return (
    <AdminProductGroupsContext.Provider value={{ groups, addGroup, updateGroup, deleteGroup }}>
      {children}
    </AdminProductGroupsContext.Provider>
  )
}

export function useAdminProductGroups() {
  const ctx = useContext(AdminProductGroupsContext)
  if (!ctx) throw new Error('useAdminProductGroups must be used within AdminProductGroupsProvider')
  return ctx
}
