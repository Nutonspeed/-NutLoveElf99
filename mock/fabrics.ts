export interface Fabric {
  id: string
  name: string
  imageUrl: string
  price: number
  collectionId?: string
}

export const fabrics: Fabric[] = [
  {
    id: 'fab-1',
    name: 'Soft Linen',
    imageUrl: '/images/039.jpg',
    price: 299,
    collectionId: 'col-1',
  },
  {
    id: 'fab-2',
    name: 'Cozy Cotton',
    imageUrl: '/images/041.jpg',
    price: 399,
    collectionId: 'col-2',
  },
]

export function addFabric(data: Omit<Fabric, 'id'>): Fabric {
  const fabric: Fabric = { id: `fab-${Date.now()}`, ...data }
  fabrics.unshift(fabric)
  return fabric
}

export function updateFabric(
  id: string,
  data: Partial<Omit<Fabric, 'id'>>,
): Fabric | undefined {
  const fabric = fabrics.find(f => f.id === id)
  if (fabric) Object.assign(fabric, data)
  return fabric
}

export function removeFabric(id: string) {
  const idx = fabrics.findIndex(f => f.id === id)
  if (idx !== -1) fabrics.splice(idx, 1)
}

export interface AdminFabric {
  id: string
  name: string
  code: string
  image: string
  status: 'active' | 'archived'
}

export const adminFabrics: AdminFabric[] = [
  {
    id: 'af-1',
    name: 'Soft Linen',
    code: 'SL-001',
    image: '/images/039.jpg',
    status: 'active',
  },
  {
    id: 'af-2',
    name: 'Cozy Cotton',
    code: 'CC-002',
    image: '/images/041.jpg',
    status: 'archived',
  },
  {
    id: 'af-3',
    name: 'Velvet Dream',
    code: 'VD-003',
    image: '/images/043.jpg',
    status: 'active',
  },
  {
    id: 'af-4',
    name: 'Classic Stripe',
    code: 'CS-004',
    image: '/images/045.jpg',
    status: 'archived',
  },
]

export function getAdminFabrics() {
  return adminFabrics
}
