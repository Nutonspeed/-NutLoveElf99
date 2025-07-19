export interface Review {
  orderId: string
  rating: number
  comment: string
  createdAt: string
  customer?: string
  hidden?: boolean
}

export interface NpsRecord {
  id: string
  score: number
  createdAt: string
}
