import { describe, it, expect, beforeEach } from 'vitest'
import { getCoupons, addCoupon, resetCoupons } from '../store'
import type { Coupon } from '@/types/coupon'

describe('mock store coupons', () => {
  const sample: Coupon = {
    id: 'T-1',
    code: 'TEST',
    discount: 10,
    type: 'fixed',
    active: true,
    usageCount: 0,
    validFrom: new Date().toISOString(),
    validUntil: new Date().toISOString(),
  }
  beforeEach(() => {
    resetCoupons()
  })

  it('adds coupon to store', () => {
    const prev = getCoupons().length
    addCoupon({
      code: sample.code,
      discount: sample.discount,
      type: sample.type,
      active: sample.active,
      validFrom: sample.validFrom,
      validUntil: sample.validUntil,
    })
    expect(getCoupons().length).toBe(prev + 1)
  })
})
