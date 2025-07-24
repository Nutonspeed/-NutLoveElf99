import bills from '@/mock/store/bills.json'

export interface ReceiptItem { name: string; quantity: number; price: number }
export interface ReceiptBill {
  id: string
  customer: string
  items: ReceiptItem[]
  shipping?: number
  discount?: number
  note?: string
  paymentStatus?: string
}

export function getPaidBill(id: string): ReceiptBill | null {
  const bill = (bills as ReceiptBill[]).find(b => b.id === id)
  if (!bill || bill.paymentStatus !== 'paid') return null
  return bill
}

export function calcTotal(bill: ReceiptBill) {
  const subtotal = bill.items.reduce((s, it) => s + it.price * it.quantity, 0)
  return subtotal - (bill.discount || 0) + (bill.shipping || 0)
}
