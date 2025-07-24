import { toast } from 'sonner'

export async function copyToClipboard(text: string) {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('คัดลอกลิงก์แล้ว')
    } catch (err) {
      toast.error('ไม่สามารถคัดลอกลิงก์ได้')
    }
  }
}
