"use client"

import { create } from "zustand"
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
  token: string | null
  guestId: string | null
  isLoading: boolean
  login: (email: string, password: string, remember?: boolean) => Promise<boolean>
  logout: () => void
  setUser: (u: User | null) => void
}

const STORAGE_KEY = "auth"

interface StoredAuth {
  user: User
  token: string
  expires?: number
}

function loadAuth(): StoredAuth | null {
  if (typeof window === "undefined") return null
  try {
    const fromLocal = localStorage.getItem(STORAGE_KEY)
    if (fromLocal) {
      const data: StoredAuth = JSON.parse(fromLocal)
      if (!data.expires || Date.now() < data.expires) {
        return data
      }
      localStorage.removeItem(STORAGE_KEY)
    }
  } catch {}
  try {
    const fromSession = sessionStorage.getItem(STORAGE_KEY)
    if (fromSession) return JSON.parse(fromSession)
  } catch {}
  return null
}

function saveAuth(data: StoredAuth, remember?: boolean) {
  if (typeof window === "undefined") return
  const serialized = JSON.stringify(
    remember ? { ...data, expires: Date.now() + 30 * 24 * 60 * 60 * 1000 } : data,
  )
  if (remember) {
    localStorage.setItem(STORAGE_KEY, serialized)
  } else {
    sessionStorage.setItem(STORAGE_KEY, serialized)
  }
}

function clearAuth() {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
  sessionStorage.removeItem(STORAGE_KEY)
}

export const useAuthStore = create<AuthStore>((set, get) => {
  const initial = loadAuth()
  return {
    user: initial?.user ?? null,
    token: initial?.token ?? null,
    guestId: initial ? null : `guest-${typeof crypto !== "undefined" ? crypto.randomUUID() : Math.random().toString(36).slice(2)}`,
    isLoading: false,
    async login(email, password, remember = false) {
      set({ isLoading: true })
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        })
        if (!res.ok) {
          set({ isLoading: false })
          return false
        }
        const { user, token } = await res.json()
        set({ user, token, guestId: null, isLoading: false })
        saveAuth({ user, token }, remember)
        if (typeof window !== "undefined") {
          const ip = Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join(".")
          addAccessLog(ip, navigator.userAgent)
        }
        if (typeof document !== "undefined") {
          document.cookie = "elf_admin_session=1; path=/"
        }
        return true
      } catch {
        set({ isLoading: false })
        return false
      }
    },
    logout() {
      if (typeof document !== "undefined") {
        document.cookie = "elf_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      }
      clearAuth()
      set({ user: null, token: null, guestId: `guest-${crypto.randomUUID()}` })
    },
    setUser(u) {
      set({ user: u })
    },
  }
})
