export interface SimpleOrder {
  id: string
  customer: string
  status: 'Pending' | 'Paid' | 'Cancelled'
  total: number
}

export const orders: SimpleOrder[] = [
  { id: 'ORD-001', customer: 'John Doe', status: 'Paid', total: 2990 },
  { id: 'ORD-002', customer: 'Jane Smith', status: 'Pending', total: 3980 },
  { id: 'ORD-003', customer: 'Bob Johnson', status: 'Cancelled', total: 1500 },
]
