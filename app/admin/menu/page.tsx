"use client"
import BottomNav from "@/components/BottomNav"
import Link from "next/link"
import { Button } from "@/components/ui/buttons/button"

export default function AdminMenuPage() {
  return (
    <div className="min-h-screen p-4 pb-20 space-y-4">
      <h1 className="text-2xl font-bold">เมนูหลัก</h1>
      <div className="space-y-2">
        <Link href="/admin/orders"><Button className="w-full">จัดการออเดอร์</Button></Link>
        <Link href="/admin/products"><Button className="w-full" variant="outline">สินค้าทั้งหมด</Button></Link>
      </div>
      <BottomNav />
    </div>
  )
}
