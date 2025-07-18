"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore, type User } from "./auth-store"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  guestId: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthState | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const auth = useAuthStore()

  const login = async (email: string, password: string) => {
    const success = await auth.login(email, password)
    return success
  }

  const logout = () => {
    auth.logout()
    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{
        user: auth.user,
        isAuthenticated: !!auth.user,
        guestId: auth.user ? null : auth.guestId,
        isLoading: auth.isLoading,
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
