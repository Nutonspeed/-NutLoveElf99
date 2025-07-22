export function formatDateThai(date: string | number | Date): string {
  const str = new Date(date).toLocaleString('th-TH', {
    day: '2-digit',
    month: 'short',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
  const [d, m, y, time] = str.split(' ')
  return `${d} ${m} ${y} - ${time} น.`
}
