"use client"

import { type ReactNode } from "react"
import { AdminStoreProvider, useAdminStore } from "@/contexts/admin-store-context"
import type { Collection } from "@/lib/mock-collections"

export function AdminCollectionsProvider({ children }: { children: ReactNode }) {
  return <AdminStoreProvider>{children}</AdminStoreProvider>
}

export function useAdminCollections() {
  const store = useAdminStore()
  const { collections, addCollection, updateCollection, deleteCollection } = store
  return { collections, addCollection, updateCollection, deleteCollection }
}

