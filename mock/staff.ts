export interface StaffSummary {
  id: string
  name: string
  opened: number
  shipped: number
}

export const staffSummary: StaffSummary[] = [
  { id: '1', name: 'Admin A', opened: 12, shipped: 8 },
  { id: '2', name: 'Admin B', opened: 20, shipped: 15 },
  { id: '3', name: 'Admin C', opened: 5, shipped: 7 },
]
