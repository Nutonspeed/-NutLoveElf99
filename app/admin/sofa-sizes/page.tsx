"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/auth-context'
import { sofaSizes, loadSofaSizes, saveSofaSizes, type SofaSize } from '@/lib/mock-sofa-sizes'

export default function AdminSofaSizesPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [sizes, setSizes] = useState<SofaSize[]>(sofaSizes)
  const [value, setValue] = useState('')
  const [label, setLabel] = useState('')

  useEffect(() => {
    loadSofaSizes()
    setSizes([...sofaSizes])
    if (!isAuthenticated) {
      router.push('/login')
    } else if (user?.role !== 'admin') {
      router.push('/')
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== 'admin') return null

  const addSize = () => {
    if (!value || !label) return
    const newSize = { value, label }
    const updated = [...sizes, newSize]
    setSizes(updated)
    saveSofaSizes(updated)
    setValue('')
    setLabel('')
  }

  const removeSize = (val: string) => {
    const updated = sizes.filter((s) => s.value !== val)
    setSizes(updated)
    saveSofaSizes(updated)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center space-x-4 mb-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">ตั้งค่าขนาดโซฟา</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>เพิ่มขนาด</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Value" value={value} onChange={(e) => setValue(e.target.value)} />
            <Input placeholder="Label" value={label} onChange={(e) => setLabel(e.target.value)} />
            <Button onClick={addSize} disabled={!value || !label}>เพิ่ม</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>รายการขนาด</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {sizes.map((s) => (
              <div key={s.value} className="flex items-center justify-between border-b py-2">
                <div>
                  <p className="font-medium">{s.label}</p>
                  <p className="text-sm text-gray-600">{s.value}</p>
                </div>
                <Button size="icon" variant="outline" onClick={() => removeSize(s.value)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {sizes.length === 0 && (
              <p className="text-center text-gray-500">ไม่มีข้อมูล</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
