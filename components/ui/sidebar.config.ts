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
      { label: "Overview", icon: require("lucide-react").GaugeCircle, href: "/dashboard/overview" },
      { label: "Orders", icon: require("lucide-react").ShoppingCart, href: "/orders" },
      { label: "Customers", icon: require("lucide-react").Users, href: "/dashboard/customers" },
      { label: "Reviews", icon: require("lucide-react").Star, href: "/reviews" },
    ],
  },
  {
    section: "Inventory",
    items: [
      { label: "Products", icon: require("lucide-react").Package, href: "/products" },
      { label: "Stock", icon: require("lucide-react").ClipboardList, href: "/dashboard/stock" },
    ],
  },
  {
    section: "System",
    items: [
      { label: "Access Log", icon: require("lucide-react").List, href: "/dashboard/logs/access" },
      { label: "Performance", icon: require("lucide-react").BarChart3, href: "/dashboard/insight/performance" },
      { label: "Campaigns", icon: require("lucide-react").Target, href: "/dashboard/campaigns" },
      { label: "Lock", icon: require("lucide-react").Lock, href: "/dashboard/settings/lock" },
      { label: "Backup", icon: require("lucide-react").Database, href: "/dashboard/settings/system-backup" },
    ],
  },
]
