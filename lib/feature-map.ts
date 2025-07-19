import { BarChart3, Bolt, FileText, Folder, HelpCircle, Layers, MailQuestion, Megaphone, MessageCircle, Percent, Settings, Target, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface FeatureItem {
  href: string
  label: string
  icon: LucideIcon
}

export interface FeatureGroup {
  label: string
  items: FeatureItem[]
}

export const featureMap: FeatureGroup[] = [
  {
    label: 'Orders',
    items: [
      { href: '/admin/bills', label: 'บิลทั้งหมด', icon: FileText },
      { href: '/admin/bills/fast', label: 'เปิดบิลด่วน', icon: Bolt },
    ],
  },
  {
    label: 'Fabrics',
    items: [
      { href: '/admin/fabrics', label: 'ผ้า', icon: Layers },
      { href: '/admin/collections', label: 'คอลเลกชัน', icon: Folder },
    ],
  },
  {
    label: 'Customers',
    items: [{ href: '/admin/customers', label: 'ลูกค้า', icon: Users }],
  },
  {
    label: 'Analytics',
    items: [
      { href: '/admin/dashboard', label: 'แดชบอร์ด', icon: BarChart3 },
      { href: '/admin/analytics', label: 'สถิติ', icon: BarChart3 },
    ],
  },
  {
    label: 'Chat',
    items: [
      { href: '/admin/chat', label: 'แชท', icon: MessageCircle },
      { href: '/admin/broadcast', label: 'บรอดแคสต์', icon: Megaphone },
    ],
  },
  {
    label: 'Campaign',
    items: [
      { href: '/admin/campaigns', label: 'แคมเปญ', icon: Target },
      { href: '/admin/coupons', label: 'คูปอง', icon: Percent },
    ],
  },
  {
    label: 'Settings',
    items: [
      { href: '/admin/feature-map', label: 'แผนที่ฟีเจอร์', icon: Settings },
      { href: '/admin/faq', label: 'คำถามพบบ่อย', icon: HelpCircle },
      { href: '/admin/feedback', label: 'ความคิดเห็น', icon: MailQuestion },
    ],
  },
]
