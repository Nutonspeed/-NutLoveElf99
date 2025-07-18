import { getChatTemplate } from './mock-chat-templates'

export interface ChatMessageEntry {
  id: string
  conversationId: string
  templateId: string
  text: string
  createdAt: string
  pinned?: boolean
  labels?: string[]
}

export const chatMessages: Record<string, ChatMessageEntry[]> = {}

export function loadChatMessages() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('chatMessages')
    if (stored) {
      const parsed = JSON.parse(stored) as Record<string, ChatMessageEntry[]>
      Object.assign(chatMessages, parsed)
    }
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
    pinned: false,
    labels: [],
  }
  if (!chatMessages[conversationId]) chatMessages[conversationId] = []
  chatMessages[conversationId].push(msg)
  save()
  return msg
}

export function listChatMessages(conversationId: string): ChatMessageEntry[] {
  return chatMessages[conversationId] || []
}

export function getLatestChatMessage(conversationId: string): ChatMessageEntry | undefined {
  const msgs = chatMessages[conversationId]
  if (!msgs || msgs.length === 0) return undefined
  return msgs[msgs.length - 1]
}

export function pinChatMessage(conversationId: string, messageId: string) {
  const msgs = chatMessages[conversationId]
  if (!msgs) return
  msgs.forEach(m => {
    if (m.id === messageId) m.pinned = true
    else m.pinned = false
  })
  save()
}

export function addLabelToMessage(
  conversationId: string,
  messageId: string,
  label: string,
) {
  const msgs = chatMessages[conversationId]
  const msg = msgs?.find(m => m.id === messageId)
  if (msg) {
    msg.labels = msg.labels || []
    if (!msg.labels.includes(label)) {
      msg.labels.push(label)
      save()
    }
  }
}

