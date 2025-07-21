import { promises as fs } from 'fs'
import path from 'path'

export interface BillFeedbackEntry {
  id: string
  billId: string
  rating: number
  message?: string
  timestamp: string
  reply?: {
    message: string
    date: string
  }
  tags?: string[]
  public?: boolean
}

const FILE = path.join(process.cwd(), 'mock/store/feedback.json')

async function readFileSafe(): Promise<BillFeedbackEntry[]> {
  try {
    const text = await fs.readFile(FILE, 'utf8')
    return JSON.parse(text)
  } catch {
    return []
  }
}

async function writeFileSafe(data: BillFeedbackEntry[]) {
  await fs.writeFile(FILE, JSON.stringify(data, null, 2), 'utf8')
}

export async function addBillFeedback(entry: Omit<BillFeedbackEntry, 'id'> & { id?: string }) {
  const list = await readFileSafe()
  if (!entry.id) entry.id = `fb-${Date.now()}`
  list.push(entry)
  await writeFileSafe(list)
}

export async function getBillFeedback(billId?: string): Promise<BillFeedbackEntry[]> {
  const list = await readFileSafe()
  return billId ? list.filter(f => f.billId === billId) : list
}

export async function listFeedback() {
  return readFileSafe()
}

export async function getFeedbackById(id: string) {
  const list = await readFileSafe()
  return list.find(f => f.id === id)
}

export async function updateFeedback(id: string, data: Partial<BillFeedbackEntry>) {
  const list = await readFileSafe()
  const idx = list.findIndex(f => f.id === id)
  if (idx === -1) return undefined
  list[idx] = { ...list[idx], ...data }
  await writeFileSafe(list)
  return list[idx]
}
