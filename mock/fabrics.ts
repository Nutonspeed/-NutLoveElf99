export interface Fabric {
  id: string
  name: string
  imageUrl: string
  collectionId?: string
  category?: string
  tags?: string[]
}

export const fabrics: Fabric[] = [
  {
    id: 'fab-1',
    name: 'Soft Linen',
    imageUrl: '/images/039.jpg',
    collectionId: 'col-1',
    category: 'Classic',
    tags: ['linen', 'soft']
  },
  {
    id: 'fab-2',
    name: 'Cozy Cotton',
    imageUrl: '/images/041.jpg',
    collectionId: 'col-2',
    category: 'Modern',
    tags: ['cotton']
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

export function reduceStock(code: string, qty: number) {
  const fab = adminFabrics.find(f => f.code === code)
  if (fab) fab.stock = Math.max(0, fab.stock - qty)
}

export function increaseStock(code: string, qty: number) {
  const fab = adminFabrics.find(f => f.code === code)
  if (fab) fab.stock += qty
}

export interface AdminFabric {
  id: string
  name: string
  code: string
  image: string
  status: 'active' | 'archived'
  stock: number
}

export const adminFabrics: AdminFabric[] = [
  {
    id: 'af-1',
    name: 'Soft Linen',
    code: 'SL-001',
    image: '/images/039.jpg',
    status: 'active',
    stock: 50,
  },
  {
    id: 'af-2',
    name: 'Cozy Cotton',
    code: 'CC-002',
    image: '/images/041.jpg',
    status: 'archived',
    stock: 0,
  },
  {
    id: 'af-3',
    name: 'Velvet Dream',
    code: 'VD-003',
    image: '/images/043.jpg',
    status: 'active',
    stock: 20,
  },
  {
    id: 'af-4',
    name: 'Classic Stripe',
    code: 'CS-004',
    image: '/images/045.jpg',
    status: 'archived',
    stock: 5,
  },
]

export function getAdminFabrics() {
  return adminFabrics
}
