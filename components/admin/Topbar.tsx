"use client"

import { LogOut, Menu } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import GlobalBadge from "./GlobalBadge"
import { getGlobalAlertCount } from "@/lib/mock-alerts"

export default function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { logout } = useAuth()
  const [count, setCount] = useState(0)

  useEffect(() => {
    const update = () => setCount(getGlobalAlertCount())
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">เมนู</span>
        </Button>
        <span className="font-semibold">แดชบอร์ดผู้ดูแล</span>
        <GlobalBadge count={count} />
      </div>
      <Button variant="ghost" size="icon" onClick={logout}>
        <LogOut className="h-5 w-5" />
        <span className="sr-only">ออกจากระบบ</span>
      </Button>
    </header>
  )
}
