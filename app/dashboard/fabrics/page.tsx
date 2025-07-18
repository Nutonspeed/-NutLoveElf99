"use client"
import { useState } from 'react'
import FabricCard from '@/components/fabric/FabricCard'
import AddNewFabricButton from '@/components/fabric/AddNewFabricButton'
import EmptyState from '@/components/ui/EmptyState'
import { fabrics, Fabric } from '@/mock/fabrics'

export default function DashboardFabricsPage() {
  const [items, setItems] = useState<Fabric[]>([...fabrics])

  return (
    <div className="container mx-auto py-8 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">ลายผ้า</h1>
        <AddNewFabricButton onAdd={() => setItems([...fabrics])} />
      </div>
      {items.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map((fabric) => (
            <FabricCard
              key={fabric.id}
              fabric={fabric}
              onUpdated={() => setItems([...fabrics])}
              onDelete={() => setItems([...fabrics])}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="ยังไม่มีลายผ้าในระบบ"
          action={<AddNewFabricButton onAdd={() => setItems([...fabrics])} />}
        />
      )}
    </div>
  )
}
