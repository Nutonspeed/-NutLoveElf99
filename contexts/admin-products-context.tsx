"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { Product } from "@/types/product"
import { useAdminStore } from "./admin-store"

interface AdminProductsContextValue {
  products: Product[]
  addProduct: (data: Omit<Product, "id">) => void
  updateProduct: (id: string, data: Partial<Product>) => void
  deleteProduct: (id: string) => void
}

const AdminProductsContext = createContext<AdminProductsContextValue | null>(null)

export function AdminProductsProvider({ children }: { children: ReactNode }) {
  const store = useAdminStore((state) => ({
    products: state.products,
    addProduct: state.addProduct,
    updateProduct: state.updateProduct,
    deleteProduct: state.deleteProduct,
  }))

  return (
    <AdminProductsContext.Provider value={store}>
      {children}
    </AdminProductsContext.Provider>
  )
}

export function useAdminProducts() {
  const ctx = useContext(AdminProductsContext)
  if (!ctx) throw new Error("useAdminProducts must be used within AdminProductsProvider")
  return ctx
}

