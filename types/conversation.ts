export interface Conversation {
  id: string
  customerId: string
  customerName: string
  lastMessage: string
  tags: string[]
  rating?: number
  /** comment from the handling admin */
  adminComment?: string
  /** comment from team lead */
  managerComment?: string
  /** id of handling admin */
  adminId?: string
  /** response time in minutes */
  responseTime?: number
  updatedAt: string
}
