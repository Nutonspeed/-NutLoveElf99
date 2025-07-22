import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  return `฿${amount.toLocaleString()}`
}

export const formatDateThai = formatThaiDate

export function formatThaiDate(date: string | number | Date) {
  return new Date(date).toLocaleDateString('th-TH')
}

export function formatDate(date: string | number | Date, locale = 'th-TH') {
  return new Date(date).toLocaleDateString(locale)
}

export function calculateTotal<T extends { price: number; quantity: number }>(
  items: T[],
) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

import type { OrderStatus } from '@/types/order'
import { orderStatusOptions } from '@/types/order'

export function getOrderStatusLabel(status: string | OrderStatus) {
  const opt = orderStatusOptions.find(o => o.value === status)
  return opt ? opt.label : 'Unknown'
}
