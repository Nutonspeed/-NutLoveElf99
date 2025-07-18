"use client"
import { cn } from '@/lib/utils'

interface Props {
  id: string
  customer: string
  status: string
  total: number
}

export default function OrderCard({ id, customer, status, total }: Props) {
  const statusColor =
    status === 'Paid'
      ? 'bg-green-100 text-green-800'
      : status === 'Cancelled'
      ? 'bg-red-100 text-red-800'
      : 'bg-yellow-100 text-yellow-800'

  return (
    <div
      onClick={() => alert(id)}
      className={cn(
        'rounded border p-4 space-y-1 hover:shadow hover:border-gray-300',
        'transition-colors'
      )}
    >
      <div className="flex justify-between text-sm font-medium">
        <span>{id}</span>
        <span className={cn('px-2 rounded text-xs', statusColor)}>{status}</span>
      </div>
      <p className="text-sm">{customer}</p>
      <p className="text-sm font-semibold">฿{total.toLocaleString()}</p>
    </div>
  )
}
