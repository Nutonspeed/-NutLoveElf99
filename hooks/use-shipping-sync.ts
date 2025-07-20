"use client"
import { useEffect } from "react"
import { syncShippingStatus } from "@/lib/mock-shipping-sync"

export default function useShippingSync(intervalMs = 30000) {
  useEffect(() => {
    const id = setInterval(() => {
      syncShippingStatus()
    }, intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
}
