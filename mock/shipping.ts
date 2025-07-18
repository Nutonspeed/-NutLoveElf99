export interface ShippingOrder {
  id: string
  name: string
  address: string
  phone: string
  tracking: string
  status: 'รอพิมพ์' | 'ส่งแล้ว' | 'ตีกลับ'
  deliveryStatus: 'กำลังจัดส่ง' | 'ถึงแล้ว'
}

export const shippingOrders: ShippingOrder[] = [
  {
    id: 'SHIP-001',
    name: 'John Doe',
    address: '123 ถนนสุขุมวิท, กรุงเทพฯ 10110',
    phone: '081-234-5678',
    tracking: 'TH1234567890',
    status: 'ส่งแล้ว',
    deliveryStatus: 'ถึงแล้ว',
  },
  {
    id: 'SHIP-002',
    name: 'Jane Smith',
    address: '456 ถนนพหลโยธิน, กรุงเทพฯ 10400',
    phone: '082-345-6789',
    tracking: '',
    status: 'รอพิมพ์',
    deliveryStatus: 'กำลังจัดส่ง',
  },
  {
    id: 'SHIP-003',
    name: 'Bob Johnson',
    address: '789 ถนนเจริญกรุง, กรุงเทพฯ 10500',
    phone: '083-456-7890',
    tracking: 'TH5555555555',
    status: 'ตีกลับ',
    deliveryStatus: 'กำลังจัดส่ง',
  },
]

export function addTrackingNumber(id: string, tracking: string): ShippingOrder | undefined {
  const order = shippingOrders.find(o => o.id === id)
  if (order) {
    order.tracking = tracking
    if (order.status === 'รอพิมพ์') order.status = 'ส่งแล้ว'
  }
  return order
}

export function getShippingOrder(id: string) {
  return shippingOrders.find(o => o.id === id)
}

export type ShippingProvider = 'Kerry' | 'Flash' | 'ปณ.'

let provider: ShippingProvider = 'Kerry'

export function setShippingProvider(p: ShippingProvider) {
  provider = p
}

export function getShippingProvider() {
  return provider
}
