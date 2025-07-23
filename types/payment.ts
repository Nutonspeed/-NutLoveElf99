export interface Payment {
  orderId: string
  date: string
  amount: number
  slip?: string
  method?: string
  verified?: boolean
  rejected?: boolean
}
