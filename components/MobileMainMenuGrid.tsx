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
    <div className="grid grid-cols-3 gap-4 text-center lg:hidden">
      {menu.map(({ href, label, icon: Icon }) => (
        <Link
          key={label}
          href={href}
          className="flex flex-col items-center rounded-lg bg-blue-50 p-4 text-sm hover:bg-blue-100"
        >
          <Icon className="mb-2 h-6 w-6" />
          <span>{label}</span>
        </Link>
      ))}
    </div>
  )
}
