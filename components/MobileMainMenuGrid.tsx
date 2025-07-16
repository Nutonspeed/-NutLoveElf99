"use client"
import Link from "next/link"
import { ShoppingCart, ImageIcon, ScrollText, MessageCircle, Book, Percent, LayoutGrid } from "lucide-react"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { useMockTooltipOnce } from "@/hooks/use-mock-tooltip-once"
import { mockBills } from "@/mock/bills"

const menu = [
  { href: "/quick-bill", label: "เปิดบิลเร็ว", icon: ShoppingCart },
  { href: "/fabrics", label: "ลายผ้า", icon: ImageIcon },
  { href: "/orders/latest", label: "บิลล่าสุด", icon: ScrollText },
  { href: "/chat", label: "คุยกับลูกค้า", icon: MessageCircle },
  { href: "/catalog", label: "แคตตาล็อก", icon: Book },
  { href: "/promos", label: "โปรโมชัน", icon: Percent },
  { href: "/tools", label: "อื่น ๆ", icon: LayoutGrid },
]

function hasRecentBill() {
  const now = Date.now()
  return mockBills.some((b) => now - new Date(b.createdAt).getTime() <= 30 * 60 * 1000)
}

function MenuItem({ href, label, Icon, highlight }: { href: string; label: string; Icon: any; highlight?: boolean }) {
  const { open, trigger, setOpen } = useMockTooltipOnce(`menu-${label}`)
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <Link
            href={href}
            onClick={trigger}
            className={
              "bg-blue-50 rounded-lg p-4 flex flex-col items-center text-sm hover:bg-blue-100" +
              (highlight ? " animate-pulse ring-2 ring-orange-400" : "")
            }
          >
            <Icon className="w-6 h-6 mb-2" />
            <span>{label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent>เมนูนี้คืออะไร</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default function MobileMainMenuGrid() {
  const highlight = hasRecentBill()
  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      {menu.map(({ href, label, icon: Icon }) => (
        <MenuItem
          key={label}
          href={href}
          label={label}
          Icon={Icon}
          highlight={label === "บิลล่าสุด" && highlight}
        />
      ))}
    </div>
  )
}
