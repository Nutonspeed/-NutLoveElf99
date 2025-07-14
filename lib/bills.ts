import type { Bill } from "@/types/bill"

export let mockBills: Bill[] = []
export const mockBillLinks: Record<string, string> = {}

export function getBillById(id: string): Bill | null {
  return mockBills.find((b) => b.id === id) || null
}

export function getAllBills(): Bill[] {
  return mockBills
}

export function getBillLink(id: string): string | undefined {
  return mockBillLinks[id]
}
