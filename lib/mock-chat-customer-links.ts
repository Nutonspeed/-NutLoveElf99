export interface ChatCustomerLink {
  conversationId: string
  customerId: string
}

export let chatCustomerLinks: ChatCustomerLink[] = []

export function loadChatCustomerLinks() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('chatCustomerLinks')
    if (stored) chatCustomerLinks = JSON.parse(stored)
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('chatCustomerLinks', JSON.stringify(chatCustomerLinks))
  }
}

export function linkCustomer(conversationId: string, customerId: string) {
  const existing = chatCustomerLinks.find((l) => l.conversationId === conversationId)
  if (existing) {
    existing.customerId = customerId
  } else {
    chatCustomerLinks.push({ conversationId, customerId })
  }
  save()
}

import { mockCustomers } from './mock-customers'

export function getCustomerByConversation(conversationId: string) {
  const link = chatCustomerLinks.find((l) => l.conversationId === conversationId)
  if (!link) return undefined
  return mockCustomers.find((c) => c.id === link.customerId)
}
