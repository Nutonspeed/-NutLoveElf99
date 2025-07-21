import { promises as fs } from 'fs'
import path from 'path'

export type ShippingProvider = 'Flash' | 'Kerry'
export type BillShippingStatus = 'pending' | 'in_transit' | 'delivered'

export interface ShippingStatusRecord {
  billId: string
  status: BillShippingStatus
  provider: ShippingProvider
  lastSynced: string
  started?: string
}

const FILE = path.join(process.cwd(), 'mock/store/shipping-status.json')
const DELAY_MS = 1000 * 60 * 5 // 5 minutes to mark delivered

async function readFileSafe(): Promise<ShippingStatusRecord[]> {
  try {
    const text = await fs.readFile(FILE, 'utf8')
    return JSON.parse(text)
  } catch {
    return []
  }
}

async function writeFileSafe(data: ShippingStatusRecord[]) {
  await fs.writeFile(FILE, JSON.stringify(data, null, 2), 'utf8')
}

export async function syncShippingStatuses(
  ids: string[],
  provider: ShippingProvider,
): Promise<ShippingStatusRecord[]> {
  const list = await readFileSafe()
  const now = Date.now()
  ids.forEach((id) => {
    let entry = list.find((e) => e.billId === id)
    if (!entry) {
      entry = {
        billId: id,
        status: 'in_transit',
        provider,
        lastSynced: new Date(now).toISOString(),
        started: new Date(now).toISOString(),
      }
      list.push(entry)
    } else {
      entry.provider = provider
      entry.lastSynced = new Date(now).toISOString()
      if (!entry.started) entry.started = entry.lastSynced
      if (now - new Date(entry.started).getTime() > DELAY_MS) {
        entry.status = 'delivered'
      }
    }
  })
  await writeFileSafe(list)
  return list.filter((e) => ids.includes(e.billId))
}

export async function getAllShippingStatuses() {
  return readFileSafe()
}
