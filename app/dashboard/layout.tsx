import type React from "react"
import Guard from "@/components/Guard"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <Guard role={["admin", "staff"]}>{children}</Guard>
}
