"use client"
import Link from "next/link"
import EmptyState from "@/components/ui/EmptyState"
import { Button } from "@/components/ui/buttons/button"
import { Search } from "lucide-react"

export default function FallbackNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <EmptyState
        icon={<Search className="h-8 w-8 text-muted-foreground" />}
        title="ไม่พบหน้าที่คุณค้นหา"
        action={
          <Link href="/">
            <Button>กลับหน้าแรก</Button>
          </Link>
        }
      />
    </div>
  )
}
