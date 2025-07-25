import bills from '@/mock/store/bills.json'

export type BillRecord = (typeof bills)[number]

export const mockBills: readonly BillRecord[] = bills as BillRecord[]

export function getBill(id: string): BillRecord | undefined {
  return mockBills.find(b => b.id === id)
}

export function getBills(): readonly BillRecord[] {
  return mockBills
}
