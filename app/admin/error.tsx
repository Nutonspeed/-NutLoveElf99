'use client'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import EmptyState from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/buttons/button'

export default function Error() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <EmptyState
        icon={<AlertTriangle className="h-8 w-8 text-red-600" />}
        title="เกิดข้อผิดพลาด"
        description="ไม่สามารถโหลดหน้าผู้ดูแลระบบ"
        action={
          <Link href="/">
            <Button>กลับหน้าแรก</Button>
          </Link>
        }
      />
    </div>
  )
}

