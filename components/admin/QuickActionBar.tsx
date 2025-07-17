"use client"

import Link from "next/link"
import { adminRoutes } from "@/components/admin/admin-nav"

export default function QuickActionBar() {
  const quickPaths = [
    "/admin/openbill/quick",
    "/admin/orders",
    "/admin/chat",
    "/admin/broadcast",
    "/admin/analytics",
    "/admin/settings",
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 flex justify-around border-t bg-background py-2 md:hidden">
      {adminRoutes
        .filter(r => quickPaths.includes(r.href))
        .map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="flex flex-col items-center text-xs">
            {Icon && <Icon className="h-5 w-5" />}
            <span>{label}</span>
          </Link>
        ))}
    </nav>
  )
}
