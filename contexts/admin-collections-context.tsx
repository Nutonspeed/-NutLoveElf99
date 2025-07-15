"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { mockCollections } from "@/lib/mock-collections"
import type { Collection } from "@/lib/mock-collections"

interface AdminCollectionsContextValue {
  collections: Collection[]
  addCollection: (data: Omit<Collection, "id">) => void
  updateCollection: (id: string, data: Partial<Collection>) => void
  deleteCollection: (id: string) => void
}

const AdminCollectionsContext = createContext<AdminCollectionsContextValue | null>(null)

export function AdminCollectionsProvider({ children }: { children: ReactNode }) {
  const [collections, setCollections] = useLocalStorage<Collection[]>("admin-collections", mockCollections)

  const addCollection = (data: Omit<Collection, "id">) => {
    const newCollection: Collection = {
      id: Date.now().toString(),
      fabricIds: [],
      ...data,
    }
    setCollections((prev) => [...prev, newCollection])
  }

  const updateCollection = (id: string, data: Partial<Collection>) => {
    setCollections((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)))
  }

  const deleteCollection = (id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <AdminCollectionsContext.Provider
      value={{ collections, addCollection, updateCollection, deleteCollection }}
    >
      {children}
    </AdminCollectionsContext.Provider>
  )
}

export function useAdminCollections() {
  const ctx = useContext(AdminCollectionsContext)
  if (!ctx) throw new Error("useAdminCollections must be used within AdminCollectionsProvider")
  return ctx
}

