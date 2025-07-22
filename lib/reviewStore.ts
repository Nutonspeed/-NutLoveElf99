import { promises as fs } from 'fs'
import path from 'path'

export interface ReviewEntry {
  id: string
  orderId: string
  rating: number
  comment: string
  image?: string
  createdAt: string
}

const FILE = path.join(process.cwd(), 'mock/store/reviews.json')

async function readFileSafe(): Promise<ReviewEntry[]> {
  try {
    const text = await fs.readFile(FILE, 'utf8')
    return JSON.parse(text)
  } catch {
    return []
  }
}

async function writeFileSafe(data: ReviewEntry[]) {
  await fs.mkdir(path.dirname(FILE), { recursive: true })
  await fs.writeFile(FILE, JSON.stringify(data, null, 2), 'utf8')
}

export async function addReview(entry: Omit<ReviewEntry, 'id'> & { id?: string }) {
  const list = await readFileSafe()
  if (list.some(r => r.orderId === entry.orderId)) return false
  if (!entry.id) entry.id = `rev-${Date.now()}`
  list.push(entry as ReviewEntry)
  await writeFileSafe(list)
  return true
}

export async function getReviews(orderId?: string) {
  const list = await readFileSafe()
  return orderId ? list.filter(r => r.orderId === orderId) : list
}
