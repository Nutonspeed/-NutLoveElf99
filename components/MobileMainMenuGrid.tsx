"use client"
import Link from "next/link"
import { ShoppingCart, ImageIcon, ScrollText, MessageCircle, Book, Percent, LayoutGrid, BarChart3, Settings } from "lucide-react"

const menu = [
  { href: "/quick-bill", label: "เปิดบิลเร็ว", icon: ShoppingCart },
  { href: "/fabrics", label: "จัดการลายผ้า", icon: ImageIcon },
  { href: "/orders/latest", label: "ดูบิลล่าสุด", icon: ScrollText },
  { href: "/chat", label: "แชทกับลูกค้า", icon: MessageCircle },
  { href: "/catalog", label: "แคตตาล็อก", icon: Book },
  { href: "/promos", label: "โปรโมชัน", icon: Percent },
  { href: "/reports", label: "รายงานยอดขาย", icon: BarChart3 },
  { href: "/settings", label: "ตั้งค่าร้าน", icon: Settings },
  { href: "/tools", label: "เครื่องมืออื่น ๆ", icon: LayoutGrid },
]

export default function MobileMainMenuGrid() {
  const colors = ["bg-pink-50", "bg-orange-50", "bg-purple-50"]
  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      {menu.map(({ href, label, icon: Icon }, i) => (
        <Link
          key={label}
          href={href}
          className={`${colors[i % colors.length]} rounded-lg p-4 flex flex-col items-center text-sm`}
        >
          <Icon className="w-6 h-6 mb-2" />
          <span>{label}</span>
        </Link>
      ))}
    </div>
  )
}
