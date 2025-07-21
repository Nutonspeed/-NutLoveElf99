import { promises as fs } from 'fs'
import path from 'path'

export interface NotificationEntry {
  billId?: string
  channel: 'line' | 'sms'
  recipient: string
  message: string
  type?: string
  time: string
}

const FILE = path.join(process.cwd(), 'mock/store/notifications.json')

async function readFileSafe(): Promise<NotificationEntry[]> {
  try {
    const text = await fs.readFile(FILE, 'utf8')
    return JSON.parse(text)
  } catch {
    return []
  }
}

async function writeFileSafe(data: NotificationEntry[]) {
  await fs.writeFile(FILE, JSON.stringify(data, null, 2), 'utf8')
}

export async function addNotification(entry: NotificationEntry) {
  const list = await readFileSafe()
  list.push(entry)
  await writeFileSafe(list)
}

export async function getNotifications(billId?: string): Promise<NotificationEntry[]> {
  const list = await readFileSafe()
  return billId ? list.filter(l => l.billId === billId) : list
}
