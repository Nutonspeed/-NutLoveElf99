"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { mockUsers } from "@/lib/mock-users"

import type { Role } from "@/lib/mock-roles"

interface User {
  id: string
  name: string
  email: string
  role: Role
  avatar?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  guestId: string | null
  /**
   * Indicates whether the authentication state is still being determined.
   * Since this mock auth provider performs no async checks, the value is
   * always `false` after the initial render but is included for API
   * compatibility with pages that expect it.
   */
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthState | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null
    const stored = localStorage.getItem("auth_user")
    return stored ? (JSON.parse(stored) as User) : null
  })
  const [guestId] = useState(() => `guest-${crypto.randomUUID()}`)
  // Since authentication is mocked, the loading state simply starts as false.
  const [isLoading] = useState(false)

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login logic
    const foundUser = mockUsers.find((u) => u.email === email)
    if (foundUser && password === "password") {
      setUser(foundUser)
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_user", JSON.stringify(foundUser))
      }
      if (typeof document !== 'undefined') {
        document.cookie = 'elf_admin_session=1; path=/'
      }
      return true
    }
    return false
  }

  const logout = () => {
    if (typeof document !== 'undefined') {
      document.cookie =
        'elf_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_user')
    }
    router.push('/')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        guestId: user ? null : guestId,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
