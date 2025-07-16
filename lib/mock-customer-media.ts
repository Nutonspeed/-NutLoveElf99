import { mockCustomers } from './mock-customers'
import { getMedia } from './mock-media'

export interface CustomerMediaItem {
  id: string
  customerId: string
  url: string
  name: string
  createdAt: string
}

export let customerMedia: CustomerMediaItem[] = []

export function loadCustomerMedia() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('customerMedia')
    if (stored) {
      customerMedia = JSON.parse(stored)
      return
    }
    const media = getMedia()
    customerMedia = mockCustomers.map((c, idx) => ({
      id: media[idx % media.length].id,
      customerId: c.id,
      url: media[idx % media.length].url,
      name: media[idx % media.length].id,
      createdAt: new Date().toISOString(),
    }))
    save()
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('customerMedia', JSON.stringify(customerMedia))
  }
}

export function addCustomerMedia(customerId: string, file: File): CustomerMediaItem {
  const item: CustomerMediaItem = {
    id: Date.now().toString(),
    customerId,
    url: URL.createObjectURL(file),
    name: file.name,
    createdAt: new Date().toISOString(),
  }
  customerMedia = [item, ...customerMedia]
  save()
  return item
}

export function listCustomerMedia(customerId: string): CustomerMediaItem[] {
  return customerMedia.filter((m) => m.customerId === customerId)
}
