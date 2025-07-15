"use client"
import EmptyState from "@/components/EmptyState"
import { getMockAlert } from "@/lib/mock-alerts"

export default function AlertPreview({ params }: { params: { id: string } }) {
  const alert = getMockAlert(params.id)
  if (!alert) return <EmptyState title="ไม่มี mock alert" />
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">{alert.title}</h1>
      <p>{alert.message}</p>
      {alert.image && (
        <img src={alert.image} alt={alert.title} className="max-w-xs" />
      )}
    </div>
  )
}
