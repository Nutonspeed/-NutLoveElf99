import { join } from 'path'
import { readJson, writeJson } from './server/jsonFile'

const dir = join(process.cwd(), 'mock', 'store')
const billsFile = join(dir, 'bills.json')
const deletedFile = join(dir, 'deleted-bills.json')
const logFile = join(dir, 'activity-log.json')

export async function softDeleteBill(id: string, reason = '') {
  const bills = await readJson<any[]>(billsFile, [])
  const deleted = await readJson<any[]>(deletedFile, [])
  const log = await readJson<any[]>(logFile, [])
  const idx = bills.findIndex(b => b.id === id)
  if (idx === -1) return false
  const [bill] = bills.splice(idx, 1)
  deleted.push({ ...bill, deletedAt: new Date().toISOString(), reason })
  log.push({ timestamp: new Date().toISOString(), action: `delete ${bill.id}` })
  await writeJson(billsFile, bills)
  await writeJson(deletedFile, deleted)
  await writeJson(logFile, log)
  return true
}

export async function restoreBill(id: string) {
  const bills = await readJson<any[]>(billsFile, [])
  const deleted = await readJson<any[]>(deletedFile, [])
  const log = await readJson<any[]>(logFile, [])
  const idx = deleted.findIndex(b => b.id === id)
  if (idx === -1) return false
  const [bill] = deleted.splice(idx, 1)
  bills.push(bill)
  log.push({ timestamp: new Date().toISOString(), action: `restore ${bill.id}` })
  await writeJson(billsFile, bills)
  await writeJson(deletedFile, deleted)
  await writeJson(logFile, log)
  return true
}

export async function hardDeleteBill(id: string) {
  const deleted = await readJson<any[]>(deletedFile, [])
  const idx = deleted.findIndex(b => b.id === id)
  if (idx === -1) return false
  deleted.splice(idx, 1)
  await writeJson(deletedFile, deleted)
  return true
}

export async function listDeletedBills() {
  return readJson<any[]>(deletedFile, [])
}
