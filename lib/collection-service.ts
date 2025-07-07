import { mockCollections, mockFabrics } from '@/data/mock-collections'
import type { Collection, Fabric } from '@/data/mock-collections'

export { mockCollections, mockFabrics }
export type { Collection, Fabric }

export async function fetchCollections(): Promise<Collection[]> {
  return Promise.resolve([...mockCollections])
}

export async function fetchFabrics(): Promise<Fabric[]> {
  return Promise.resolve([...mockFabrics])
}
