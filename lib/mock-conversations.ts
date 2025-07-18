import type { Conversation } from '@/types/conversation'

export let conversations: Conversation[] = [
  {
    id: 'conv-001',
    customerId: '2',
    customerName: 'John Doe',
    lastMessage: 'สอบถามราคาเบาะโซฟา',
    tags: ['ถามราคา'],
    adminId: '1',
    responseTime: 2,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'conv-002',
    customerId: '3',
    customerName: 'Jane Smith',
    lastMessage: 'จะโอนพรุ่งนี้',
    tags: ['รอโอน'],
    adminId: '1',
    responseTime: 7,
    rating: 2,
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

export function addAdminComment(id: string, comment: string) {
  const convo = conversations.find((c) => c.id === id)
  if (convo) {
    convo.adminComment = comment
    save()
  }
}

export function addManagerComment(id: string, comment: string) {
  const convo = conversations.find((c) => c.id === id)
  if (convo) {
    convo.managerComment = comment
    save()
  }
}

export function recordResponseTime(id: string, minutes: number) {
  const convo = conversations.find((c) => c.id === id)
  if (convo) {
    convo.responseTime = minutes
    save()
  }
}

export function listLowRatingConversations(threshold = 3) {
  return conversations.filter((c) => (c.rating || 0) <= threshold)
}

export function getAdminRanking(period: 'day' | 'week' = 'day') {
  const start = new Date()
  start.setDate(start.getDate() - (period === 'day' ? 1 : 7))
  const stats = new Map<string, { total: number; count: number }>()
  for (const c of conversations) {
    if (!c.adminId || !c.rating) continue
    if (new Date(c.updatedAt) < start) continue
    const data = stats.get(c.adminId) || { total: 0, count: 0 }
    data.total += c.rating
    data.count += 1
    stats.set(c.adminId, data)
  }
  return Array.from(stats.entries())
    .map(([adminId, { total, count }]) => ({
      adminId,
      avgRating: Number((total / count).toFixed(2)),
    }))
    .sort((a, b) => b.avgRating - a.avgRating)
}

export function getKpiSummary() {
  const totalChats = conversations.length
  const avgRating =
    conversations.reduce((a, c) => a + (c.rating || 0), 0) /
    (totalChats || 1)
  const slow = conversations.filter((c) => (c.responseTime || 0) > 5).length
  const fast = conversations.filter((c) => (c.responseTime || 0) <= 5).length
  return { totalChats, avgRating, slow, fast }
}

export function exportKpiCsv() {
  const s = getKpiSummary()
  return `totalChats,avgRating,slowResponses,fastResponses\n${s.totalChats},${s.avgRating},${s.slow},${s.fast}\n`
}
