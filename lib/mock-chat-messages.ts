import { getChatTemplate } from './mock-chat-templates'

export interface ChatMessageEntry {
  id: string
  conversationId: string
  templateId: string
  text: string
  createdAt: string
}

export let chatMessages: Record<string, ChatMessageEntry[]> = {
  'conv-001': [
    {
      id: 'm1',
      conversationId: 'conv-001',
      templateId: 'bill_created',
      text: 'เราได้ออกบิลใหม่ให้คุณแล้วค่ะ',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'm2',
      conversationId: 'conv-001',
      templateId: 'status_paid',
      text: 'ออเดอร์ของคุณชำระเรียบร้อยแล้วค่ะ',
      createdAt: new Date().toISOString(),
    },
  ],
}

export function loadChatMessages() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('chatMessages')
    if (stored) chatMessages = JSON.parse(stored)
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages))
  }
}

export function addChatMessage(conversationId: string, templateId: string): ChatMessageEntry | null {
  const template = getChatTemplate(templateId)
  if (!template) return null
  const msg: ChatMessageEntry = {
    id: Date.now().toString(),
    conversationId,
    templateId,
    text: template.text,
    createdAt: new Date().toISOString(),
  }
  if (!chatMessages[conversationId]) chatMessages[conversationId] = []
  chatMessages[conversationId].push(msg)
  save()
  return msg
}

export function deleteChatMessages(conversationId: string, ids: string[]) {
  const msgs = chatMessages[conversationId]
  if (!msgs) return
  chatMessages[conversationId] = msgs.filter(m => !ids.includes(m.id))
  save()
}

export function listChatMessages(conversationId: string): ChatMessageEntry[] {
  return chatMessages[conversationId] || []
}

export function getLatestChatMessage(conversationId: string): ChatMessageEntry | undefined {
  const msgs = chatMessages[conversationId]
  if (!msgs || msgs.length === 0) return undefined
  return msgs[msgs.length - 1]
}

