"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { Collection } from "@/lib/mock-collections"
import { useAdminStore } from "./admin-store"

interface AdminCollectionsContextValue {
  collections: Collection[]
  addCollection: (data: Omit<Collection, "id">) => void
  updateCollection: (id: string, data: Partial<Collection>) => void
  deleteCollection: (id: string) => void
}

const AdminCollectionsContext = createContext<AdminCollectionsContextValue | null>(null)

export function AdminCollectionsProvider({ children }: { children: ReactNode }) {
  const store = useAdminStore((state) => ({
    collections: state.collections,
    addCollection: state.addCollection,
    updateCollection: state.updateCollection,
    deleteCollection: state.deleteCollection,
  }))

  return (
    <AdminCollectionsContext.Provider value={store}>
      {children}
    </AdminCollectionsContext.Provider>
  )
}

export function useAdminCollections() {
  const ctx = useContext(AdminCollectionsContext)
  if (!ctx) throw new Error("useAdminCollections must be used within AdminCollectionsProvider")
  return ctx
}

