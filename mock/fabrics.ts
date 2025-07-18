export interface Fabric {
  id: string
  name: string
  imageUrl: string
}

export const fabrics: Fabric[] = [
  {
    id: 'fab-1',
    name: 'Soft Linen',
    imageUrl: '/images/039.jpg',
  },
  {
    id: 'fab-2',
    name: 'Cozy Cotton',
    imageUrl: '/images/041.jpg',
  },
]

export function addFabric(data: Omit<Fabric, 'id'>): Fabric {
  const fabric: Fabric = { id: `fab-${Date.now()}`, ...data }
  fabrics.unshift(fabric)
  return fabric
}

export function updateFabric(id: string, data: Partial<Omit<Fabric, 'id'>>): Fabric | undefined {
  const fabric = fabrics.find(f => f.id === id)
  if (fabric) Object.assign(fabric, data)
  return fabric
}
