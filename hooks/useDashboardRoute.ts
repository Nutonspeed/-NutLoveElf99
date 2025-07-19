import type { LucideIcon } from "lucide-react"
import {
  Home,
  ShoppingCart,
  Package,
  ClipboardList,
  List,
  BarChart3,
  Target,
  Lock,
  Database,
} from "lucide-react"

export interface DashboardRoute {
  label: string
  href: string
  category: string
  icon: LucideIcon
}

const routes: DashboardRoute[] = [
  { category: "General", label: "Dashboard", icon: Home, href: "/dashboard" },
  { category: "General", label: "Orders", icon: ShoppingCart, href: "/orders" },
  { category: "Inventory", label: "Products", icon: Package, href: "/products" },
  { category: "Inventory", label: "Stock", icon: ClipboardList, href: "/dashboard/stock" },
  { category: "System", label: "Access Log", icon: List, href: "/dashboard/logs/access" },
  { category: "System", label: "Performance", icon: BarChart3, href: "/dashboard/insight/performance" },
  { category: "System", label: "Campaigns", icon: Target, href: "/dashboard/campaigns" },
  { category: "System", label: "Lock", icon: Lock, href: "/dashboard/settings/lock" },
  { category: "System", label: "Backup", icon: Database, href: "/dashboard/settings/system-backup" },
]

export function useDashboardRoute() {
  return routes
}
