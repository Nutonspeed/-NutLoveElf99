"use client"
import Link from "next/link"

interface NavItem {
  name: string
  href: string
}

interface DesktopMenuProps {
  navigation: NavItem[]
}

export function DesktopMenu({ navigation }: DesktopMenuProps) {
  return (
    <div className="hidden md:flex items-center space-x-8">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          {item.name}
        </Link>
      ))}
    </div>
  )
}
