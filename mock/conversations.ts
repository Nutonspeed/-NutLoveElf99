export interface Message {
  id: string
  sender: 'customer' | 'admin'
  text: string
  createdAt: string
  billId?: string
}

export interface Conversation {
  id: string
  customer: string
  messages: Message[]
}

export let mockConversations: Conversation[] = [
  {
    id: 'c1',
    customer: 'สมชาย ใจดี',
    messages: [
      { id: 'm1', sender: 'customer', text: 'สนใจผ้าคลุมโซฟาครับ', createdAt: new Date().toISOString() },
      { id: 'm2', sender: 'admin', text: 'สินค้าพร้อมส่งค่ะ', createdAt: new Date().toISOString() },
    ],
  },
  {
    id: 'c2',
    customer: 'สายใจ สุขสันต์',
    messages: [
      { id: 'm1', sender: 'customer', text: 'สอบถามราคาหน่อยค่ะ', createdAt: new Date().toISOString() },
    ],
  },
]

export function addConversationMessage(conversationId: string, msg: Omit<Message, 'id' | 'createdAt'>) {
  const conv = mockConversations.find((c) => c.id === conversationId)
  if (!conv) return
  const entry: Message = { id: Date.now().toString(), createdAt: new Date().toISOString(), ...msg }
  conv.messages.push(entry)
}
