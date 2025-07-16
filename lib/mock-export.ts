export function exportCSV<T extends object>(rows: T[]): string {
  const keys = Object.keys(rows[0] || {})
  const header = keys.join(',')
  const data = rows.map(r => keys.map(k => (r as any)[k]).join(',')).join('\n')
  return [header, data].join('\n')
}

export function downloadCSV<T extends object>(rows: T[], filename: string) {
  if (rows.length === 0) return
  const csv = exportCSV(rows)
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function downloadPDF(content: string, filename: string) {
  if (!content) return
  const blob = new Blob([content], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

import type { Order } from '@/types/order'

export function orderSummaryByStatus(orders: Order[]): Record<string, number> {
  return orders.reduce<Record<string, number>>((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1
    return acc
  }, {})
}

export function orderSummaryText(orders: Order[]): string {
  const summary = orderSummaryByStatus(orders)
  return Object.entries(summary)
    .map(([status, count]) => `${status}: ${count}`)
    .join('\n')
}

export function downloadOrderSummaryPDF(orders: Order[], filename: string) {
  const text = orderSummaryText(orders)
  downloadPDF(text, filename)
}

export async function downloadExcel<T extends object>(
  rows: T[],
  filename: string,
) {
  if (rows.length === 0) return
  const XLSX = await import('xlsx')
  const ws = XLSX.utils.json_to_sheet(rows)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([buf], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
