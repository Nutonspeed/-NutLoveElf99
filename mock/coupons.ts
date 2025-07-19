import type { Coupon } from '@/types/coupon'

export const coupons: Coupon[] = [
  {
    id: 'c1',
    code: 'SAVE10',
    discount: 10,
    type: 'percentage',
    active: true,
    usageCount: 0,
    validFrom: new Date().toISOString(),
    validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'ส่วนลด 10% ทุกคำสั่งซื้อ',
  },
]

export function addCoupon(data: Omit<Coupon, 'id' | 'usageCount'>): Coupon {
  const coupon: Coupon = { id: `c-${Date.now()}`, usageCount: 0, ...data }
  coupons.unshift(coupon)
  return coupon
}

export function updateCoupon(id: string, data: Partial<Omit<Coupon, 'id'>>): Coupon | undefined {
  const c = coupons.find(c => c.id === id)
  if (c) Object.assign(c, data)
  return c
}

export function removeCoupon(id: string) {
  const idx = coupons.findIndex(c => c.id === id)
  if (idx !== -1) coupons.splice(idx, 1)
}
