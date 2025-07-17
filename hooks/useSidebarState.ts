"use client"

import * as React from "react"
import { useIsMobile } from "@/hooks/use-mobile"

const SIDEBAR_COOKIE_NAME = "sidebar:state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

export function useSidebarState(
  defaultOpen = true,
  openProp?: boolean,
  onOpenChange?: (open: boolean) => void
) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)
  const [_open, _setOpen] = React.useState(() => {
    if (typeof document !== "undefined") {
      const cookie = document.cookie
        .split("; ")
        .find((c) => c.startsWith(`${SIDEBAR_COOKIE_NAME}=`))
      if (cookie) {
        const value = cookie.split("=")[1]
        return value === "true"
      }
    }
    return defaultOpen
  })
  const open = openProp ?? _open

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (onOpenChange) {
        onOpenChange(openState)
      } else {
        _setOpen(openState)
      }
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [open, onOpenChange]
  )

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((v) => !v) : setOpen((v) => !v)
  }, [isMobile, setOpen, setOpenMobile])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  const state = open ? "expanded" : "collapsed"

  return {
    state,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
  }
}
