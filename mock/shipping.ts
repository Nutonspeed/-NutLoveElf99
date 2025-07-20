import type {
  ShippingOrderStatus,
  DeliveryStatus,
  ShippingProvider,
} from '@/types/shipping'

export interface ShippingOrder {
  id: string
  name: string
  address: string
  phone: string
  tracking: string
  status: ShippingOrderStatus
  deliveryStatus: DeliveryStatus
  provider?: ShippingProvider
}

export const shippingOrders: ShippingOrder[] = [
  {
    id: 'SHIP-001',
    name: 'John Doe',
    address: '123 ถนนสุขุมวิท, กรุงเทพฯ 10110',
    phone: '081-234-5678',
    tracking: 'TH1234567890',
    status: 'shipped',
    deliveryStatus: 'delivered',
    provider: 'Kerry',
  },
  {
    id: 'SHIP-002',
    name: 'Jane Smith',
    address: '456 ถนนพหลโยธิน, กรุงเทพฯ 10400',
    phone: '082-345-6789',
    tracking: '',
    status: 'pendingPrint',
    deliveryStatus: 'shipping',
    provider: 'Kerry',
  },
  {
    id: 'SHIP-003',
    name: 'Bob Johnson',
    address: '789 ถนนเจริญกรุง, กรุงเทพฯ 10500',
    phone: '083-456-7890',
    tracking: 'TH5555555555',
    status: 'returned',
    deliveryStatus: 'shipping',
    provider: 'Flash',
  },
]

export function addTrackingNumber(
  id: string,
  tracking: string,
): ShippingOrder | undefined {
  const order = shippingOrders.find((o) => o.id === id)
  if (order) {
    order.tracking = tracking
    if (order.status === 'pendingPrint') order.status = 'shipped'
  }
  return order
}

export function setShippingInfo(
  id: string,
  tracking: string,
  provider: ShippingProvider,
) {
  const order = shippingOrders.find((o) => o.id === id)
  if (order) {
    order.tracking = tracking
    order.provider = provider
    if (order.status === 'pendingPrint' && tracking) order.status = 'shipped'
  }
}

export function updateShippingOrderStatus(id: string, status: ShippingOrderStatus) {
  const order = shippingOrders.find((o) => o.id === id)
  if (order) order.status = status
}

export function updateDeliveryStatus(id: string, status: DeliveryStatus) {
  const order = shippingOrders.find((o) => o.id === id)
  if (order) order.deliveryStatus = status
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
