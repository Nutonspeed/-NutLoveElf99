export interface ShippingMethod {
  id: string;
  name: string;
  fee: number;
}

export const shippingMethods: ShippingMethod[] = [
  { id: 'standard', name: 'ไปรษณีย์ไทย', fee: 80 },
  { id: 'kerry', name: 'Kerry Express', fee: 100 },
  { id: 'pickup', name: 'รับสินค้าที่ร้าน', fee: 0 },
];

export function getShippingMethods(): ShippingMethod[] {
  return shippingMethods;
}
