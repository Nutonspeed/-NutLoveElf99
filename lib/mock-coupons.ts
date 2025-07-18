export interface Coupon {
  id: string
  code: string
  prefix: string
  discount: number
  used: boolean
}

export let mockCoupons: Coupon[] = []

export function generateCoupons(prefix: string, discount: number, amount: number): Coupon[] {
  const created: Coupon[] = []
  for (let i = 0; i < amount; i++) {
    const code = `${prefix.toUpperCase()}${Math.random().toString(36).slice(2, 8).toUpperCase()}`
    const coupon: Coupon = {
      id: `coupon-${Math.random().toString(36).slice(2, 8)}`,
      code,
      prefix: prefix.toUpperCase(),
      discount,
      used: false,
    }
    mockCoupons.push(coupon)
    created.push(coupon)
  }
  return created
}

export function listCoupons(): Coupon[] {
  return [...mockCoupons]
}
