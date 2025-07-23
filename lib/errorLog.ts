import { join } from 'path'
import { readJson, writeJson } from './jsonFile'

const dir = join(process.cwd(), 'mock', 'store')
const file = join(dir, 'error-log.json')

export interface ErrorEntry {
  id: string
  type: string
  message: string
  stack?: string
  info?: any
  timestamp: string
  resolved?: boolean
}

export async function logError(entry: Omit<ErrorEntry, 'id' | 'timestamp' | 'resolved'> & { id?: string }) {
  const list = await readJson<ErrorEntry[]>(file, [])
  const e = { id: entry.id || Date.now().toString(), timestamp: new Date().toISOString(), resolved: false, ...entry }
  list.push(e)
  await writeJson(file, list)
  return e
}

export async function listErrors() {
  return readJson<ErrorEntry[]>(file, [])
}

export async function resolveError(id: string) {
  const list = await readJson<ErrorEntry[]>(file, [])
  const idx = list.findIndex(e => e.id === id)
  if (idx === -1) return false
  list[idx].resolved = true
  await writeJson(file, list)
  return true
}
