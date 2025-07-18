"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addFabric } from '@/mock/fabrics'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'

interface Variant { color: string; size: string }

export default function AddFabricWithVariantsPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [variants, setVariants] = useState<Variant[]>([])
  const [color, setColor] = useState('')
  const [size, setSize] = useState('')
  const [error, setError] = useState('')

  const addVariant = () => {
    if (!color.trim() || !size.trim()) {
      setError('กรอกสีและขนาดให้ครบ')
      return
    }
    setVariants([...variants, { color: color.trim(), size: size.trim() }])
    setColor('')
    setSize('')
    setError('')
  }

  const handleSave = () => {
    if (!name.trim() || !imageUrl.trim() || variants.length === 0) {
      setError('กรอกข้อมูลให้ครบ')
      return
    }
    addFabric({ name, imageUrl, variants })
    router.push('/dashboard/fabrics')
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">เพิ่มผ้าพร้อมตัวเลือก</h1>
      <div className="space-y-2 w-72">
        <Input placeholder="ชื่อผ้า" value={name} onChange={e => setName(e.target.value)} />
        <Input placeholder="รูป URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
        <div className="flex gap-2">
          <Input placeholder="สี" value={color} onChange={e => setColor(e.target.value)} />
          <Input placeholder="ขนาด" value={size} onChange={e => setSize(e.target.value)} />
          <Button variant="outline" onClick={addVariant}>เพิ่ม</Button>
        </div>
        {variants.length > 0 && (
          <ul className="text-sm list-disc pl-4">
            {variants.map((v, i) => (
              <li key={i}>{v.color} - {v.size}</li>
            ))}
          </ul>
        )}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <Button onClick={handleSave}>บันทึก</Button>
      </div>
    </div>
  )
}
