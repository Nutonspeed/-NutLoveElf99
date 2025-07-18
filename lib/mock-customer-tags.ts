export interface CustomerTag {
  id: string
  customerId: string
  tag: string
  adminId: string
  createdAt: string
}

export const defaultTags = ['สายหวาน', 'ขาประจำ', 'อารมณ์ร้อน']

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

export function addCustomerTag(
  customerId: string,
  tag: string,
  adminId: string = 'unknown',
): CustomerTag {
  if (customerTags.some((t) => t.customerId === customerId && t.tag === tag)) {
    return customerTags.find((t) => t.customerId === customerId && t.tag === tag)!;
  }
  const entry: CustomerTag = {
    id: Date.now().toString(),
    customerId,
    tag,
    adminId,
    createdAt: new Date().toISOString(),
  }
  customerTags = [entry, ...customerTags]
  save()
  return entry
}

export function listCustomerTags(
  customerId: string,
  adminId?: string,
): CustomerTag[] {
  return customerTags.filter(
    (t) => t.customerId === customerId && (!adminId || t.adminId === adminId),
  )
}

export function removeCustomerTag(id: string) {
  const tag = customerTags.find((t) => t.id === id)
  if (tag && defaultTags.includes(tag.tag)) return
  customerTags = customerTags.filter((t) => t.id !== id)
  save()
}
