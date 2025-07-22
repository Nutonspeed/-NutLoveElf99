import { promises as fs } from 'fs'
import { join } from 'path'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/buttons/button'

async function loadJson(file: string) {
  try {
    const txt = await fs.readFile(file,'utf8')
    return JSON.parse(txt)
  } catch {
    return []
  }
}

export default async function KPIPage() {
  const dir = join(process.cwd(),'mock','store')
  const ship = await loadJson(join(dir,'shipping-log.json'))
  const orders = await loadJson(join(dir,'orders.json'))
  const feedback = await loadJson(join(dir,'feedback.json'))

  const avgShip = ship.length
    ? ship.reduce((s,r)=> s + (new Date(r.deliveredAt).getTime()-new Date(r.shippedAt).getTime()),0) / ship.length / 3600000
    : 0
  const paidPct = orders.length
    ? (orders.filter(o=>o.status==='paid').length / orders.length) * 100
    : 0
  const rating = feedback.length
    ? feedback.reduce((s,f)=> s+f.rating,0)/feedback.length
    : 0

  const scoreColor = (val:number, good:number) => val>=good ? 'green' : val>=good*0.7 ? 'yellow' : 'red'
  const colorClass = (c:string) => ({
    green: 'bg-green-200 text-green-800',
    yellow: 'bg-yellow-200 text-yellow-800',
    red: 'bg-red-200 text-red-800'
  }[c])

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
            <div>
              Avg ship time:{' '}
              <Badge className={colorClass(scoreColor(48 - avgShip, 1))}>{avgShip.toFixed(1)}h</Badge>{' '}
              (benchmark &lt;48h)
            </div>
            <div>
              Paid orders:{' '}
              <Badge className={colorClass(scoreColor(paidPct, 80))}>{paidPct.toFixed(0)}%</Badge>{' '}
              (benchmark 80%)
            </div>
            <div>
              Feedback rating:{' '}
              <Badge className={colorClass(scoreColor(rating, 4))}>{rating.toFixed(1)}</Badge>{' '}
              (benchmark 4+)
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
