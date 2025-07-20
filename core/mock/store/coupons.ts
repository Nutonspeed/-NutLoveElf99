import type { Coupon } from '@/types/coupon'
import { coupons as seedCoupons } from '@/mock/coupons'
import { loadFromStorage, saveToStorage } from './persist'

const KEY = 'mockStore_coupons'

let coupons: Coupon[] = loadFromStorage<Coupon[]>(KEY, [...seedCoupons])

function persist() {
  saveToStorage(KEY, coupons)
}

export function getCoupons() {
  return coupons
}

export function addCoupon(data: Omit<Coupon, 'id' | 'usageCount'>) {
  const coupon: Coupon = { id: `c-${Date.now()}`, usageCount: 0, ...data }
  coupons.push(coupon)
  persist()
  return coupon
}

export function updateCoupon(id: string, data: Partial<Omit<Coupon, 'id'>>) {
  const idx = coupons.findIndex(c => c.id === id)
  if (idx !== -1) {
    coupons[idx] = { ...coupons[idx], ...data }
    persist()
  }
}

export function removeCoupon(id: string) {
  const idx = coupons.findIndex(c => c.id === id)
  if (idx !== -1) {
    coupons.splice(idx, 1)
    persist()
  }
}

export function resetCoupons() {
  coupons = []
  persist()
}

export function regenerateCoupons() {
  coupons = [...seedCoupons]
  persist()
}
