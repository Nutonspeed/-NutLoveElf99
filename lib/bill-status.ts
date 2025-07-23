import type { AdminBill } from '@/mock/bills'

export function getBillStatusLabel(status: AdminBill['status']): string {
  switch (status) {
    case 'waiting':
      return 'รอคิว'
    case 'cutting':
      return 'ตัดผ้า'
    case 'sewing':
      return 'เย็บ'
    case 'packing':
    case 'packed':
      return 'แพ็กของ'
    case 'shipped':
      return 'จัดส่งแล้ว'
    case 'delivered':
      return 'ส่งมอบแล้ว'
    case 'paid':
      return 'ชำระแล้ว'
    case 'unpaid':
      return 'รอชำระ'
    case 'pending':
      return 'รอตรวจสอบ'
    case 'cancelled':
      return 'ยกเลิก'
    case 'failed':
      return 'ไม่สำเร็จ'
    default:
      return status
  }
}

export function getBillStatusBadgeClass(status: AdminBill['status']): string {
  switch (status) {
    case 'paid':
      return 'bg-green-500 text-white'
    case 'shipped':
      return 'bg-purple-500 text-white'
    case 'delivered':
      return 'bg-blue-500 text-white'
    case 'packing':
    case 'packed':
      return 'bg-yellow-500 text-white'
    case 'cancelled':
    case 'failed':
      return 'bg-red-500 text-white'
    case 'waiting':
    case 'cutting':
    case 'sewing':
    case 'unpaid':
    case 'pending':
    default:
      return 'bg-gray-500 text-white'
  }
}
