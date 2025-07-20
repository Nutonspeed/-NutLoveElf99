import type { Address } from './address'

export interface CustomerInfo {
  id: string
  name: string
  email?: string
  phone?: string
  address?: Address
}
