"use client"

import { FabricTable } from "@/components/fabrics"
import { adminFabrics } from "@/mock/fabrics"

export default function AdminFabricsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-4 text-2xl font-bold">Fabrics</h1>
      <FabricTable items={adminFabrics} />
    </div>
  )
}
