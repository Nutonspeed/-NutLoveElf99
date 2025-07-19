import type { LucideIcon } from "lucide-react"
import { dashboardRoutes } from "@/lib/dashboardRoutes"

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
      { label: dashboardRoutes['/dashboard'].title, icon: require("lucide-react").Home, href: "/dashboard" },
      { label: "Orders", icon: require("lucide-react").ShoppingCart, href: "/orders" },
    ],
  },
  {
    section: "Inventory",
    items: [
      { label: "Products", icon: require("lucide-react").Package, href: "/products" },
      { label: dashboardRoutes['/dashboard/stock'].title, icon: require("lucide-react").ClipboardList, href: "/dashboard/stock" },
    ],
  },
  {
    section: "System",
    items: [
      { label: dashboardRoutes['/dashboard/logs'].title, icon: require("lucide-react").List, href: "/dashboard/logs/access" },
      { label: dashboardRoutes['/dashboard/insight'].title, icon: require("lucide-react").BarChart3, href: "/dashboard/insight/performance" },
      { label: dashboardRoutes['/dashboard/campaigns'].title, icon: require("lucide-react").Target, href: "/dashboard/campaigns" },
      { label: dashboardRoutes['/dashboard/settings'].title, icon: require("lucide-react").Lock, href: "/dashboard/settings/lock" },
      { label: dashboardRoutes['/dashboard/settings'].title + ' Backup', icon: require("lucide-react").Database, href: "/dashboard/settings/system-backup" },
    ],
  },
]
