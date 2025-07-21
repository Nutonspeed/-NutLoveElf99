import { promises as fs } from 'fs'
import path from 'path'

export interface BillFeedbackEntry {
  billId: string
  rating: number
  message?: string
  timestamp: string
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

export async function addBillFeedback(entry: BillFeedbackEntry) {
  const list = await readFileSafe()
  list.push(entry)
  await writeFileSafe(list)
}

export async function getBillFeedback(billId?: string): Promise<BillFeedbackEntry[]> {
  const list = await readFileSafe()
  return billId ? list.filter(f => f.billId === billId) : list
}
