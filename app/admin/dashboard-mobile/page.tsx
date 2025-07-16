import Link from "next/link"
import { Card, CardContent } from "@/components/ui/cards/card"
import { Button } from "@/components/ui/buttons/button"
import {
  ClipboardList,
  FileText,
  MessageCircle,
  LineChart,
} from "lucide-react"

const stats = [
  { label: "Today's Orders", value: 12 },
  { label: "Pending Bills", value: 5 },
  { label: "New Chats", value: 3 },
  { label: "Total Sales", value: "฿25,000" },
]

const actions = [
  { href: "/admin/orders", label: "ออเดอร์", icon: ClipboardList },
  { href: "/admin/bills", label: "บิล", icon: FileText },
  { href: "/admin/chat", label: "แชท", icon: MessageCircle },
  { href: "/admin/reports", label: "รายงาน", icon: LineChart },
]

export default function AdminDashboardMobile() {
  return (
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map(({ label, value }) => (
          <Card key={label}>
            <CardContent className="p-4 text-center space-y-1">
              <p className="text-sm text-gray-600">{label}</p>
              <p className="text-xl font-bold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {actions.map(({ href, label, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex flex-col items-center justify-center rounded-lg bg-blue-50 p-4 text-sm hover:bg-blue-100"
          >
            <Icon className="mb-2 h-6 w-6" />
            <span>{label}</span>
          </Link>
        ))}
      </div>

      <div className="text-center">
        <p className="text-lg font-semibold">สู้ ๆ นะวันนี้!</p>
      </div>

      <div className="text-center">
        <Link href="/admin/menu">
          <Button variant="outline">ไปยังเมนูหลัก</Button>
        </Link>
      </div>
    </div>
  )
}
