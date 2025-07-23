import customers from '@/mock/customers.json'
import bills from '@/mock/bills.json'
import type { Customer } from '@/types/customer'

export interface TaggedCustomer extends Customer {
  autoTags: string[]
}

export function autoTagCustomers(): TaggedCustomer[] {
  const list = customers as Customer[]
  const billList = bills as any[]
  return list.map(c => {
    const custBills = billList.filter(b => b.customerId === c.id)
    const orderCount = custBills.length
    const total = custBills.reduce((sum, b) => sum + (b.amount || 0), 0)
    const tags: string[] = []
    if (orderCount === 0) tags.push('ยังไม่เคยสั่ง')
    if (orderCount > 3) tags.push('ลูกค้าประจำ')
    if (total > 5000) tags.push('VIP')
    return { ...c, autoTags: tags }
  })
}
