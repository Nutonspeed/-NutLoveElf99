"use client"

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Input } from '@/components/ui/inputs/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/buttons/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { calculateMockShipping } from '@/lib/mock-shipping'

export default function ShippingCalculatorPage() {
  const [total, setTotal] = useState('')
  const [province, setProvince] = useState('')
  const [rates, setRates] = useState<{ method: string; fee: number }[] | null>(null)

  const calculate = () => {
    const t = parseFloat(total)
    const res = calculateMockShipping(t, province)
    setRates(res)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>คำนวณค่าส่ง</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="total">ยอดรวมสินค้า (บาท)</Label>
              <Input
                id="total"
                type="number"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="province">จังหวัด</Label>
              <Select value={province} onValueChange={setProvince}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกจังหวัด" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="กรุงเทพฯ">กรุงเทพฯ</SelectItem>
                  <SelectItem value="เชียงใหม่">เชียงใหม่</SelectItem>
                  <SelectItem value="ขอนแก่น">ขอนแก่น</SelectItem>
                  <SelectItem value="สงขลา">สงขลา</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" onClick={calculate}>คำนวณ</Button>
            {rates ? (
              <div className="space-y-2">
                {rates.map((r) => (
                  <div key={r.method} className="flex justify-between">
                    <span>{r.method}</span>
                    <span>{r.fee} บาท</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-sm text-gray-500">ไม่สามารถคำนวณค่าส่งได้</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
