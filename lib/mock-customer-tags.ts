export interface CustomerTag {
  id: string
  customerId: string
  tag: string
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

export function addCustomerTag(customerId: string, tag: string): CustomerTag {
  if (customerTags.some((t) => t.customerId === customerId && t.tag === tag)) {
    return customerTags.find((t) => t.customerId === customerId && t.tag === tag)!;
  }
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
  const tag = customerTags.find((t) => t.id === id)
  if (tag && defaultTags.includes(tag.tag)) return
  customerTags = customerTags.filter((t) => t.id !== id)
  save()
}

export let tagNames: string[] = [...defaultTags]

export function loadTagNames() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('customerTagNames')
    if (stored) tagNames = JSON.parse(stored)
  }
}

function saveTagNames() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('customerTagNames', JSON.stringify(tagNames))
  }
}

export function listTagNames(): string[] {
  return tagNames
}

export function addTagName(name: string) {
  if (tagNames.includes(name)) return
  tagNames = [...tagNames, name]
  saveTagNames()
}

export function updateTagName(oldName: string, newName: string) {
  tagNames = tagNames.map((t) => (t === oldName ? newName : t))
  customerTags = customerTags.map((ct) =>
    ct.tag === oldName ? { ...ct, tag: newName } : ct,
  )
  saveTagNames()
  save()
}

export function removeTagName(name: string) {
  tagNames = tagNames.filter((t) => t !== name)
  customerTags = customerTags.filter((ct) => ct.tag !== name)
  saveTagNames()
  save()
}
