"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useAdminStore } from "./admin-store"

type AdminProductsContextValue = ReturnType<typeof useAdminStore>

const AdminProductsContext = createContext<AdminProductsContextValue | null>(null)

export function AdminProductsProvider({ children }: { children: ReactNode }) {
  const store = useAdminStore()

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

