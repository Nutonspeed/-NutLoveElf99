"use client"
import type React from "react"
import { useSearchParams } from "next/navigation"
import Guard from "@/components/Guard"
import GroupedPreview from "@/components/dashboard/GroupedPreview"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const grouped = searchParams.get("preview") === "grouped"

  return (
    <Guard role={["admin", "staff"]}>
      {grouped && <GroupedPreview />}
      {children}
    </Guard>
  )
}
