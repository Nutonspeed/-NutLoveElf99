import { NextResponse } from 'next/server'
import { addNotification } from '@/lib/notificationLog'
import { promises as fs } from 'fs'
import path from 'path'
import bills from '@/mock/bill.detail.json'

const STATUS_FILE = path.join(process.cwd(), 'mock/store/shipping-status.json')

interface ShippingRecord {
  billId: string
  status: string
  provider: string
  lastSynced: string
  started?: string
  notifiedAt?: string
  followupAt?: string
}

async function readStatuses(): Promise<ShippingRecord[]> {
  try {
    const text = await fs.readFile(STATUS_FILE, 'utf8')
    return JSON.parse(text)
  } catch {
    return []
  }
}

async function writeStatuses(list: ShippingRecord[]) {
  await fs.writeFile(STATUS_FILE, JSON.stringify(list, null, 2), 'utf8')
}

export async function POST() {
  const list = await readStatuses()
  let count = 0
  for (const rec of list) {
    if (rec.status === 'delivered' && !rec.notifiedAt) {
      const bill: any = (bills as any[]).find((b) => b.id === rec.billId)
      const phone = bill?.customer?.phone || '0000000000'
      const message = `Your order #${rec.billId} has been delivered`
      await addNotification({
        billId: rec.billId,
        recipient: phone,
        channel: 'sms',
        message,
        type: 'shipping-delivered',
        time: new Date().toISOString(),
      })
      await addNotification({
        billId: rec.billId,
        recipient: phone,
        channel: 'line',
        message,
        type: 'shipping-delivered',
        time: new Date().toISOString(),
      })
      rec.notifiedAt = new Date().toISOString()
      count++
    }
  }
  if (count > 0) await writeStatuses(list)
  return NextResponse.json({ success: true, notified: count })
}
