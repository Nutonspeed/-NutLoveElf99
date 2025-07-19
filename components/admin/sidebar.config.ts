import type { LucideIcon } from "lucide-react"

export interface AdminSidebarItemConfig {
  href: string
  label: string
  icon: LucideIcon
  feature: string
}

export interface AdminSidebarGroupConfig {
  label: string
  items: AdminSidebarItemConfig[]
}

export const adminSidebarGroups: AdminSidebarGroupConfig[] = [
  {
    label: "Orders",
    items: [
      { href: "/admin/bills", label: "บิลทั้งหมด", icon: require("lucide-react").FileText, feature: "bills" },
      { href: "/admin/bills/fast", label: "เปิดบิลด่วน", icon: require("lucide-react").Bolt, feature: "bills" },
    ],
  },
  {
    label: "Fabrics",
    items: [
      { href: "/admin/fabrics", label: "ผ้า", icon: require("lucide-react").Layers, feature: "fabrics" },
      { href: "/admin/collections", label: "คอลเลกชัน", icon: require("lucide-react").Folder, feature: "collections" },
    ],
  },
  {
    label: "Customers",
    items: [
      { href: "/admin/customers", label: "ลูกค้า", icon: require("lucide-react").Users, feature: "customers" },
    ],
  },
  {
    label: "Analytics",
    items: [
      { href: "/admin/dashboard", label: "แดชบอร์ด", icon: require("lucide-react").BarChart3, feature: "dashboard" },
      { href: "/admin/analytics", label: "สถิติ", icon: require("lucide-react").BarChart3, feature: "analytics" },
    ],
  },
  {
    label: "Chat",
    items: [
      { href: "/admin/chat", label: "แชท", icon: require("lucide-react").MessageCircle, feature: "chat" },
      { href: "/admin/broadcast", label: "บรอดแคสต์", icon: require("lucide-react").Megaphone, feature: "broadcast" },
    ],
  },
  {
    label: "Campaign",
    items: [
      { href: "/admin/campaigns", label: "แคมเปญ", icon: require("lucide-react").Target, feature: "campaigns" },
      { href: "/admin/coupons", label: "คูปอง", icon: require("lucide-react").Percent, feature: "campaigns" },
    ],
  },
  {
    label: "Settings",
    items: [
      { href: "/admin/feature-map", label: "แผนที่ฟีเจอร์", icon: require("lucide-react").Settings, feature: "settings" },
      { href: "/admin/faq", label: "คำถามพบบ่อย", icon: require("lucide-react").HelpCircle, feature: "settings" },
      { href: "/admin/feedback", label: "ความคิดเห็น", icon: require("lucide-react").MailQuestion, feature: "settings" },
    ],
  },
]
