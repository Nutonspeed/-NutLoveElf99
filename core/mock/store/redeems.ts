import { loadFromStorage, saveToStorage } from './persist'

export interface Redeem {
  id: string
  customerId: string
  reward: string
  points: number
  createdAt: string
}

const KEY = 'mockStore_redeems'

let redeems: Redeem[] = loadFromStorage<Redeem[]>(KEY, [])

function persist() {
  saveToStorage(KEY, redeems)
}

export function getRedeems() {
  return redeems
}

export function addRedeem(r: Redeem) {
  redeems.push(r)
  persist()
}

export function resetRedeems() {
  redeems = []
  persist()
}

export function regenerateRedeems() {
  redeems = []
  persist()
}
