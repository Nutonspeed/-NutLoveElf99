"use client"

import { LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

export default function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { logout } = useAuth()

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
      </div>
      <Button variant="ghost" size="icon" onClick={logout}>
        <LogOut className="h-5 w-5" />
        <span className="sr-only">ออกจากระบบ</span>
      </Button>
    </header>
  )
}
