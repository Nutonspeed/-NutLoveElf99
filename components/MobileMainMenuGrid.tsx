"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  ShoppingCart,
  ImageIcon,
  ScrollText,
  MessageCircle,
  Book,
  Percent,
  LayoutGrid,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  loadTooltipSeenState,
  markTooltipSeen,
  tooltipSeenState,
} from "@/lib/mock-tooltip-seen"

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
  const [seen, setSeen] = useState<Record<string, boolean>>(tooltipSeenState)
  const [open, setOpen] = useState<string | null>(null)

  useEffect(() => {
    loadTooltipSeenState()
    setSeen({ ...tooltipSeenState })
  }, [])

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    label: string,
  ) => {
    if (!seen[label]) {
      e.preventDefault()
      setOpen(label)
      markTooltipSeen(label)
      setSeen((s) => ({ ...s, [label]: true }))
    }
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div className="grid grid-cols-3 gap-4 text-center">
        {menu.map(({ href, label, icon: Icon }) => (
          <Tooltip
            key={label}
            open={!seen[label] && open === label}
            onOpenChange={(o) => {
              if (!o && open === label) setOpen(null)
            }}
          >
            <TooltipTrigger asChild>
              <Link
                href={href}
                className="bg-blue-50 rounded-lg p-4 flex flex-col items-center text-sm hover:bg-blue-100"
                onClick={(e) => handleClick(e, label)}
              >
                <Icon className="w-6 h-6 mb-2" />
                <span>{label}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">Tap again to open</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}
