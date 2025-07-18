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

export async function downloadExcel<T extends object>(
  rows: T[],
  filename: string,
) {
  if (rows.length === 0) return
  const ExcelJS = await import('exceljs')
  const wb = new ExcelJS.Workbook()
  const ws = wb.addWorksheet('Sheet1')
  ws.columns = Object.keys(rows[0]).map(key => ({ header: key, key }))
  rows.forEach(row => ws.addRow(row))
  const buf = await wb.xlsx.writeBuffer()
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

export function downloadJSON<T extends object>(data: T, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
