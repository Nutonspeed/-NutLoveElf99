import type { Conversation } from '@/types/conversation'

export let conversations: Conversation[] = [
  {
    id: 'conv-001',
    customerId: '2',
    customerName: 'John Doe',
    lastMessage: 'สอบถามราคาเบาะโซฟา',
    tags: ['ถามราคา'],
    updatedAt: new Date().toISOString(),
    status: 'open',
    answered: false,
    archived: false,
  },
  {
    id: 'conv-002',
    customerId: '3',
    customerName: 'Jane Smith',
    lastMessage: 'จะโอนพรุ่งนี้',
    tags: ['รอโอน'],
    updatedAt: new Date().toISOString(),
    status: 'closed',
    answered: true,
    archived: false,
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

export function toggleArchive(id: string) {
  const convo = conversations.find((c) => c.id === id)
  if (convo) {
    convo.archived = !convo.archived
    save()
  }
}

export function setStatus(id: string, status: Conversation['status']) {
  const convo = conversations.find((c) => c.id === id)
  if (convo) {
    convo.status = status
    save()
  }
}

export function setAnswered(id: string, answered: boolean) {
  const convo = conversations.find((c) => c.id === id)
  if (convo) {
    convo.answered = answered
    save()
  }
}
