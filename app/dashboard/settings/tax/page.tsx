"use client"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/inputs/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/buttons/button"
import { getConfig, setTax } from "@/core/mock/store"

export default function TaxSettingsPage() {
  const [rate, setRate] = useState(getConfig().tax.rate)
  const [included, setIncluded] = useState(getConfig().tax.included)

  useEffect(() => {
    const { tax } = getConfig()
    setRate(tax.rate)
    setIncluded(tax.included)
  }, [])

  const handleSave = () => {
    setTax({ rate, included })
    alert("บันทึกแล้ว")
  }

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">ตั้งค่าภาษี</h1>
      <Input
        type="number"
        value={rate}
        onChange={e => setRate(Number(e.target.value))}
        placeholder="เปอร์เซ็นต์ภาษี"
      />
      <div className="flex items-center space-x-2">
        <Checkbox
          id="included"
          checked={included}
          onCheckedChange={v => setIncluded(v as boolean)}
        />
        <label htmlFor="included" className="text-sm">รวมภาษีในราคาสินค้า</label>
      </div>
      <Button onClick={handleSave}>บันทึก</Button>
    </div>
  )
}
