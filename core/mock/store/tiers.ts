import { loadFromStorage, saveToStorage } from './persist'
import type { Tier } from '@/types/tier'
import { mockTiers } from '@/mock/tiers'

const KEY = 'mockStore_tiers'

let tiers: Tier[] = loadFromStorage<Tier[]>(KEY, [...mockTiers])

function persist() {
  saveToStorage(KEY, tiers)
}

export function getTiers() {
  return tiers
}

export function setTiers(list: Tier[]) {
  tiers = list
  persist()
}

export function addTier(tier: Tier) {
  tiers.push(tier)
  persist()
}

export function resetTiers() {
  tiers = []
  persist()
}

export function regenerateTiers() {
  tiers = [...mockTiers]
  persist()
}
