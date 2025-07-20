export type OrderStatus =
  | 'draft'
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'producing'
  | 'done'
  | 'packed'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'pendingPayment'
  | 'depositPaid'
  | 'paid'
  | 'completed'
  | 'archived'

export const orderStatusOptions: { value: OrderStatus; label: string }[] = [
  { value: 'draft', label: 'ร่าง' },
  { value: 'pending', label: 'รอยืนยัน' },
  { value: 'confirmed', label: 'ยืนยันแล้ว' },
  { value: 'processing', label: 'กำลังดำเนินการ' },
  { value: 'producing', label: 'กำลังผลิต' },
  { value: 'done', label: 'ผลิตเสร็จแล้ว' },
  { value: 'packed', label: 'แพ็กของแล้ว' },
  { value: 'shipped', label: 'จัดส่งแล้ว' },
  { value: 'delivered', label: 'ส่งมอบแล้ว' },
  { value: 'cancelled', label: 'ยกเลิก' },
  { value: 'pendingPayment', label: 'รอชำระเงิน' },
  { value: 'depositPaid', label: 'มัดจำแล้ว' },
  { value: 'paid', label: 'ชำระแล้ว' },
  { value: 'completed', label: 'เสร็จสิ้น' },
  { value: 'archived', label: 'เก็บถาวร' },
]

export type PackingStatus = 'packing' | 'done' | 'ready'

export const packingStatusOptions: { value: PackingStatus; label: string }[] = [
  { value: 'packing', label: 'กำลังแพ็ก' },
  { value: 'done', label: 'แพ็กเสร็จ' },
  { value: 'ready', label: 'พร้อมส่ง' },
]
