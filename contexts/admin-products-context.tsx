"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { mockProducts } from "@/lib/mock-products"
import type { Product } from "@/types/product"

interface AdminProductsContextValue {
  products: Product[]
  addProduct: (data: Omit<Product, "id">) => void
  updateProduct: (id: string, data: Partial<Product>) => void
  deleteProduct: (id: string) => void
}

const AdminProductsContext = createContext<AdminProductsContextValue | null>(null)

export function AdminProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useLocalStorage<Product[]>("admin-products", mockProducts)

  const addProduct = (data: Omit<Product, "id">) => {
    const newProduct: Product = { id: Date.now().toString(), ...data }
    setProducts((prev) => [...prev, newProduct])
  }

  const updateProduct = (id: string, data: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)))
  }

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <AdminProductsContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </AdminProductsContext.Provider>
  )
}

export function useAdminProducts() {
  const ctx = useContext(AdminProductsContext)
  if (!ctx) throw new Error("useAdminProducts must be used within AdminProductsProvider")
  return ctx
}

