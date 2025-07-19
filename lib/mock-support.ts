export interface SupportMessage {
  from: 'customer' | 'staff'
  text: string
  date: string
}

export interface SupportTicket {
  id: string
  name: string
  email: string
  question: string
  status: 'ใหม่' | 'ตอบแล้ว' | 'ปิดแล้ว'
  createdAt: string
  messages: SupportMessage[]
}

export let tickets: SupportTicket[] = [
  {
    id: 'TIC-001',
    name: 'สมชาย ใจดี',
    email: 'somchai@example.com',
    question: 'สินค้ามีสีอะไรบ้าง',
    status: 'ใหม่',
    createdAt: new Date().toISOString(),
    messages: [
      { from: 'customer', text: 'สินค้ามีสีอะไรบ้าง', date: new Date().toISOString() },
    ],
  },
]

export function loadTickets() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('supportTickets')
    if (stored) tickets = JSON.parse(stored)
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('supportTickets', JSON.stringify(tickets))
  }
}

export function createTicket(data: { name: string; email: string; question: string }) {
  const t: SupportTicket = {
    id: `TIC-${Date.now()}`,
    name: data.name,
    email: data.email,
    question: data.question,
    status: 'ใหม่',
    createdAt: new Date().toISOString(),
    messages: [
      { from: 'customer', text: data.question, date: new Date().toISOString() },
    ],
  }
  tickets.unshift(t)
  save()
  return t
}

export function addReply(id: string, text: string, from: 'customer' | 'staff' = 'staff') {
  const t = tickets.find((tk) => tk.id === id)
  if (!t) return
  t.messages.push({ from, text, date: new Date().toISOString() })
  if (from === 'staff') t.status = 'ตอบแล้ว'
  save()
}

export function closeTicket(id: string) {
  const t = tickets.find((tk) => tk.id === id)
  if (!t) return
  t.status = 'ปิดแล้ว'
  save()
}

export function averageReplyHours() {
  const withReply = tickets.filter((t) => t.messages.some((m) => m.from === 'staff'))
  if (withReply.length === 0) return 0
  const sum = withReply.reduce((acc, t) => {
    const q = t.messages.find((m) => m.from === 'customer')
    const a = t.messages.find((m) => m.from === 'staff')
    if (!q || !a) return acc
    return acc + (new Date(a.date).getTime() - new Date(q.date).getTime())
  }, 0)
  return sum / withReply.length / 3600000
}
