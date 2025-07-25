export function formatCurrency(amount: number): string {
  return amount.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })
}
