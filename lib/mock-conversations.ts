export interface Conversation {
  id: string
  customerId: string
  note?: string
  tags: string[]
  bills: string[]
  callHistory: string[]
  isNew: boolean
}

export let conversations: Conversation[] = []

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

export function getConversation(id: string): Conversation | undefined {
  return conversations.find((c) => c.id === id)
}

export function upsertConversation(data: Partial<Conversation> & { id: string }) {
  const existing = getConversation(data.id)
  if (existing) {
    Object.assign(existing, data)
  } else {
    conversations.push({
      id: data.id,
      customerId: data.customerId || data.id,
      note: data.note || '',
      tags: data.tags || [],
      bills: [],
      callHistory: [],
      isNew: true,
    })
  }
  save()
}

export function setConversationNote(id: string, note: string) {
  const conv = getConversation(id)
  if (!conv) return
  conv.note = note
  save()
}

export function addConversationBill(id: string, billId: string) {
  const conv = getConversation(id)
  if (!conv) return
  conv.bills.unshift(billId)
  save()
}

export function addCallLog(id: string) {
  const conv = getConversation(id)
  if (!conv) return
  conv.callHistory.unshift(new Date().toISOString())
  save()
}

export function addTag(id: string, tag: string) {
  const conv = getConversation(id)
  if (!conv) return
  if (!conv.tags.includes(tag)) conv.tags.push(tag)
  save()
}

export function listConversations(tag?: string): Conversation[] {
  return tag ? conversations.filter((c) => c.tags.includes(tag)) : conversations
}
