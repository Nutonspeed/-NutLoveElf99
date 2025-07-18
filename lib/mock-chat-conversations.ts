export interface Conversation {
  id: string
  customer: string
  lastMessage: string
  tags: string[]
  rating?: number
  createdAt: string
}

export let conversations: Conversation[] = [
  {
    id: 'conv-1',
    customer: 'ลูกค้า A',
    lastMessage: 'ขอรายละเอียดสินค้า',
    tags: ['ถามราคา'],
    rating: 4,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'conv-2',
    customer: 'ลูกค้า B',
    lastMessage: 'แจ้งโอนแล้วนะคะ',
    tags: ['รอโอน'],
    createdAt: new Date().toISOString(),
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

export function addTag(id: string, tag: string) {
  const conv = conversations.find(c => c.id === id)
  if (!conv) return
  if (!conv.tags.includes(tag)) conv.tags.push(tag)
  save()
}

export function listConversations() {
  return conversations
}

export function searchByTag(tag: string) {
  return conversations.filter(c => c.tags.includes(tag))
}

export function getStats() {
  const newCustomers = conversations.length
  const pending = conversations.filter(c => c.tags.includes('รอโอน')).length
  const repeat = 0
  return { newCustomers, repeat, pending }
}
