import { NextResponse } from 'next/server'
import { addNotification } from '@/lib/notificationLog'
import { promises as fs } from 'fs'
import path from 'path'
import bills from '@/mock/bill.detail.json'
import { readJson, writeJson } from '@/lib/server/jsonFile'
import { updateBill } from '@/mock/bills'

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

export async function POST(req: Request) {
  const data = await req.json().catch(() => ({})) as { billId?: string }
  if (data.billId) {
    const storeFile = path.join(process.cwd(), 'mock/store/bills.json')
    const billsData = await readJson<any[]>(storeFile, [])
    const bill = billsData.find(b => b.id === data.billId)
    if (!bill) return NextResponse.json({ error: 'not found' }, { status: 404 })
    bill.followup_log = bill.followup_log || []
    bill.followup_log.push(new Date().toISOString())
    await writeJson(storeFile, billsData)
    updateBill(data.billId, { followup_log: bill.followup_log })
    await addNotification({
      billId: data.billId,
      recipient: bill.customer || 'unknown',
      channel: 'line',
      message: 'Payment follow-up',
      type: 'followup',
      time: new Date().toISOString(),
    })
    return NextResponse.json({ success: true })
  }

  const list = await readStatuses()
  let count = 0
  const now = Date.now()
  for (const rec of list) {
    if (rec.status === 'delivered' && rec.notifiedAt && !rec.followupAt) {
      const notified = new Date(rec.notifiedAt).getTime()
      if (now - notified > 24 * 60 * 60 * 1000) {
        const bill: any = (bills as any[]).find((b) => b.id === rec.billId)
        const phone = bill?.customer?.phone || '0000000000'
        const message = `How was your experience with order #${rec.billId}?`
        await addNotification({
          billId: rec.billId,
          recipient: phone,
          channel: 'sms',
          message,
          type: 'followup',
          time: new Date().toISOString(),
        })
        rec.followupAt = new Date().toISOString()
        count++
      }
    }
  }
  if (count > 0) await writeStatuses(list)
  return NextResponse.json({ success: true, sent: count })
}
