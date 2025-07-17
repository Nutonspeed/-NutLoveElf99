"use client"

import { useState } from "react"

export function useMenuState() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuLoading, setMenuLoading] = useState(false)
  const [dashboardLoading, setDashboardLoading] = useState(false)

  return {
    menuOpen,
    setMenuOpen,
    menuLoading,
    setMenuLoading,
    dashboardLoading,
    setDashboardLoading,
  }
}
