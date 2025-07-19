"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { FeatureGroup } from "@/lib/feature-map"
import { featureMap } from "@/lib/feature-map"
import clsx from "clsx"
import { useAuth } from "@/contexts/auth-context"
import { canAccess } from "@/lib/mock-roles"

const groups: FeatureGroup[] = featureMap


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
