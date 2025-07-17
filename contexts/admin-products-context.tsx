"use client"

import { type ReactNode } from "react"
import { AdminStoreProvider, useAdminStore } from "@/contexts/admin-store-context"
import type { Product } from "@/types/product"

export function AdminProductsProvider({ children }: { children: ReactNode }) {
  return <AdminStoreProvider>{children}</AdminStoreProvider>
}

export function useAdminProducts() {
  const store = useAdminStore()
  const { products, addProduct, updateProduct, deleteProduct } = store
  return { products, addProduct, updateProduct, deleteProduct }
}

