"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { mockUsers } from "@/lib/mock-users"
import { addAccessLog } from "@/lib/mock-access-logs"
import type { Role } from "@/lib/mock-roles"

export interface User {
  id: string
  name: string
  email: string
  role: Role
  avatar?: string
}

interface AuthStore {
  user: User | null
  guestId: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  setUser: (u: User | null) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      guestId: `guest-${typeof crypto !== "undefined" ? crypto.randomUUID() : Math.random().toString(36).slice(2)}`,
      isLoading: false,
      async login(email, password) {
        set({ isLoading: true })
        const foundUser = mockUsers.find((u) => u.email === email)
        if (foundUser && password === "password") {
          set({ user: foundUser, guestId: null, isLoading: false })
          if (typeof window !== "undefined") {
            const ip = Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join(".")
            addAccessLog(ip, navigator.userAgent)
          }
          if (typeof document !== "undefined") {
            document.cookie = "elf_admin_session=1; path=/"
          }
          return true
        }
        set({ isLoading: false })
        return false
      },
      logout() {
        if (typeof document !== "undefined") {
          document.cookie = "elf_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        }
        set({ user: null, guestId: `guest-${crypto.randomUUID()}` })
      },
      setUser(u) {
        set({ user: u })
      },
    }),
    {
      name: "auth", // localStorage key
      partialize: (state) => ({ user: state.user }),
    },
  ),
)
