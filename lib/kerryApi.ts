export type KerryStatus = 'ขนส่งแล้ว' | 'กำลังนำจ่าย' | 'จัดส่งสำเร็จ' | 'ส่งคืน'

export async function getKerryStatus(trackingNumber: string): Promise<KerryStatus> {
  const statuses: KerryStatus[] = ['ขนส่งแล้ว', 'กำลังนำจ่าย', 'จัดส่งสำเร็จ', 'ส่งคืน']
  // simulate network delay
  await new Promise(r => setTimeout(r, 300))
  return statuses[Math.floor(Math.random() * statuses.length)]
}

interface BillWithShipping {
  shippingMethod?: string
  tracking_number?: string
  tags: string[]
}

export async function syncKerryStatuses<T extends BillWithShipping>(bills: T[]): Promise<{ success: number; missing: number; failed: number }> {
  let success = 0
  let missing = 0
  let failed = 0
  for (const bill of bills) {
    if (bill.shippingMethod !== 'kerry') continue
    const tracking = bill.tracking_number
    if (!tracking) { missing++; continue }
    try {
      const status = await getKerryStatus(tracking)
      bill.tags = bill.tags.filter(t => !t.startsWith('kerry-status:'))
      let tag = 'shipped'
      if (status === 'กำลังนำจ่าย') tag = 'out'
      else if (status === 'จัดส่งสำเร็จ') tag = 'delivered'
      else if (status === 'ส่งคืน') tag = 'returned'
      bill.tags.push(`kerry-status:${tag}`)
      success++
    } catch (e) {
      failed++
    }
  }
  return { success, missing, failed }
}
