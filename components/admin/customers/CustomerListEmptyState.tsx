"use client"
import Link from "next/link"
import { UserPlus } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import EmptyState from "@/components/ui/EmptyState"

export default function CustomerListEmptyState() {
  return (
    <EmptyState
      icon={<UserPlus className="h-10 w-10 text-muted-foreground" />}
      title="ยังไม่มีลูกค้า"
      description="เพิ่มลูกค้าเพื่อเริ่มต้นใช้งานระบบ"
      action={
        <Link href="/admin/customers/create">
          <Button>เพิ่มลูกค้าใหม่</Button>
        </Link>
      }
    />
  )
}
