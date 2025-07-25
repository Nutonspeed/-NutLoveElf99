"use client"

import { useState, useCallback } from "react"
import type { NotificationData } from "@/lib/notification-service"

export function useNotification() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendNotification = useCallback(async (data: NotificationData): Promise<boolean> => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/notifications/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        return true
      } else {
        setError(result.error || "Failed to send notification")
        return false
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error"
      setError(errorMessage)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const sendStockAlert = useCallback(
    async (
      type: "stock_low" | "stock_out" | "stock_critical",
      productData: {
        id: string
        name: string
        currentStock: number
        minStock?: number
        location?: string
      },
      recipients: {
        email?: string
        phone?: string
        name?: string
      }[],
    ): Promise<boolean> => {
      const notifications = recipients.map((recipient) => ({
        type,
        recipient,
        data: productData,
        priority: type === "stock_out" ? ("urgent" as const) : ("high" as const),
      }))

      const results = await Promise.all(notifications.map((notification) => sendNotification(notification)))

      return results.some((result) => result)
    },
    [sendNotification],
  )

  return {
    sendNotification,
    sendStockAlert,
    loading,
    error,
  }
}
