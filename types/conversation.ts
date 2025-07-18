export interface Conversation {
  id: string
  customerId: string
  customerName: string
  lastMessage: string
  tags: string[]
  rating?: number
  /** prevent agent reply */
  locked?: boolean
  /** internal note */
  adminMemo?: string
  updatedAt: string
}
