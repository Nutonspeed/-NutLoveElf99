"use client"
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/inputs/input'
import { Button } from '@/components/ui/buttons/button'
import { loadGeneralConfig, generalConfig, setGeneralConfig } from '@/lib/mock-general-settings'
import { toast } from 'sonner'

export default function GeneralSettingsPage() {
  const [loaded, setLoaded] = useState(false)
  const [name, setName] = useState('')
  const [logo, setLogo] = useState('')
  const [lang, setLang] = useState('th')

  useEffect(() => {
    try {
      loadGeneralConfig()
      setName(generalConfig.storeName)
      setLogo(generalConfig.logo)
      setLang(generalConfig.language)
      setLoaded(true)
    } catch (e) {
      console.error(e)
    }
  }, [])

  if (!loaded) {
    return <p className="p-4 text-red-500">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
  }

  const handleSave = () => {
    setGeneralConfig({ storeName: name, logo, language: lang })
    toast.success('บันทึกแล้ว')
  }

  return (
    <div className="container mx-auto space-y-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold">ตั้งค่าทั่วไป</h1>
      <Input placeholder="ชื่อร้าน" value={name} onChange={e=>setName(e.target.value)} />
      <Input placeholder="โลโก้ URL" value={logo} onChange={e=>setLogo(e.target.value)} />
      <div>
        <label className="mb-1 block text-sm font-medium">ภาษาหลัก</label>
        <select value={lang} onChange={e=>setLang(e.target.value)} className="w-full rounded border p-2">
          <option value="th">TH</option>
          <option value="en">EN</option>
        </select>
      </div>
      <Button onClick={handleSave}>Save</Button>
    </div>
  )
}
