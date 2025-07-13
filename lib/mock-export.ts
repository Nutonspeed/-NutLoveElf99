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
