"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  BarChart3,
  Bolt,
  FileText,
  Folder,
  HelpCircle,
  Layers,
  MailQuestion,
  Megaphone,
  MessageCircle,
  Percent,
  Settings,
  Target,
  Users,
} from "lucide-react"
import clsx from "clsx"
import { useAuth } from "@/contexts/auth-context"
import { canAccess } from "@/lib/mock-roles"

const groups = [
  {
    label: "Orders",
    items: [
      { href: "/admin/bills", label: "บิลทั้งหมด", icon: FileText, feature: "bills" },
      { href: "/admin/bills/fast", label: "เปิดบิลด่วน", icon: Bolt, feature: "bills" },
      { href: "/admin/bills/analytics", label: "สถิติบิล", icon: BarChart3, feature: "bills" },
    ],
  },
  {
    label: "Fabrics",
    items: [
      { href: "/admin/fabrics", label: "ผ้า", icon: Layers, feature: "fabrics" },
      { href: "/admin/collections", label: "คอลเลกชัน", icon: Folder, feature: "collections" },
    ],
  },
  {
    label: "Customers",
    items: [
      { href: "/admin/customers", label: "ลูกค้า", icon: Users, feature: "customers" },
    ],
  },
  {
    label: "Analytics",
    items: [
      { href: "/admin/dashboard", label: "แดชบอร์ด", icon: BarChart3, feature: "dashboard" },
      { href: "/admin/analytics", label: "สถิติ", icon: BarChart3, feature: "analytics" },
    ],
  },
  {
    label: "Chat",
    items: [
      { href: "/admin/chat", label: "แชท", icon: MessageCircle, feature: "chat" },
      { href: "/admin/broadcast", label: "บรอดแคสต์", icon: Megaphone, feature: "broadcast" },
    ],
  },
  {
    label: "Campaign",
    items: [
      { href: "/admin/campaigns", label: "แคมเปญ", icon: Target, feature: "campaigns" },
      { href: "/admin/coupons", label: "คูปอง", icon: Percent, feature: "campaigns" },
    ],
  },
  {
    label: "Settings",
    items: [
      { href: "/admin/feature-map", label: "แผนที่ฟีเจอร์", icon: Settings, feature: "settings" },
      { href: "/admin/faq", label: "คำถามพบบ่อย", icon: HelpCircle, feature: "settings" },
      { href: "/admin/feedback", label: "ความคิดเห็น", icon: MailQuestion, feature: "settings" },
    ],
  },
]


export default function Sidebar({ className = "" }: { className?: string }) {
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <aside className={clsx("w-60 flex-col border-r bg-sidebar text-sidebar-foreground", className)}>
      <div className="h-16 flex items-center px-4 text-lg font-bold bg-sidebar-primary text-sidebar-primary-foreground">
        แอดมิน
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        <Accordion type="multiple" className="space-y-1">
          {groups
            .filter(g => g.items.some(i => canAccess(user?.role, i.feature)))
            .map(group => (
              <AccordionItem key={group.label} value={group.label} className="border-b-0">
                <AccordionTrigger className="px-3 py-2 text-sm font-semibold hover:no-underline">
                  {group.label}
                </AccordionTrigger>
                <AccordionContent className="space-y-1">
                  {group.items
                    .filter(item => canAccess(user?.role, item.feature))
                    .map(({ href, label, icon: Icon }) => {
                      const active = pathname === href || pathname.startsWith(`${href}/`)
                      return (
                        <Link
                          key={href}
                          href={href}
                          className={clsx(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm",
                            "hover:bg-muted/40",
                            active && "bg-muted/40 border-l-2 border-primary text-primary",
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="flex-1">{label}</span>
                        </Link>
                      )
                    })}
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </nav>
    </aside>
  )
}
