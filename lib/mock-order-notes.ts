export interface OrderNote {
  id: string
  orderId: string
  adminId: string
  note: string
  createdAt: string
}

export let orderNotes: OrderNote[] = []

export function loadOrderNotes() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('orderNotes')
    if (stored) orderNotes = JSON.parse(stored)
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('orderNotes', JSON.stringify(orderNotes))
  }
}

export function addOrderNote(orderId: string, note: string, adminId: string = 'unknown'): OrderNote {
  const entry: OrderNote = {
    id: Date.now().toString(),
    orderId,
    adminId,
    note,
    createdAt: new Date().toISOString(),
  }
  orderNotes = [entry, ...orderNotes]
  save()
  return entry
}

export function listOrderNotes(orderId: string): OrderNote[] {
  return orderNotes.filter((n) => n.orderId === orderId)
}
