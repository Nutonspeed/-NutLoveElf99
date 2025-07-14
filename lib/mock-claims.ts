export interface Claim {
  id: string
  orderId: string
  image: string
  reason: string
  status: 'pending' | 'approved' | 'rejected'
}

let initialClaims: Claim[] = []
export let mockClaims: Claim[] = [...initialClaims]

export function loadClaims() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('claims')
    if (stored) mockClaims = JSON.parse(stored)
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('claims', JSON.stringify(mockClaims))
  }
}

export function createClaim(data: Omit<Claim, 'id' | 'status'>) {
  if (mockClaims.some(c => c.orderId === data.orderId)) {
    return null
  }
  const newClaim: Claim = {
    id: Date.now().toString(),
    status: 'pending',
    ...data,
  }
  mockClaims.push(newClaim)
  save()
  return newClaim
}

export function updateClaim(id: string, data: Partial<Claim>) {
  const idx = mockClaims.findIndex(c => c.id === id)
  if (idx !== -1) {
    mockClaims[idx] = { ...mockClaims[idx], ...data }
  }
}
