export interface Conversation {
  id: string
  customerId: string
  customerName: string
  lastMessage: string
  tags: string[]
  rating?: number
  assignee?: string
  unread?: boolean
  updatedAt: string
}
