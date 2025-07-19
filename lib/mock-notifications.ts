export interface Notification {
  id: string
  type: 'order' | 'claim' | 'chat' | 'comment' | 'payment'
  message: string
  link: string
}

export const mockNotifications: Notification[] = [
  {
    id: 'ord-1001',
    type: 'order',
    message: 'มีออเดอร์ใหม่ #ORD-1001',
    link: '/admin/orders/ORD-1001',
  },
  {
    id: 'claim-2001',
    type: 'claim',
    message: 'ลูกค้าจองผ้าไว้',
    link: '/admin/claims',
  },
  {
    id: 'chat-3001',
    type: 'chat',
    message: 'แชทใหม่จากลูกค้าเก่า',
    link: '/admin/chat-customers',
  },
  {
    id: 'ord-1002',
    type: 'order',
    message: 'มีออเดอร์ใหม่ #ORD-1002',
    link: '/admin/orders/ORD-1002',
  },
  {
    id: 'chat-3002',
    type: 'chat',
    message: 'ลูกค้าเก่าทักแชทอีกครั้ง',
    link: '/admin/chat-customers',
  },
  {
    id: 'cmt-4001',
    type: 'comment',
    message: 'มีคอมเมนต์ใหม่ในบล็อก',
    link: '/dashboard/comments',
  },
  {
    id: 'pay-5001',
    type: 'payment',
    message: 'ลูกค้าชำระเงินสำหรับ #ORD-1001',
    link: '/dashboard/orders/ORD-1001',
  },
]

export function addNotification(n: Notification) {
  mockNotifications.unshift(n)
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('adminMockNotifications')
    const arr = stored ? JSON.parse(stored) : []
    arr.unshift(n)
    localStorage.setItem('adminMockNotifications', JSON.stringify(arr))
  }
}

export function loadNotifications() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('adminMockNotifications')
    if (stored) {
      const arr = JSON.parse(stored) as Notification[]
      mockNotifications.splice(0, mockNotifications.length, ...arr)
    }
  }
}
