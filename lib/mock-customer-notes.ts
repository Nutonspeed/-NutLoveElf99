export interface CustomerNote {
  id: string
  customerId: string
  note: string
  createdAt: string
}

export let customerNotes: CustomerNote[] = []

export function loadCustomerNotes() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('customerNotes')
    if (stored) customerNotes = JSON.parse(stored)
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('customerNotes', JSON.stringify(customerNotes))
  }
}

export function addCustomerNote(customerId: string, note: string): CustomerNote {
  const entry: CustomerNote = {
    id: Date.now().toString(),
    customerId,
    note,
    createdAt: new Date().toISOString(),
  }
  customerNotes = [entry, ...customerNotes]
  save()
  return entry
}

export function listCustomerNotes(customerId: string): CustomerNote[] {
  return customerNotes.filter((n) => n.customerId === customerId)
}
