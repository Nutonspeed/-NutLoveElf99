"use client"

import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

export default function Topbar() {
  const { logout } = useAuth()

  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-4">
      <span className="font-semibold">แดชบอร์ดผู้ดูแล</span>
      <Button variant="ghost" size="icon" onClick={logout}>
        <LogOut className="h-5 w-5" />
        <span className="sr-only">ออกจากระบบ</span>
      </Button>
    </header>
  )
}
