"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
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
        try {
          const res = await fetch('/api/mock/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })
          const result = await res.json()
          if (result.success) {
            set({ user: result.user, guestId: null, isLoading: false })
            if (typeof window !== 'undefined') {
              const ip = Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join('.')
              addAccessLog(ip, navigator.userAgent)
            }
            return true
          }
        } catch (e) {
          console.error('Login error', e)
        }
        set({ isLoading: false })
        return false
      },
      async logout() {
        try {
          await fetch('/api/mock/logout', { method: 'POST' })
        } catch {}
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
