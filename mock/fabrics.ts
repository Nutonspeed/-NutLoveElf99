export interface Fabric {
  id: string
  name: string
  imageUrl: string
  collectionId?: string
}

export const fabrics: Fabric[] = [
  {
    id: 'fab-1',
    name: 'Soft Linen',
    imageUrl: '/images/039.jpg',
    collectionId: 'col-1',
  },
  {
    id: 'fab-2',
    name: 'Cozy Cotton',
    imageUrl: '/images/041.jpg',
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
