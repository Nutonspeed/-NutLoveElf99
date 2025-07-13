import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  return `฿${amount.toLocaleString()}`
}

export function formatThaiDate(date: string | number | Date) {
  return new Date(date).toLocaleDateString('th-TH')
}
