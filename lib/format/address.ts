export interface Address {
  line1?: string
  line2?: string
  city?: string
  postalCode?: string
}

export function formatAddress(addr: Address): string {
  const parts = [
    addr.line1,
    addr.line2,
    [addr.city, addr.postalCode].filter(Boolean).join(' ')
  ].filter(Boolean)
  return parts.join('\n')
}
