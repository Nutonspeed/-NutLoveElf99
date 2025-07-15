"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import {
  mockCollections,
  addCollection as addCollectionLib,
  updateCollection as updateCollectionLib,
  revertCollection as revertCollectionLib,
} from "@/lib/mock-collections"
import { loadCollections } from "@/lib/mock-collections"
import type { Collection, CollectionData } from "@/types/collection"

interface AdminCollectionsContextValue {
  collections: Collection[]
  addCollection: (data: Omit<CollectionData, 'id' | 'version' | 'guide' | 'guideAddedBy'>) => void
  updateCollection: (id: string, data: Partial<CollectionData>) => void
  revertCollection: (id: string) => void
  deleteCollection: (id: string) => void
}

const AdminCollectionsContext = createContext<AdminCollectionsContextValue | null>(null)

export function AdminCollectionsProvider({ children }: { children: ReactNode }) {
  const [collections, setCollections] = useLocalStorage<Collection[]>("admin-collections", mockCollections)

  const addCollection = (data: Omit<CollectionData, 'id' | 'version' | 'guide' | 'guideAddedBy'>) => {
    const col = addCollectionLib(data)
    setCollections(loadCollections())
    return col
  }

  const updateCollection = (id: string, data: Partial<CollectionData>) => {
    const col = updateCollectionLib(id, data)
    if (col) setCollections(loadCollections())
  }

  const revertCollection = (id: string) => {
    const col = revertCollectionLib(id)
    if (col) setCollections(loadCollections())
  }

  const deleteCollection = (id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <AdminCollectionsContext.Provider
      value={{ collections, addCollection, updateCollection, revertCollection, deleteCollection }}
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

