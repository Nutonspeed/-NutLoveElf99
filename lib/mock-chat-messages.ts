import { getChatTemplate } from './mock-chat-templates'

export interface ChatMessageEntry {
  id: string
  conversationId: string
  templateId: string
  text: string
  createdAt: string
}

export const chatMessages: Record<string, ChatMessageEntry[]> = {}

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
  return msg
}

export function listChatMessages(conversationId: string): ChatMessageEntry[] {
  return chatMessages[conversationId] || []
}

