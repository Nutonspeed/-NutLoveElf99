import type React from "react"
import Guard from "@/components/Guard"
import DashboardLayout from "@/components/layouts/DashboardLayout"

const sections = [
  { href: "/dashboard", title: "Overview" },
  { href: "/dashboard/orders", title: "Orders" },
  { href: "/dashboard/customers", title: "Customers" },
  { href: "/dashboard/reviews", title: "Reviews" },
  { href: "/dashboard/settings", title: "Settings" },
]

export default function DashboardLayoutRoot({ children }: { children: React.ReactNode }) {
  return (
    <Guard role={["admin", "staff"]}>
      <DashboardLayout sections={sections}>{children}</DashboardLayout>
    </Guard>
  )
}
