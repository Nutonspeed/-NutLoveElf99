export function exportCSV<T extends object>(rows: T[]): string {
  const keys = Object.keys(rows[0] || {})
  const header = keys.join(',')
  const data = rows.map(r => keys.map(k => (r as any)[k]).join(',')).join('\n')
  return [header, data].join('\n')
}
