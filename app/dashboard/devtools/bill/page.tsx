"use client"
import { useEffect, useState } from 'react'
import { mockBills } from '@/lib/mock-bills'
import { sendBillNotify, getBillNotifyStatus, loadBillNotifyLog } from '@/lib/mock-bill-notify'
import { Button } from '@/components/ui/buttons/button'

export default function BillDevtoolsPage() {
  const [status, setStatus] = useState<Record<string, string>>({})

  useEffect(() => {
    loadBillNotifyLog()
    const obj: Record<string, string> = {}
    mockBills.forEach(b => {
      const log = getBillNotifyStatus(b.id)
      obj[b.id] = log ? `${log.status} at ${new Date(log.time).toLocaleTimeString()}` : '-' 
    })
    setStatus(obj)
  }, [])

  const handleNotify = async (id: string) => {
    await sendBillNotify(id)
    const log = getBillNotifyStatus(id)
    setStatus(prev => ({ ...prev, [id]: log ? `${log.status} at ${new Date(log.time).toLocaleTimeString()}` : '-' }))
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Bill Notify</h1>
      <ul className="space-y-2">
        {mockBills.map(b => (
          <li key={b.id} className="flex gap-2 items-center">
            <span className="w-32">{b.id}</span>
            <Button onClick={() => handleNotify(b.id)}>Notify</Button>
            <span className="text-sm text-gray-500">{status[b.id]}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
