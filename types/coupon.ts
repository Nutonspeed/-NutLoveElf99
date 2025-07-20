export type CouponType = 'percentage' | 'fixed' | 'shipping'

export interface Coupon {
  id: string
  code: string
  discount: number
  type: CouponType
  active: boolean
  minAmount?: number
  usageLimit?: number
  usageCount: number
  validFrom: string
  validUntil: string
  auto?: boolean
  description?: string
}
