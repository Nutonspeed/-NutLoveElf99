export interface DiscountCode {
  id: string
  code: string
  type: 'percent' | 'fixed'
  amount: number
  active: boolean
  expires: string
}

export let discountCodes: DiscountCode[] = [
  {
    id: '1',
    code: 'SALE10',
    type: 'percent',
    amount: 10,
    active: true,
    expires: '2099-12-31',
  },
]

export function addDiscountCode(data: Omit<DiscountCode, 'id'>) {
  const newCode: DiscountCode = { id: Date.now().toString(), ...data }
  discountCodes.push(newCode)
  return newCode
}

export function toggleDiscountCode(id: string) {
  discountCodes = discountCodes.map(c =>
    c.id === id ? { ...c, active: !c.active } : c,
  )
}

export function findDiscountCode(code: string) {
  const now = new Date()
  return discountCodes.find(
    c =>
      c.code.toUpperCase() === code.toUpperCase() &&
      c.active &&
      new Date(c.expires) >= now,
  )
}
