export interface Conversation {
  id: string
  customerId: string
  customerName: string
  lastMessage: string
  tags: string[]
  rating?: number
  updatedAt: string
  status: 'open' | 'closed'
  answered: boolean
  archived?: boolean
}
