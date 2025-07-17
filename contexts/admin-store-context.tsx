"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { mockProducts } from "@/lib/mock-products"
import { mockCollections, type Collection } from "@/lib/mock-collections"
import { mockProductGroups, type ProductGroup } from "@/lib/mock-product-groups"
import type { Product } from "@/types/product"
import { addAdminLog } from "@/lib/mock-admin-logs"

interface AdminStoreState {
  products: Product[]
  collections: Collection[]
  groups: ProductGroup[]
}

interface AdminStore extends AdminStoreState {
  addProduct: (data: Omit<Product, "id">) => void
  updateProduct: (id: string, data: Partial<Product>) => void
  deleteProduct: (id: string) => void
  addCollection: (data: Omit<Collection, "id">) => void
  updateCollection: (id: string, data: Partial<Collection>) => void
  deleteCollection: (id: string) => void
  addGroup: (data: Omit<ProductGroup, "id">) => void
  updateGroup: (id: string, data: Partial<ProductGroup>) => void
  deleteGroup: (id: string) => void
}

const AdminStoreContext = createContext<AdminStore | null>(null)

const DEFAULT_STATE: AdminStoreState = {
  products: mockProducts,
  collections: mockCollections,
  groups: mockProductGroups,
}

export function AdminStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useLocalStorage<AdminStoreState>(
    "admin-store",
    DEFAULT_STATE
  )

  const addProduct = (data: Omit<Product, "id">) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      status: "active",
      ...data,
    }
    setState((prev) => ({ ...prev, products: [...prev.products, newProduct] }))
    addAdminLog(`add product ${newProduct.id}`, "mockAdminId")
  }

  const updateProduct = (id: string, data: Partial<Product>) => {
    setState((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === id ? { ...p, ...data } : p)),
    }))
    addAdminLog(`update product ${id}`, "mockAdminId")
  }

  const deleteProduct = (id: string) => {
    setState((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }))
    addAdminLog(`delete product ${id}`, "mockAdminId")
  }

  const addCollection = (data: Omit<Collection, "id">) => {
    const newCollection: Collection = { id: Date.now().toString(), ...data }
    setState((prev) => ({
      ...prev,
      collections: [...prev.collections, newCollection],
    }))
  }

  const updateCollection = (id: string, data: Partial<Collection>) => {
    setState((prev) => ({
      ...prev,
      collections: prev.collections.map((c) =>
        c.id === id ? { ...c, ...data } : c
      ),
    }))
  }

  const deleteCollection = (id: string) => {
    setState((prev) => ({
      ...prev,
      collections: prev.collections.filter((c) => c.id !== id),
    }))
  }

  const addGroup = (data: Omit<ProductGroup, "id">) => {
    const newGroup: ProductGroup = { id: Date.now().toString(), ...data }
    setState((prev) => ({ ...prev, groups: [...prev.groups, newGroup] }))
  }

  const updateGroup = (id: string, data: Partial<ProductGroup>) => {
    setState((prev) => ({
      ...prev,
      groups: prev.groups.map((g) => (g.id === id ? { ...g, ...data } : g)),
    }))
  }

  const deleteGroup = (id: string) => {
    setState((prev) => ({
      ...prev,
      groups: prev.groups.filter((g) => g.id !== id),
    }))
  }

  return (
    <AdminStoreContext.Provider
      value={{
        ...state,
        addProduct,
        updateProduct,
        deleteProduct,
        addCollection,
        updateCollection,
        deleteCollection,
        addGroup,
        updateGroup,
        deleteGroup,
      }}
    >
      {children}
    </AdminStoreContext.Provider>
  )
}

export function useAdminStore() {
  const ctx = useContext(AdminStoreContext)
  if (!ctx) throw new Error("useAdminStore must be used within AdminStoreProvider")
  return ctx
}
