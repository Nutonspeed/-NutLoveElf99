import type { Fabric } from '@/mock/fabrics'
import { fabrics as seedFabrics, addFabric as baseAdd, updateFabric as baseUpdate, removeFabric as baseRemove } from '@/mock/fabrics'
import { loadFromStorage, saveToStorage } from './persist'

const KEY = 'mockStore_fabrics'

let fabrics: Fabric[] = loadFromStorage<Fabric[]>(KEY, [...seedFabrics])

function persist() {
  saveToStorage(KEY, fabrics)
}

export function getFabrics() {
  return fabrics
}

export function addFabric(data: Omit<Fabric, 'id'>) {
  const fabric = baseAdd ? baseAdd(data) : { id: `fab-${Date.now()}`, ...data }
  fabrics = [...seedFabrics]
  persist()
  return fabric
}

export function updateFabric(id: string, data: Partial<Omit<Fabric, 'id'>>) {
  if (baseUpdate) baseUpdate(id, data)
  fabrics = [...seedFabrics]
  persist()
}

export function removeFabric(id: string) {
  if (baseRemove) baseRemove(id)
  fabrics = [...seedFabrics]
  persist()
}

export function resetFabrics() {
  fabrics = []
  persist()
}

export function regenerateFabrics() {
  fabrics = [...seedFabrics]
  persist()
}
