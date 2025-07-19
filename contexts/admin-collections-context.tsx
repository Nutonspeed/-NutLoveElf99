"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { Collection } from "@/lib/mock-collections"
import { useAdminStore } from "@/core/store"

type AdminCollectionsContextValue = {
  collections: Collection[]
  addCollection: (data: Omit<Collection, "id">) => void
  updateCollection: (id: string, data: Partial<Collection>) => void
  deleteCollection: (id: string) => void
}

const AdminCollectionsContext = createContext<AdminCollectionsContextValue | null>(null)

export function AdminCollectionsProvider({ children }: { children: ReactNode }) {
  const store = useAdminStore()

  const value = {
    collections: store.collections,
    addCollection: store.addCollection,
    updateCollection: store.updateCollection,
    deleteCollection: store.deleteCollection,
  }

  return (
    <AdminCollectionsContext.Provider value={value}>
      {children}
    </AdminCollectionsContext.Provider>
  )
}

export function useAdminCollections() {
  const ctx = useContext(AdminCollectionsContext)
  if (!ctx) throw new Error("useAdminCollections must be used within AdminCollectionsProvider")
  return ctx
}

