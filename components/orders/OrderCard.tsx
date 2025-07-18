"use client"
import { cn } from '@/lib/utils'
import { RefreshCcw } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

interface Props {
  id: string
  customer: string
  status: string
  total: number
}

export default function OrderCard({ id, customer, status: initialStatus, total }: Props) {
  const { toast } = useToast()
  const [status, setStatus] = useState(initialStatus as 'Pending' | 'Paid' | 'Cancelled')
  const statusColor =
    status === 'Paid'
      ? 'bg-green-100 text-green-800'
      : status === 'Cancelled'
      ? 'bg-red-100 text-red-800'
      : 'bg-yellow-100 text-yellow-800'

  const cycleStatus = () => {
    const next = status === 'Pending' ? 'Paid' : status === 'Paid' ? 'Cancelled' : 'Pending'
    setStatus(next)
    toast({ description: 'สถานะคำสั่งซื้อถูกเปลี่ยนแล้ว' })
  }

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
        <div className="flex items-center gap-1">
          <span className={cn('px-2 rounded text-xs', statusColor)}>{status}</span>
          <button onClick={cycleStatus} className="rounded p-1" aria-label="cycle status">
            <RefreshCcw className="h-3 w-3" />
          </button>
        </div>
      </div>
      <p className="text-sm">{customer}</p>
      <p className="text-sm font-semibold">฿{total.toLocaleString()}</p>
    </div>
  )
}
