"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import EmptyState from "@/components/ui/EmptyState"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <EmptyState
        icon={<Search className="h-10 w-10 text-muted-foreground" />}
        title="ไม่พบหน้าที่คุณค้นหา"
        description="ขออภัย หน้าที่คุณเปิดอาจถูกย้ายหรือลบไปแล้ว"
        action={
          <Link href="/">
            <Button>กลับหน้าแรก</Button>
          </Link>
        }
      />
    </div>
  )
}
