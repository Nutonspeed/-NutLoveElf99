export interface AdminFabric {
  id: string
  name: string
  price: number
  images: string[]
}

export const mockFabrics: AdminFabric[] = [
  {
    id: 'FAB-001',
    name: 'Soft Linen',
    price: 990,
    images: ['/images/039.jpg', '/images/040.jpg'],
  },
  {
    id: 'FAB-002',
    name: 'Cozy Cotton',
    price: 1090,
    images: ['/images/041.jpg', '/images/042.jpg'],
  },
  {
    id: 'FAB-003',
    name: 'Velvet Dream',
    price: 1290,
    images: ['/images/043.jpg', '/images/044.jpg'],
  },
]

export function addFabric(data: Omit<AdminFabric, 'id'>): AdminFabric {
  const fabric: AdminFabric = {
    id: `FAB-${Math.random().toString(36).slice(2, 8)}`,
    ...data,
  }
  mockFabrics.unshift(fabric)
  return fabric
}

export function updateFabric(id: string, data: Partial<Omit<AdminFabric, 'id'>>) {
  const idx = mockFabrics.findIndex(f => f.id === id)
  if (idx > -1) {
    mockFabrics[idx] = { ...mockFabrics[idx], ...data }
  }
}

export function deleteFabric(id: string) {
  const idx = mockFabrics.findIndex(f => f.id === id)
  if (idx > -1) {
    mockFabrics.splice(idx, 1)
  }
}
