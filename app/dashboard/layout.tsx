import type React from "react"
import Guard from "@/components/Guard"
import DashboardBreadcrumbs from "@/components/dashboard/DashboardBreadcrumbs"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Guard role={["admin", "staff"]}>
      <div className="p-4">
        <DashboardBreadcrumbs />
        {children}
      </div>
    </Guard>
  )
}
