import type { ChatBill } from '@/types/chat-bill'

export let chatBills: ChatBill[] = []

export function loadChatBills() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('chatBills')
    if (stored) chatBills = JSON.parse(stored)
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('chatBills', JSON.stringify(chatBills))
  }
}

export function createChatBill(data: Omit<ChatBill, 'billId' | 'createdAt' | 'status'>) {
  const bill: ChatBill = {
    billId: `cb-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    status: 'draft',
    ...data,
  }
  chatBills = [bill, ...chatBills]
  save()
  return bill
}

export function markChatBillSent(id: string) {
  chatBills = chatBills.map((b) => (b.billId === id ? { ...b, status: 'sent' } : b))
  save()
}

export function markChatBillPaid(id: string) {
  chatBills = chatBills.map((b) => (b.billId === id ? { ...b, status: 'paid' } : b))
  save()
}

export function getChatBill(id: string) {
  return chatBills.find((b) => b.billId === id)
}

export function listChatBills() {
  return chatBills
}
