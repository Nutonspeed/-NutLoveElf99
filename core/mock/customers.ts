export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  city?: string
  postalCode?: string
  avatar?: string
  tags?: string[]
  note?: string
  points?: number
  tier?: 'Silver' | 'Gold' | 'VIP'
  muted?: boolean
  pointHistory?: PointLog[]
  createdAt: string
}

export interface PointLog {
  timestamp: string
  change: number
  reason?: string
}

export const mockCustomers: Customer[] = [
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '081-234-5678',
    address: '123 \u0e2a\u0e38\u0e02\u0e38\u0e21\u0e27\u0e34\u0e17',
    city: '\u0e01\u0e23\u0e38\u0e07\u0e40\u0e17\u0e1e\u0e0f\u0e23',
    postalCode: '10110',
    avatar: '/placeholder.svg?height=40&width=40',
    tags: ['\u0e25\u0e39\u0e01\u0e04\u0e49\u0e32\u0e1b\u0e23\u0e30\u0e08\u0e33'],
    note: '\u0e0a\u0e2d\u0e1a\u0e1c\u0e49\u0e32\u0e01\u0e33\u0e21\u0e30\u0e2b\u0e35\u0e48',
    points: 120,
    tier: 'Gold',
    pointHistory: [
      { timestamp: new Date().toISOString(), change: 120, reason: '\u0e2a\u0e21\u0e31\u0e04\u0e23\u0e2a\u0e21\u0e32\u0e0a\u0e34\u0e01' },
    ],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '082-345-6789',
    address: '456 \u0e16\u0e19\u0e1e\u0e2b\u0e25\u0e42\u0e22\u0e18\u0e34\u0e19',
    city: '\u0e01\u0e23\u0e38\u0e07\u0e40\u0e17\u0e1e\u0e0f\u0e23',
    postalCode: '10400',
    avatar: '/placeholder.svg?height=40&width=40',
    tags: ['COD'],
    note: '\u0e40\u0e01\u0e47\u0e1a\u0e40\u0e07\u0e34\u0e19\u0e1b\u0e25\u0e32\u0e22\u0e17\u0e32\u0e07',
    points: 60,
    tier: 'Silver',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    avatar: '/placeholder.svg?height=40&width=40',
    points: 200,
    tier: 'VIP',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    avatar: '/placeholder.svg?height=40&width=40',
    points: 10,
    tier: 'Silver',
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '6',
    name: 'David Brown',
    email: 'david@example.com',
    avatar: '/placeholder.svg?height=40&width=40',
    points: 40,
    tier: 'Gold',
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '7',
    name: 'Lisa Anderson',
    email: 'lisa@example.com',
    avatar: '/placeholder.svg?height=40&width=40',
    points: 80,
    tier: 'Gold',
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
]
