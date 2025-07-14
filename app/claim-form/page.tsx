"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/inputs/input'
import { createClaim, loadClaims } from '@/lib/mock-claims'

export default function ClaimFormPage() {
  const router = useRouter()
  const [orderId, setOrderId] = useState('')
  const [reason, setReason] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    loadClaims()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!orderId || !reason || !file) {
      setError('กรุณากรอกข้อมูลให้ครบ')
      return
    }
    if (file.size > 1024 * 1024) {
      setError('รูปใหญ่เกินไป')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const image = reader.result as string
      createClaim({ orderId, image, reason })
      router.push('/claim-form/thanks')
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>แจ้งเคลมสินค้า</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="order">หมายเลขออเดอร์</Label>
                <Input id="order" value={orderId} onChange={(e) => setOrderId(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">รายละเอียดปัญหา</Label>
                <textarea id="reason" className="w-full border rounded p-2" rows={4} value={reason} onChange={(e) => setReason(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">แนบรูป</Label>
                <Input id="image" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <Button type="submit" className="w-full">ส่งเคลม</Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
