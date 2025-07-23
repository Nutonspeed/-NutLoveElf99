import type { Customer } from './mock-customers'
import { mockCustomers } from './mock-customers'

export interface CustomerSearchOptions {
  name?: string
  phone?: string
  keyword?: string
}

/**
 * Search customers by name, phone number or a generic keyword.
 * Keyword will match name, email, tags and note fields.
 */
export function searchCustomers(options: CustomerSearchOptions): Customer[] {
  const { name, phone, keyword } = options
  const kw = keyword?.toLowerCase()
  return mockCustomers.filter((c) => {
    const matchesName = name
      ? c.name.toLowerCase().includes(name.toLowerCase())
      : true
    const matchesPhone = phone ? (c.phone || '').includes(phone) : true
    const matchesKeyword = kw
      ? c.name.toLowerCase().includes(kw) ||
        c.email.toLowerCase().includes(kw) ||
        (c.phone || '').includes(keyword!) ||
        (c.tags?.some((t) => t.toLowerCase().includes(kw)) ?? false) ||
        (c.note?.toLowerCase().includes(kw) ?? false)
      : true
    return matchesName && matchesPhone && matchesKeyword
  })
}
