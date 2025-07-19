"use client"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import {
  mockNotifications,
  loadNotifications,
  type Notification,
} from "@/lib/mock-notifications"
import {
  loadNotificationStatus,
  getStatus,
  markRead as markReadLib,
  markAllRead as markAllReadLib,
} from "@/lib/mock-read-status"

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  markRead: (id: string) => void
  markAllRead: () => void
}

const NotificationContext = createContext<NotificationState | null>(null)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [list, setList] = useState<Notification[]>([])

  useEffect(() => {
    loadNotifications()
    loadNotificationStatus()
    setList([...mockNotifications])
  }, [])

  const unread = list.filter((n) => !getStatus(n.id).read).length

  const markRead = (id: string) => {
    markReadLib(id)
    setList([...mockNotifications])
  }

  const markAllRead = () => {
    markAllReadLib(list.map((n) => n.id))
    setList([...mockNotifications])
  }

  const value = useMemo(
    () => ({ notifications: list, unreadCount: unread, markRead, markAllRead }),
    [list, unread],
  )

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export function useNotifications() {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider")
  return ctx
}
