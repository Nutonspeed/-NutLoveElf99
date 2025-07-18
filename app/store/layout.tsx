import type React from "react"
import Guard from "@/components/Guard"

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <Guard role="admin">{children}</Guard>
}
