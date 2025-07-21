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
