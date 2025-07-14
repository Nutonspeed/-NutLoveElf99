"use client"
import { createContext, useContext, useState, type ReactNode } from "react"

export const mockUser = {
  id: "user-001",
  name: "คุณลูกค้าจำลอง",
  role: "customer",
}

export const mockAdmin = {
  id: "admin-001",
  name: "คุณแอดมิน",
  role: "admin",
}

interface MockAuthState {
  user: typeof mockUser | typeof mockAdmin | null
  loginAsUser: () => void
  loginAsAdmin: () => void
  logout: () => void
}

const MockAuthContext = createContext<MockAuthState | null>(null)

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockAuthState["user"]>(null)

  const loginAsUser = () => setUser(mockUser)
  const loginAsAdmin = () => setUser(mockAdmin)
  const logout = () => setUser(null)

  return (
    <MockAuthContext.Provider value={{ user, loginAsUser, loginAsAdmin, logout }}>
      {children}
    </MockAuthContext.Provider>
  )
}

export function useMockAuth() {
  const ctx = useContext(MockAuthContext)
  if (!ctx) throw new Error("useMockAuth must be used within a MockAuthProvider")
  return ctx
}
