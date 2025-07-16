'use client'
import Link from 'next/link'
import { FilePlus, Palette, MessageSquare, BarChart2, Boxes, Users, Tag, Settings, ClipboardList } from 'lucide-react'
import DarkModeToggle from '@/components/DarkModeToggle'
import { Button } from '@/components/ui/buttons/button'

const items = [
  { href: '/admin/bill', label: 'เปิดบิลเร็ว', icon: FilePlus, color: 'bg-pink-200' },
  { href: '/admin/fabrics', label: 'จัดการลายผ้า', icon: Palette, color: 'bg-pink-200' },
  { href: '/chat', label: 'คุยกับลูกค้า', icon: MessageSquare, color: 'bg-pink-200' },
  { href: '/admin/dashboard', label: 'รายงานยอด', icon: BarChart2, color: 'bg-orange-200' },
  { href: '/admin/inventory', label: 'เช็คสต็อก', icon: Boxes, color: 'bg-orange-200' },
  { href: '/admin/customers', label: 'ลูกค้า', icon: Users, color: 'bg-orange-200' },
  { href: '/admin/coupons', label: 'โปรโมชั่น', icon: Tag, color: 'bg-purple-200' },
  { href: '/admin/orders', label: 'ออเดอร์', icon: ClipboardList, color: 'bg-purple-200' },
  { href: '/admin/settings', label: 'ตั้งค่า', icon: Settings, color: 'bg-purple-200' },
]

export default function MobileHome() {
  return (
    <div className="min-h-screen p-4 space-y-4">
      <div className="flex justify-end">
        <DarkModeToggle />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {items.map((it) => (
          <Link key={it.href} href={it.href} className="block">
            <Button
              variant="secondary"
              className={`flex flex-col items-center justify-center h-24 w-full text-sm ${it.color}`}
            >
              <it.icon className="h-6 w-6" />
              <span className="mt-2">{it.label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}
