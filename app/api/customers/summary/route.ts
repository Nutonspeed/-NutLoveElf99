import { NextResponse } from 'next/server'
import { join } from 'path'
import { readJson } from '@/lib/jsonStore'

function billTotal(b: any) {
  return (b.items || []).reduce((s: number, i: any) => s + i.price * i.quantity, 0) + (b.shipping || 0)
}

export async function GET() {
  const dir = join(process.cwd(), 'mock', 'store')
  const customers = await readJson<any[]>(join(dir, 'customers.json'), [])
  const bills = await readJson<any[]>(join(dir, 'bills.json'), [])

  const spendMap = new Map<string, number>()
  customers.forEach(c => spendMap.set(c.id, 0))
  bills.forEach(b => {
    const id = b.customerId || b.customer
    spendMap.set(id, (spendMap.get(id) || 0) + billTotal(b))
  })

  const totalCustomers = customers.length
  const repeatCustomers = customers.filter(c => bills.filter(b => (b.customerId || b.customer) === c.id).length > 1).length
  const avgSpend = totalCustomers ? Array.from(spendMap.values()).reduce((a, b) => a + b, 0) / totalCustomers : 0
  const repeatRate = totalCustomers ? repeatCustomers / totalCustomers : 0
  const top = Array.from(spendMap.entries())
    .map(([id, total]) => ({ name: customers.find(c => c.id === id)?.name || id, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)

  return NextResponse.json({ totalCustomers, repeatRate, avgSpend, top })
}
