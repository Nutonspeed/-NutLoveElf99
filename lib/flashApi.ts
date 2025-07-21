export type FlashStatus = 'กำลังจัดส่ง' | 'ถึงปลายทาง' | 'ตีกลับ' | 'ยกเลิก'

export async function getFlashStatus(trackingNumber: string): Promise<FlashStatus> {
  const statuses: FlashStatus[] = ['กำลังจัดส่ง', 'ถึงปลายทาง', 'ตีกลับ', 'ยกเลิก']
  await new Promise(r => setTimeout(r, 50))
  return statuses[Math.floor(Math.random() * statuses.length)]
}

import type { AdminBill } from '@/mock/bills'

export async function syncFlashStatuses(bills: AdminBill[]): Promise<void> {
  for (const bill of bills) {
    if (bill.shippingMethod === 'flash' && bill.trackingNumber) {
      try {
        const result = await getFlashStatus(bill.trackingNumber)
        let status: 'shipped' | 'delivered' | 'returned' | 'cancelled'
        switch (result) {
          case 'กำลังจัดส่ง':
            status = 'shipped'
            break
          case 'ถึงปลายทาง':
            status = 'delivered'
            break
          case 'ตีกลับ':
            status = 'returned'
            break
          default:
            status = 'cancelled'
        }
        bill.shippingStatus = status
        bill.tags = bill.tags.filter(t => !t.startsWith('flash-status:'))
        bill.tags.push(`flash-status:${status}`)
      } catch (e) {
        console.error('flash sync error', e)
      }
    }
  }
}

export interface FlashResponse {
  success: boolean
  trackingNumber?: string
  error?: string
}

export async function submitFlashShipment(bill: any): Promise<FlashResponse> {
  const payload = {
    apiKey: process.env.FLASH_API_KEY,
    userId: process.env.FLASH_USER_ID,
    bill,
  }
  console.log('📦 Flash payload', payload)
  await new Promise(resolve => setTimeout(resolve, 800))
  const ok = Math.random() > 0.2
  const response: FlashResponse = ok
    ? { success: true, trackingNumber: `TH${Math.floor(Math.random() * 1e10)}` }
    : { success: false, error: 'mock error' }
  console.log('📦 Flash response', response)
  return response
}
