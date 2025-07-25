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
      { label: "Dashboard", icon: require("lucide-react").Home, href: "/admin" },
      { label: "Orders", icon: require("lucide-react").ShoppingCart, href: "/orders" },
    ],
  },
  {
    section: "Inventory",
    items: [
      { label: "Products", icon: require("lucide-react").Package, href: "/products" },
      { label: "Stock", icon: require("lucide-react").ClipboardList, href: "/admin/stock" },
    ],
  },
  {
    section: "System",
    items: [
      { label: "Access Log", icon: require("lucide-react").List, href: "/admin/logs/access" },
      { label: "Performance", icon: require("lucide-react").BarChart3, href: "/admin/insight/performance" },
      { label: "Campaigns", icon: require("lucide-react").Target, href: "/admin/campaigns" },
      { label: "Lock", icon: require("lucide-react").Lock, href: "/admin/settings/lock" },
      { label: "Backup", icon: require("lucide-react").Database, href: "/admin/settings/system-backup" },
    ],
  },
]
