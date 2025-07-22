export function highlightDiff(current: number, previous: number) {
  if (previous === 0) return { diff: 0, trend: 'up' as const }
  const diff = ((current - previous) / previous) * 100
  return { diff, trend: diff >= 0 ? 'up' : 'down' }
}
