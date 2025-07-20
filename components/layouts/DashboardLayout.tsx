import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export interface DashboardSection {
  title: string
  href: string
}

interface DashboardLayoutProps {
  sections: DashboardSection[]
  children: React.ReactNode
}

export default function DashboardLayout({ sections, children }: DashboardLayoutProps) {
  const pathname = usePathname()
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <nav className="md:w-60">
        <ul className="space-y-2">
          {sections.map(sec => (
            <li key={sec.href}>
              <Link
                href={sec.href}
                className={`block px-3 py-2 rounded-md hover:bg-muted/40 ${pathname === sec.href ? 'bg-muted/40 font-medium' : ''}`}
              >
                {sec.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}
