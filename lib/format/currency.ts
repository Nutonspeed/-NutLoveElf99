export function formatCurrencyTHB(amount: number): string {
  return amount.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })
}
