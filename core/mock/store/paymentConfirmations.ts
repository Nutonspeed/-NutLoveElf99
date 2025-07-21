import { loadFromStorage, saveToStorage } from './persist'

export interface PaymentConfirmation {
  id: string
  billId: string
  amount: number
  method: string
  datetime: string
  slip?: string
}

const KEY = 'mockStore_paymentConfirmations'

let confirmations: PaymentConfirmation[] = loadFromStorage(KEY, [])

function persist() {
  saveToStorage(KEY, confirmations)
}

export function getPaymentConfirmations(billId: string) {
  return confirmations.filter(c => c.billId === billId)
}

export function addPaymentConfirmation(data: Omit<PaymentConfirmation, 'id'>) {
  const confirmation: PaymentConfirmation = {
    ...data,
    id: `pc-${Date.now()}`,
  }
  confirmations.push(confirmation)
  persist()
  return confirmation
}

export function resetPaymentConfirmations() {
  confirmations = []
  persist()
}
