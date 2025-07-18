import { mockOrders } from "../lib/mock-orders"
import { conversations } from "../lib/mock-conversations"
import { mockFeedbacks } from "../lib/mock-feedback"
import { supabase } from "../lib/supabase"

export const mockDB = {
  orders: mockOrders,
  conversations,
  feedbacks: mockFeedbacks,
}

export function isWithinDays(dateString: string, numDays: number) {
  const diff = Date.now() - new Date(dateString).getTime()
  return diff <= numDays * 24 * 60 * 60 * 1000
}

export async function countOrders(days?: number): Promise<number> {
  if (!supabase) {
    const list = days ? mockOrders.filter(o => isWithinDays(o.createdAt, days)) : mockOrders
    return list.length
  }
  try {
    let query = supabase.from('orders').select('createdAt')
    if (days) {
      const from = new Date(Date.now() - days * 86400000).toISOString()
      query = query.gte('createdAt', from)
    }
    const { data, error } = await query
    if (error || !data) {
      console.error('Supabase countOrders error', error)
      const list = days ? mockOrders.filter(o => isWithinDays(o.createdAt, days)) : mockOrders
      return list.length
    }
    return data.length
  } catch (err) {
    console.error('Supabase countOrders unexpected error', err)
    const list = days ? mockOrders.filter(o => isWithinDays(o.createdAt, days)) : mockOrders
    return list.length
  }
}

export async function sumOrderTotal(days?: number): Promise<number> {
  if (!supabase) {
    const list = days ? mockOrders.filter(o => isWithinDays(o.createdAt, days)) : mockOrders
    return list.reduce((sum, o) => sum + o.total, 0)
  }
  try {
    let query = supabase.from('orders').select('total, createdAt')
    if (days) {
      const from = new Date(Date.now() - days * 86400000).toISOString()
      query = query.gte('createdAt', from)
    }
    const { data, error } = await query
    if (error || !data) {
      console.error('Supabase sumOrderTotal error', error)
      const list = days ? mockOrders.filter(o => isWithinDays(o.createdAt, days)) : mockOrders
      return list.reduce((sum, o) => sum + o.total, 0)
    }
    return data.reduce((sum, o) => sum + (o as any).total, 0)
  } catch (err) {
    console.error('Supabase sumOrderTotal unexpected error', err)
    const list = days ? mockOrders.filter(o => isWithinDays(o.createdAt, days)) : mockOrders
    return list.reduce((sum, o) => sum + o.total, 0)
  }
}

export async function countChats(days?: number): Promise<number> {
  if (!supabase) {
    const list = days ? conversations.filter(c => isWithinDays(c.updatedAt, days)) : conversations
    return list.length
  }
  try {
    let query = supabase.from('conversations').select('updatedAt')
    if (days) {
      const from = new Date(Date.now() - days * 86400000).toISOString()
      query = query.gte('updatedAt', from)
    }
    const { data, error } = await query
    if (error || !data) {
      console.error('Supabase countChats error', error)
      const list = days ? conversations.filter(c => isWithinDays(c.updatedAt, days)) : conversations
      return list.length
    }
    return data.length
  } catch (err) {
    console.error('Supabase countChats unexpected error', err)
    const list = days ? conversations.filter(c => isWithinDays(c.updatedAt, days)) : conversations
    return list.length
  }
}

export async function averageFeedback(days?: number): Promise<number> {
  if (!supabase) {
    const list = days ? mockFeedbacks.filter(f => isWithinDays(f.createdAt, days)) : mockFeedbacks
    if (list.length === 0) return 0
    return list.reduce((sum, f) => sum + f.rating, 0) / list.length
  }
  try {
    let query = supabase.from('feedbacks').select('rating, createdAt')
    if (days) {
      const from = new Date(Date.now() - days * 86400000).toISOString()
      query = query.gte('createdAt', from)
    }
    const { data, error } = await query
    if (error || !data) {
      console.error('Supabase averageFeedback error', error)
      const list = days ? mockFeedbacks.filter(f => isWithinDays(f.createdAt, days)) : mockFeedbacks
      if (list.length === 0) return 0
      return list.reduce((sum, f) => sum + f.rating, 0) / list.length
    }
    if (data.length === 0) return 0
    return data.reduce((sum, f) => sum + (f as any).rating, 0) / data.length
  } catch (err) {
    console.error('Supabase averageFeedback unexpected error', err)
    const list = days ? mockFeedbacks.filter(f => isWithinDays(f.createdAt, days)) : mockFeedbacks
    if (list.length === 0) return 0
    return list.reduce((sum, f) => sum + f.rating, 0) / list.length
  }
}
