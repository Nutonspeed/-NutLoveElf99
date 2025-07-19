import type React from 'react'
import Guard from '@/components/Guard'
import { DashboardLayout as Layout } from '@/components/layouts'

export default function DashboardLayoutPage({ children }: { children: React.ReactNode }) {
  return (
    <Guard role={["admin", "staff"]}>
      <Layout>{children}</Layout>
    </Guard>
  )
}
