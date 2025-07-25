import type { Bill } from '@/core/modules/bill'
import { calculateTotal, getBillStatus } from '@/core/modules/bill'
import { formatCurrencyTHB } from '@/lib/format/currency'

export function formatBillDisplay(bill: Bill) {
  const { subtotal, total } = calculateTotal(bill)
  return {
    ...bill,
    subtotalText: formatCurrencyTHB(subtotal),
    totalText: formatCurrencyTHB(total),
    statusLabel: getBillStatus(bill.status),
  }
}
