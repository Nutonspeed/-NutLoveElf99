export interface CustomerComment {
  id: string
  customerId: string
  adminId: string
  comment: string
  createdAt: string
}

export let customerComments: CustomerComment[] = []

export function loadCustomerComments() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('customerComments')
    if (stored) customerComments = JSON.parse(stored)
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('customerComments', JSON.stringify(customerComments))
  }
}

export function addCustomerComment(
  customerId: string,
  comment: string,
  adminId: string = 'unknown',
): CustomerComment {
  const entry: CustomerComment = {
    id: Date.now().toString(),
    customerId,
    adminId,
    comment,
    createdAt: new Date().toISOString(),
  }
  customerComments = [entry, ...customerComments]
  save()
  return entry
}

export function listCustomerComments(customerId: string): CustomerComment[] {
  return customerComments.filter((c) => c.customerId === customerId)
}
