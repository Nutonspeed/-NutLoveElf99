"use client"
import { cn } from '@/lib/utils'
import InlineStatusBadge from '@/components/ui/InlineStatusBadge'

interface Props {
  id: string
  customer: string
  status: string
  total: number
}

export default function OrderCard({ id, customer, status, total }: Props) {
  return (
    <div
      className={cn(
        'rounded border p-4 space-y-1 hover:shadow hover:border-gray-300',
        'transition-colors'
      )}
    >
      <div className="flex justify-between text-sm font-medium">
        <span>{id}</span>
        <InlineStatusBadge status={status as any} />
      </div>
      <p className="text-sm">{customer}</p>
      <p className="text-sm font-semibold">฿{total.toLocaleString()}</p>
    </div>
  )
}
