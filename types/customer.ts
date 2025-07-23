export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  city?: string
  postalCode?: string
  avatar?: string
  tags?: string[]
  note?: string
  followUpAt?: string
  followUpNote?: string
  starred?: boolean
  points?: number
  tier?: 'Silver' | 'Gold' | 'VIP'
  muted?: boolean
  pointHistory?: PointLog[]
  createdAt: string
  totalOrders?: number
  totalSpent?: number
  lastOrderDate?: string
}

export interface PointLog {
  timestamp: string
  change: number
  reason?: string
}
