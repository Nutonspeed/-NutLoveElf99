import { promises as fs } from 'fs'
import { join } from 'path'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'

interface PendingItem {
  billId: string
  billNo: string
  customer: string
  updatedAt: string
  status: string
  category: 'unpaid' | 'notPrinted' | 'readyToShip'
}

async function loadPending(): Promise<PendingItem[]> {
  const file = join(process.cwd(), 'mock', 'store', 'pending-orders.json')
  try {
    const text = await fs.readFile(file, 'utf8')
    return JSON.parse(text) as PendingItem[]
  } catch {
    return []
  }
}

export default async function PendingOrderAlerts() {
  const items = await loadPending()
  const unpaid = items.filter(i => i.category === 'unpaid')
  const notPrinted = items.filter(i => i.category === 'notPrinted')
  const ready = items.filter(i => i.category === 'readyToShip')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/analytics">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Pending Order Alerts</h1>
        </div>

        <div className="flex gap-2">
          <select className="border p-1 text-sm">
            <option>all staff</option>
          </select>
          <input className="border p-1 text-sm flex-1" placeholder="tag" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Unpaid Bills ({unpaid.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {unpaid.map(it => (
              <div key={it.billId} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                <div>
                  <p className="font-medium">{it.billNo} - {it.customer}</p>
                  <p className="text-xs text-gray-500">{new Date(it.updatedAt).toLocaleString()} - {it.status}</p>
                </div>
                <Link href={`/admin/bill/view/${it.billId}`}>
                  <Button size="sm" variant="outline">View</Button>
                </Link>
              </div>
            ))}
            {unpaid.length === 0 && <p className="text-center text-sm text-gray-500">No alerts</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bills Not Printed ({notPrinted.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {notPrinted.map(it => (
              <div key={it.billId} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                <div>
                  <p className="font-medium">{it.billNo} - {it.customer}</p>
                  <p className="text-xs text-gray-500">{new Date(it.updatedAt).toLocaleString()} - {it.status}</p>
                </div>
                <Link href={`/admin/bill/view/${it.billId}`}>
                  <Button size="sm" variant="outline">View</Button>
                </Link>
              </div>
            ))}
            {notPrinted.length === 0 && <p className="text-center text-sm text-gray-500">No alerts</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ready to Ship ({ready.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {ready.map(it => (
              <div key={it.billId} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                <div>
                  <p className="font-medium">{it.billNo} - {it.customer}</p>
                  <p className="text-xs text-gray-500">{new Date(it.updatedAt).toLocaleString()} - {it.status}</p>
                </div>
                <Link href={`/admin/bill/view/${it.billId}`}>
                  <Button size="sm" variant="outline">View</Button>
                </Link>
              </div>
            ))}
            {ready.length === 0 && <p className="text-center text-sm text-gray-500">No alerts</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
