"use client"
import Link from "next/link"
import { ShoppingCart, ImageIcon, MessageCircle, Percent, Book } from "lucide-react"

const menu = [
  { href: "/admin/openbill/quick", label: "เปิดบิลเร็ว", icon: ShoppingCart },
  { href: "/admin/fabrics", label: "ลายผ้า", icon: ImageIcon },
  { href: "/admin/chat", label: "คุยกับลูกค้า", icon: MessageCircle },
  { href: "/admin/promos", label: "โปรโมชัน", icon: Percent },
  { href: "/catalog", label: "แคตตาล็อก", icon: Book },
]

export default function QuickEntryMock() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 text-center">
          {menu.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="bg-white rounded-lg p-4 flex flex-col items-center shadow hover:bg-gray-100"
            >
              <Icon className="w-6 h-6 mb-2" />
              <span className="text-sm">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
