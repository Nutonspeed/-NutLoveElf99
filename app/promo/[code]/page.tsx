"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getPromoByCode } from "@/lib/mock-promos"
import { mockCustomers } from "@/lib/mock-customers"

export default function PromoPage({ params }: { params: { code: string } }) {
  const promo = getPromoByCode(params.code)
  if (!promo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        ไม่พบโปรโมชัน
      </div>
    )
  }
  const customer = mockCustomers.find((c) => c.id === promo.customerId)
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold">โปรโมชันพิเศษสำหรับ {customer?.name}</h1>
        <p>โค้ดของคุณคือ {promo.code}</p>
        <Link href="/">
          <Button>กลับสู่หน้าหลัก</Button>
        </Link>
      </div>
    </div>
  )
}
