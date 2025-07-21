import type { Bill } from '@/types/bill'
import { mockOrders } from './mock-orders'

function escapeCSV(value: string | number | undefined): string {
  const v = value === undefined || value === null ? '' : String(value)
  return '"' + v.replace(/"/g, '""') + '"'
}

export function generateShippingCSV(bills: Bill[]): string {
  const header = ['ชื่อผู้รับ', 'ที่อยู่', 'เบอร์', 'Tracking No.', 'ขนส่ง', 'จำนวน', 'หมายเหตุ']
  const rows = bills.map(b => {
    const order = mockOrders.find(o => o.id === b.orderId)
    const name = order?.shippingAddress.name
    const address = order
      ? `${order.shippingAddress.address} ${order.shippingAddress.city} ${order.shippingAddress.postalCode}`
      : ''
    const phone = order?.shippingAddress.phone
    const tracking = order?.tracking_number
    const provider = order?.delivery_method
    const qty = order ? order.items.reduce((s, i) => s + i.quantity, 0) : ''
    const note = order?.delivery_note
    return [name, address, phone, tracking, provider, qty, note]
      .map(escapeCSV)
      .join(',')
  })
  const csv = [header.map(escapeCSV).join(','), ...rows].join('\n')
  return '\uFEFF' + csv
}

export function downloadShippingCSV(bills: Bill[]) {
  if (bills.length === 0) return
  const csv = generateShippingCSV(bills)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const date = new Date().toISOString().slice(0, 10)
  a.href = url
  a.download = `shipping_manifest_${date}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

// TODO: Integrate Flash Express API for direct submission
