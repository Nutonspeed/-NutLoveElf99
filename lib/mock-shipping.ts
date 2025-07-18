export interface ShippingRate {
  method: string
  fee: number
}

export function calculateMockShipping(total: number, province: string): ShippingRate[] | null {
  if (!total || total <= 0 || !province) return null
  const flash = Math.round(40 + total * 0.05)
  const ems = Math.round(60 + total * 0.07)
  return [
    { method: 'Flash', fee: flash },
    { method: 'EMS', fee: ems },
  ]
}
