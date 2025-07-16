export function generateMockId(prefix: 'quote' | 'bill'): string {
  const date = new Date().getTime().toString(36).slice(-4)
  const rand = Math.random().toString(36).slice(2, 6)
  return `${prefix}-${date}${rand}`
}
