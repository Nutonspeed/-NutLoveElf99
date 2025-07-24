import { promises as fs } from 'fs'
import { join } from 'path'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Button } from '@/components/ui/buttons/button'

async function loadData() {
  const file = join(process.cwd(), 'mock', 'store', 'analytics', 'staff-activity.json')
  try {
    const txt = await fs.readFile(file, 'utf8')
    return JSON.parse(txt) as { admin: string; createdBills: number; editedOrders: number }[]
  } catch {
    return []
  }
}

export default async function StaffActivityPage() {
  const logs = await loadData()
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center space-x-4">
          <Link href="/admin/analytics">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Staff Activity</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Activity Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="py-1">Admin</th>
                  <th className="py-1">Bills Created</th>
                  <th className="py-1">Orders Edited</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((l) => (
                  <tr key={l.admin} className="border-t">
                    <td className="py-1 pr-2">{l.admin}</td>
                    <td className="py-1 text-center">{l.createdBills}</td>
                    <td className="py-1 text-center">{l.editedOrders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
