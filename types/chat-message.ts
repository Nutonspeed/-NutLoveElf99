export interface ChatMessageEntry {
  id: string
  conversationId: string
  templateId: string
  text: string
  createdAt: string
  pinned?: boolean
  labels?: string[]
}
