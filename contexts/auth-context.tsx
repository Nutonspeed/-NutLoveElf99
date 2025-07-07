"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { mockUsers } from "@/lib/mock-users"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "customer"
  avatar?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
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
  const [user, setUser] = useState<User | null>(null)
  // Since authentication is mocked, the loading state simply starts as false.
  const [isLoading] = useState(false)

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login logic
    const foundUser = mockUsers.find((u) => u.email === email)
    if (foundUser && password === "password") {
      setUser(foundUser)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
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
