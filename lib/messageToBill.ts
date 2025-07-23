import customersData from '@/mock/customers.json'

export interface ParsedItem {
  productId: string
  quantity: number
}

export interface ParsedMessage {
  customerId?: string
  customerName?: string
  customerPhone?: string
  items: ParsedItem[]
}

const templateMap: Record<string, string> = {
  'ปลอกหมอน': 'pillow-case',
  'สีครีม 3 เมตร': 'cream-3m',
}

export function parseMessage(text: string): ParsedMessage {
  const lower = text.toLowerCase()
  const items: ParsedItem[] = []
  for (const [phrase, productId] of Object.entries(templateMap)) {
    const idx = lower.indexOf(phrase.toLowerCase())
    if (idx !== -1) {
      const after = text.slice(idx + phrase.length)
      const qtyMatch = after.match(/(\d+)/)
      const qty = qtyMatch ? parseInt(qtyMatch[1]) : 1
      items.push({ productId, quantity: qty })
    }
  }

  let customerPhone: string | undefined
  const phoneMatch = text.match(/0\d{8,9}/)
  if (phoneMatch) customerPhone = phoneMatch[0]

  let customerName: string | undefined
  const nameMatch = text.match(/คุณ\s*([^\s\d]+)/)
  if (nameMatch) customerName = nameMatch[1]

  let customerId: string | undefined
  if (customerPhone) {
    const customers = customersData as Array<{ id: string; name: string; phone?: string }>
    const c = customers.find(cu => cu.phone && cu.phone.includes(customerPhone!))
    if (c) {
      customerId = c.id
      customerName = c.name
    }
  }

  return { customerId, customerName, customerPhone, items }
}

export const templateMapping = templateMap
