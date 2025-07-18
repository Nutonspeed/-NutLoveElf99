import { mockClaims } from './mock-claims'
import { mockOrders } from './mock-orders'

export interface MockAlert {
  id: string
  title: string
  message: string
  image?: string
}

export const mockAlerts: MockAlert[] = [
  {
    id: 'sample',
    title: 'แจ้งเตือนตัวอย่าง',
    message: 'นี่คือข้อความแจ้งเตือนสำหรับการทดสอบระบบ',
    image: '/placeholder.svg?height=200&width=200',
  },
]

export function getMockAlert(id: string): MockAlert | undefined {
  return mockAlerts.find((a) => a.id === id)
}

export function getGlobalAlertCount(): number {
  const claimCount = mockClaims.filter(
    (c) => c.status === 'pending' || c.status === 'claim_waiting',
  ).length
  const orderCount = mockOrders.filter((o) => o.status === 'pending').length
  return claimCount + orderCount
}
