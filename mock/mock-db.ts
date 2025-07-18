import { mockOrders } from "../lib/mock-orders"
import { conversations } from "../lib/mock-conversations"
import { mockFeedbacks } from "../lib/mock-feedback"

export const mockDB = {
  orders: mockOrders,
  conversations,
  feedbacks: mockFeedbacks,
}

export function isWithinDays(dateString: string, numDays: number) {
  const diff = Date.now() - new Date(dateString).getTime()
  return diff <= numDays * 24 * 60 * 60 * 1000
}

export function countOrders(days?: number) {
  const list = days ? mockOrders.filter(o => isWithinDays(o.createdAt, days)) : mockOrders
  return list.length
}

export function sumOrderTotal(days?: number) {
  const list = days ? mockOrders.filter(o => isWithinDays(o.createdAt, days)) : mockOrders
  return list.reduce((sum, o) => sum + o.total, 0)
}

export function countChats(days?: number) {
  const list = days ? conversations.filter(c => isWithinDays(c.updatedAt, days)) : conversations
  return list.length
}

export function averageFeedback(days?: number) {
  const list = days ? mockFeedbacks.filter(f => isWithinDays(f.createdAt, days)) : mockFeedbacks
  if (list.length === 0) return 0
  return list.reduce((sum, f) => sum + f.rating, 0) / list.length
}
