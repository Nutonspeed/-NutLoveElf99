export interface Claim {
  id: string
  orderId: string
  image: string
  reason: string
  status: 'pending' | 'approved' | 'rejected'
}

let initialClaims: Claim[] = []
export let mockClaims: Claim[] = [...initialClaims]

export function createClaim(data: Omit<Claim, 'id' | 'status'>) {
  const newClaim: Claim = {
    id: Date.now().toString(),
    status: 'pending',
    ...data,
  }
  mockClaims.push(newClaim)
  return newClaim
}

export function updateClaim(id: string, data: Partial<Claim>) {
  const idx = mockClaims.findIndex(c => c.id === id)
  if (idx !== -1) {
    mockClaims[idx] = { ...mockClaims[idx], ...data }
  }
}
