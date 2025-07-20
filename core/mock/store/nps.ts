import { loadFromStorage, saveToStorage } from './persist'
import type { NpsRecord } from '@/types/review'

const KEY = 'mockStore_nps'

let records: NpsRecord[] = loadFromStorage<NpsRecord[]>(KEY, [])

function persist() {
  saveToStorage(KEY, records)
}

export function getNps() {
  return records
}

export function addNps(rec: NpsRecord) {
  records.push(rec)
  persist()
}

export function resetNps() {
  records = []
  persist()
}
