"use client"
import Link from "next/link"
import FallbackCenter from "@/components/FallbackCenter"
import { Button } from "@/components/ui/buttons/button"

export default function UnderConstruction() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <FallbackCenter icon="🚧" title="หน้านี้ยังไม่เปิดใช้งาน" subtitle="อยู่ระหว่างการพัฒนา" />
        <Link href="/">
          <Button>กลับหน้าหลัก</Button>
        </Link>
      </div>
    </div>
  )
}
