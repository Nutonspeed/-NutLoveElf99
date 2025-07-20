import type { Conversation } from '@/types/conversation'
import { findNextAvailableAgent, getAgent } from '@/lib/mock-chat-agents'

export let conversations: Conversation[] = [
  {
    id: 'conv-001',
    customerId: '2',
    customerName: 'John Doe',
    lastMessage: 'สอบถามราคาเบาะโซฟา',
    tags: ['ถามราคา'],
    agentId: 'agent1',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'conv-002',
    customerId: '3',
    customerName: 'Jane Smith',
    lastMessage: 'จะโอนพรุ่งนี้',
    tags: ['รอโอน'],
    agentId: 'agent2',
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
  ensureAssignments()
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

export function assignAgent(id: string, agentId: string) {
  const convo = conversations.find((c) => c.id === id)
  if (convo) {
    convo.agentId = agentId
    save()
  }
}

function ensureAssignments() {
  const next = findNextAvailableAgent()
  if (!next) return
  conversations.forEach((c) => {
    const assigned = c.agentId ? getAgent(c.agentId) : undefined
    if (!assigned || !assigned.online) {
      c.agentId = next.id
    }
  })
  save()
}
