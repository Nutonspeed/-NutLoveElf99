import type { LucideIcon } from "lucide-react"

export interface SidebarItemConfig {
  label: string
  icon: LucideIcon
  href: string
}

export interface SidebarSectionConfig {
  section: string
  items: SidebarItemConfig[]
}

export const sidebarSections: SidebarSectionConfig[] = [
  {
    section: "General",
    items: [
      { label: "Dashboard", icon: require("lucide-react").Home, href: "/dashboard" },
      { label: "Orders", icon: require("lucide-react").ShoppingCart, href: "/orders" },
    ],
  },
  {
    section: "Inventory",
    items: [
      { label: "Products", icon: require("lucide-react").Package, href: "/products" },
    ],
  },
]
