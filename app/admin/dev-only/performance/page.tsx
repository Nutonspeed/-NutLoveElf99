"use client"
import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Input } from '@/components/ui/inputs/input'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/cards/card'
import EmptyState from '@/components/EmptyState'
import type { PageAuditResult } from '@/lib/mock-page-audit'
import { simulatePageAudit } from '@/lib/mock-page-audit'

export default function DevPerformancePage() {
  const { user, isAuthenticated } = useAuth()
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<PageAuditResult | null>(null)
  const [error, setError] = useState('')

  if (!isAuthenticated || user?.role !== 'admin') {
    return <EmptyState title="ไม่มีสิทธิ์เข้าถึง" />
  }

  const handleRun = () => {
    const res = simulatePageAudit(url)
    if (!res) {
      setError('ไม่สามารถจำลองการโหลดได้')
      setResult(null)
    } else {
      setResult(res)
      setError('')
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>ตัวทดสอบเวลาโหลดหน้า</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="กรอก URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button onClick={handleRun}>ตรวจสอบ</Button>
          </div>
          {error && <p className="text-destructive">{error}</p>}
          {result && (
            <div className="space-y-1 text-sm">
              <p>รวม: {Math.round(result.total)} ms</p>
              <p>ไฟล์: {Math.round(result.assets)} ms</p>
              <p>เรนเดอร์: {Math.round(result.render)} ms</p>
              <p>ดีเลย์: {Math.round(result.delay)} ms</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
