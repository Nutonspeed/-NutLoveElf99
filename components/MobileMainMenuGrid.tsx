"use client"
import Link from "next/link"
import { ShoppingCart, ImageIcon, ScrollText, MessageCircle, Book, Percent, LayoutGrid } from "lucide-react"

const menu = [
  { href: "/quick-bill", label: "เปิดบิลเร็ว", icon: ShoppingCart },
  { href: "/fabrics", label: "ลายผ้า", icon: ImageIcon },
  { href: "/orders/latest", label: "บิลล่าสุด", icon: ScrollText },
  { href: "/chat", label: "คุยกับลูกค้า", icon: MessageCircle },
  { href: "/catalog", label: "แคตตาล็อก", icon: Book },
  { href: "/promos", label: "โปรโมชัน", icon: Percent },
  { href: "/tools", label: "อื่น ๆ", icon: LayoutGrid },
]

export default function MobileMainMenuGrid() {
  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      {menu.map(({ href, label, icon: Icon }) => (
        <Link key={label} href={href} className="bg-blue-50 rounded-lg p-4 flex flex-col items-center text-sm hover:bg-blue-100">
          <Icon className="w-6 h-6 mb-2" />
          <span>{label}</span>
        </Link>
      ))}
    </div>
  )
}
