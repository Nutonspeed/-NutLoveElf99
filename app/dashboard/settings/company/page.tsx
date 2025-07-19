"use client"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import { loadCompanyInfo, companyInfo, setCompanyInfo } from "@/lib/mock-company"

export default function CompanySettingsPage() {
  const [name, setName] = useState(companyInfo.name)
  const [address, setAddress] = useState(companyInfo.address)
  const [taxId, setTaxId] = useState(companyInfo.taxId)

  useEffect(() => {
    loadCompanyInfo()
    setName(companyInfo.name)
    setAddress(companyInfo.address)
    setTaxId(companyInfo.taxId)
  }, [])

  const handleSave = () => {
    setCompanyInfo({ name, address, taxId })
    alert("บันทึกแล้ว")
  }

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">ข้อมูลบริษัท</h1>
      <Input placeholder="ชื่อบริษัท" value={name} onChange={e=>setName(e.target.value)} />
      <Input placeholder="ที่อยู่" value={address} onChange={e=>setAddress(e.target.value)} />
      <Input placeholder="TAX ID" value={taxId} onChange={e=>setTaxId(e.target.value)} />
      <Button onClick={handleSave}>บันทึก</Button>
    </div>
  )
}
