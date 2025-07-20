import type { Bill } from '../schema/bill'

export async function createBill(data: Bill) {
  const res = await fetch('/api/bill/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}
