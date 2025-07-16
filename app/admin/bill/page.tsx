"use client"
import BottomNav from "@/components/BottomNav"
import Link from "next/link"
import { Button } from "@/components/ui/buttons/button"

export default function AdminBillPage() {
  return (
    <div className="min-h-screen p-4 pb-20 space-y-4">
      <h1 className="text-2xl font-bold">สร้างบิล</h1>
      <Link href="/admin/bill/create">
        <Button className="w-full">สร้างบิลใหม่</Button>
      </Link>
      <BottomNav />
    </div>
  )
}
