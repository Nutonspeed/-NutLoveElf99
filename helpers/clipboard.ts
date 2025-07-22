import { toast } from 'sonner'

export function copyToClipboard(text: string) {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(text)
    toast.success('คัดลอกลิงก์แล้ว')
  }
}
