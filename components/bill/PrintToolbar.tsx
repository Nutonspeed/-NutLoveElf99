"use client"
import { Button } from '@/components/ui/buttons/button'
import { useRouter } from 'next/navigation'
import { triggerPrint } from '@/lib/pdf/print'

export default function PrintToolbar() {
  const router = useRouter()

  const copyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .catch(() => {})
  }

  return (
    <div className="print:hidden fixed top-0 inset-x-0 z-50 bg-white border-b flex justify-center gap-2 p-2">
      <Button variant="outline" onClick={() => router.back()}>
        กลับ
      </Button>
      <Button onClick={triggerPrint}>พิมพ์เลย</Button>
      <Button variant="secondary" onClick={copyLink}>
        คัดลอกลิงก์
      </Button>
    </div>
  )
}
