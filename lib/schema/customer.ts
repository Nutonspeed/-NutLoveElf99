export interface CustomerSchema {
  id: string
  name: string
  phone: string
  address: string
  tags: string[]
  createdAt: string
  email?: string
  note?: string
  followUpAt?: string
  followUpNote?: string
  starred?: boolean
}
