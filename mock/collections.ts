export interface Collection {
  id: string
  name: string
  order: number
  isDeleted?: boolean
}

export const collections: Collection[] = [
  { id: 'col-1', name: 'Classic', order: 0 },
  { id: 'col-2', name: 'Modern', order: 1 },
]

export function addCollection(data: Omit<Collection, 'id' | 'order' | 'isDeleted'>): Collection {
  const collection: Collection = {
    id: `col-${Date.now()}`,
    order: collections.length,
    ...data,
  }
  collections.push(collection)
  return collection
}

export function updateCollection(id: string, data: Partial<Omit<Collection, 'id'>>): Collection | undefined {
  const col = collections.find(c => c.id === id)
  if (col) Object.assign(col, data)
  return col
}

export function softDeleteCollection(id: string) {
  const col = collections.find(c => c.id === id)
  if (col) col.isDeleted = true
}

export function getCollection(id: string): Collection | undefined {
  return collections.find(c => c.id === id)
}

export function reorderCollections(ids: string[]) {
  ids.forEach((id, index) => {
    const col = collections.find(c => c.id === id)
    if (col) col.order = index
  })
  collections.sort((a, b) => a.order - b.order)
}
