import { NextResponse } from 'next/server'
import { join } from 'path'
import { readJson, writeJson } from '@/lib/jsonFile'

export async function POST() {
  const dir = join(process.cwd(), 'mock', 'store')
  const ordersFile = join(dir, 'orders.json')
  const shipFile = join(dir, 'shipping-status.json')
  const logFile = join(dir, 'activity-log.json')

  const orders = await readJson<any[]>(ordersFile, [])
  const statuses = await readJson<any[]>(shipFile, [])
  const log = await readJson<any[]>(logFile, [])
  let updated = 0

  statuses.forEach((s) => {
    if (s.status === 'delivered') {
      const o = orders.find((od) => od.id === s.billId)
      if (o && o.status !== 'completed') {
        o.status = 'completed'
        updated++
        log.push({
          timestamp: new Date().toISOString(),
          action: `auto complete ${o.id}`,
          admin: 'system',
        })
      }
    }
  })

  if (updated > 0) {
    await writeJson(ordersFile, orders)
    await writeJson(logFile, log)
  }

  return NextResponse.json({ updated })
}
