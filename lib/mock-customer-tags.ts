export interface CustomerTag {
  id: string
  customerId: string
  tag: string
  createdAt: string
}

export let customerTags: CustomerTag[] = []

export function loadCustomerTags() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('customerTags')
    if (stored) customerTags = JSON.parse(stored)
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('customerTags', JSON.stringify(customerTags))
  }
}

export function addCustomerTag(customerId: string, tag: string): CustomerTag {
  const entry: CustomerTag = {
    id: Date.now().toString(),
    customerId,
    tag,
    createdAt: new Date().toISOString(),
  }
  customerTags = [entry, ...customerTags]
  save()
  return entry
}

export function listCustomerTags(customerId: string): CustomerTag[] {
  return customerTags.filter((t) => t.customerId === customerId)
}

export function removeCustomerTag(id: string) {
  customerTags = customerTags.filter((t) => t.id !== id)
  save()
}
