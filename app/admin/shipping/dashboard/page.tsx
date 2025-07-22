'use client'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const DashboardContent = dynamic(() => import('./content'), { suspense: true })

export default function ShippingDashboardPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  )
}
