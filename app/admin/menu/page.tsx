import Link from "next/link"
import { Bot, MessageCircle, Package, ShoppingCart, Settings } from "lucide-react"

const sections = [
  {
    title: "สินค้า",
    items: [
      { href: "/admin/products", label: "รายการสินค้า", icon: Package },
      { href: "/admin/products/new", label: "เพิ่มสินค้า", icon: ShoppingCart },
    ],
  },
  {
    title: "คำสั่งซื้อ",
    items: [
      { href: "/admin/orders", label: "ออเดอร์ทั้งหมด", icon: ShoppingCart },
      { href: "/admin/bills", label: "บิลค้างชำระ", icon: Package },
    ],
  },
  {
    title: "แชท",
    items: [
      { href: "/admin/chat", label: "พูดคุยกับลูกค้า", icon: MessageCircle },
    ],
  },
  {
    title: "เอไอ",
    items: [
      { href: "/admin/ai", label: "ผู้ช่วย AI", icon: Bot },
    ],
  },
  {
    title: "ตั้งค่า",
    items: [
      { href: "/admin/settings", label: "ตั้งค่าระบบ", icon: Settings },
    ],
  },
]

export default function AdminMenuPage() {
  return (
    <div className="space-y-8 p-4">
      {sections.map((section) => (
        <div key={section.title} className="space-y-2">
          <h2 className="text-lg font-bold">{section.title}</h2>
          <div className="grid grid-cols-3 gap-4">
            {section.items.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex flex-col items-center rounded-lg bg-blue-50 p-4 text-center text-sm hover:bg-blue-100"
              >
                <Icon className="mb-2 h-6 w-6" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
