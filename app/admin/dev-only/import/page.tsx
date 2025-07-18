"use client"

import { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { canAccess } from '@/lib/mock-roles'
import { importMockData, rollbackImport, type ImportResult } from '@/lib/mock-import'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Input } from '@/components/ui/inputs/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/hooks/use-toast'

export default function AdminImportPage() {
  const { user, isAuthenticated } = useAuth()
  const fileRef = useRef<HTMLInputElement>(null)
  const [dryRun, setDryRun] = useState(false)
  const [summary, setSummary] = useState<ImportResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  if (!isAuthenticated || !canAccess(user?.role, 'dev')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>ไม่มีสิทธิ์เข้าถึง</p>
      </div>
    )
  }

  const handleImport = () => {
    const file = fileRef.current?.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string)
        const result = importMockData(data, { dryRun })
        setSummary(result)
        setError(null)
      } catch (e) {
        setError('ไม่สามารถอ่านไฟล์นี้ได้')
        setSummary(null)
      }
    }
    reader.readAsText(file)
  }

  const handleRollback = () => {
    rollbackImport()
    toast({ description: 'ย้อนกลับสำเร็จ' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">นำเข้าข้อมูล</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Import JSON</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input ref={fileRef} type="file" accept="application/json" />
            <label className="flex items-center space-x-2 text-sm">
              <Checkbox checked={dryRun} onCheckedChange={(v) => setDryRun(!!v)} />
              <span>Dry run</span>
            </label>
            <Button onClick={handleImport}>นำเข้า</Button>
            {error && <p className="text-destructive">{error}</p>}
            {summary && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span>Products:</span>
                  <Badge>{summary.products.imported} ✅</Badge>
                  <Badge variant="destructive">{summary.products.skipped} ❌</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Fabrics:</span>
                  <Badge>{summary.fabrics.imported} ✅</Badge>
                  <Badge variant="destructive">{summary.fabrics.skipped} ❌</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Bills:</span>
                  <Badge>{summary.bills.imported} ✅</Badge>
                  <Badge variant="destructive">{summary.bills.skipped} ❌</Badge>
                </div>
              </div>
            )}
            <Button variant="outline" onClick={handleRollback}>
              ย้อนกลับ
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
