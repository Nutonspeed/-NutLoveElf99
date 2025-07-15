import type { Conversation } from '@/types/conversation'

export let conversations: Conversation[] = [
  {
    id: 'conv-001',
    customerId: '2',
    customerName: 'John Doe',
    lastMessage: 'สอบถามราคาเบาะโซฟา',
    tags: ['ถามราคา'],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'conv-002',
    customerId: '3',
    customerName: 'Jane Smith',
    lastMessage: 'จะโอนพรุ่งนี้',
    tags: ['รอโอน'],
    updatedAt: new Date().toISOString(),
  },
]

export function loadConversations() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('conversations')
    if (stored) conversations = JSON.parse(stored)
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('conversations', JSON.stringify(conversations))
  }
}

export function listConversations() {
  return conversations
}

export function addTag(id: string, tag: string) {
  const convo = conversations.find((c) => c.id === id)
  if (convo && !convo.tags.includes(tag)) {
    convo.tags.push(tag)
    convo.updatedAt = new Date().toISOString()
    save()
  }
}

export function removeTag(id: string, tag: string) {
  const convo = conversations.find((c) => c.id === id)
  if (convo) {
    convo.tags = convo.tags.filter((t) => t !== tag)
    convo.updatedAt = new Date().toISOString()
    save()
  }
}

export function searchByTag(tag: string) {
  return conversations.filter((c) => c.tags.includes(tag))
}

export function setRating(id: string, rating: number) {
  const convo = conversations.find((c) => c.id === id)
  if (convo) {
    convo.rating = rating
    save()
  }
}
