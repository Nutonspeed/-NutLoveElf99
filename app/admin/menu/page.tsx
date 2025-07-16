"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/buttons/button"

const actions = [
  { label: "เพิ่มลายผ้าใหม่", href: "/admin/fabrics/create" },
  { label: "บิลที่ได้รับแล้ว", href: "/admin/bills?status=received" },
  { label: "สร้างโปรโมชัน", href: "/admin/promo/create" },
  { label: "รายงานยอดขาย", href: "/admin/reports" },
]

export default function AdminMenuPage() {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const go = (href: string) => {
    setLoading(href)
    setTimeout(() => router.push(href), 400)
  }

  return (
    <div className="space-y-2 p-4">
      {actions.map((a) => (
        <Button
          key={a.href}
          onClick={() => go(a.href)}
          disabled={loading === a.href}
          className="w-full"
        >
          {loading === a.href ? "กำลังเปิด..." : a.label}
        </Button>
      ))}
    </div>
  )
}
