"use client"

import { type ReactNode } from 'react'
import { AdminStoreProvider, useAdminStore } from '@/contexts/admin-store-context'
import { type ProductGroup } from '@/lib/mock-product-groups'

export function AdminProductGroupsProvider({ children }: { children: ReactNode }) {
  return <AdminStoreProvider>{children}</AdminStoreProvider>
}

export function useAdminProductGroups() {
  const store = useAdminStore()
  const { groups, addGroup, updateGroup, deleteGroup } = store
  return { groups, addGroup, updateGroup, deleteGroup }
}
