export interface Promo {
  id: string
  code: string
  customerId: string
}

export let mockPromos: Promo[] = []

export function createPromo(code: string, customerId: string): Promo {
  const promo: Promo = {
    id: `promo-${Math.random().toString(36).slice(2, 8)}`,
    code,
    customerId,
  }
  mockPromos.push(promo)
  return promo
}

export function getPromoByCode(code: string): Promo | undefined {
  return mockPromos.find((p) => p.code === code)
}

export function listPromos(): Promo[] {
  return [...mockPromos]
}

export function deletePromo(id: string) {
  mockPromos = mockPromos.filter((p) => p.id !== id)
}
