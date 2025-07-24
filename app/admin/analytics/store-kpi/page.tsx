import { promises as fs } from 'fs'
import { join } from 'path'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Button } from '@/components/ui/buttons/button'

async function loadKpi() {
  const file = join(process.cwd(), 'mock', 'store', 'analytics', 'store-kpi.json')
  try {
    const txt = await fs.readFile(file, 'utf8')
    return JSON.parse(txt) as {
      averageDailyOrders: number
      billClosingRate: number
      topPatternPercent: number
    }
  } catch {
    return { averageDailyOrders: 0, billClosingRate: 0, topPatternPercent: 0 }
  }
}

export default async function KPIPage() {
  const { averageDailyOrders, billClosingRate, topPatternPercent } = await loadKpi()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center space-x-4">
          <Link href="/admin/analytics">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Store KPI</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Performance Index</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>Average daily orders: <span class="font-semibold">{averageDailyOrders}</span></div>
            <div>Bill closing rate: <span class="font-semibold">{billClosingRate}%</span></div>
            <div>Top pattern %: <span class="font-semibold">{topPatternPercent}%</span></div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
