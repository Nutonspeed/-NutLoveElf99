export type ShippingOrderStatus = 'pendingPrint' | 'shipped' | 'returned'
export const shippingOrderStatusLabel: Record<ShippingOrderStatus, string> = {
  pendingPrint: 'รอพิมพ์',
  shipped: 'ส่งแล้ว',
  returned: 'ตีกลับ',
}

export type DeliveryStatus = 'shipping' | 'delivered'
export const deliveryStatusLabel: Record<DeliveryStatus, string> = {
  shipping: 'กำลังจัดส่ง',
  delivered: 'ถึงแล้ว',
}
