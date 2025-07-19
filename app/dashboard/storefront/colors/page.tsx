"use client"
import { useEffect, useState } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/buttons/button'
import { getConfig, setTheme } from '@/core/mock/store'
import type { ColorPalette } from '@/types/storefront'

export default function ColorsPage() {
  const [colors, setColors] = useState<ColorPalette>({
    primary: '#2563eb',
    secondary: '#ec4899',
    background: '#ffffff',
    text: '#000000',
  })

  useEffect(() => {
    const cfg = getConfig()
    setColors(cfg.theme.colors)
  }, [])

  const change = (key: keyof ColorPalette, value: string) =>
    setColors((c) => ({ ...c, [key]: value }))

  const handleSave = () => {
    const cfg = getConfig()
    setTheme({ ...cfg.theme, colors })
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <SectionHeader title="กำหนดสีหลัก" />
      <div className="grid grid-cols-2 gap-4 max-w-md">
        {(['primary','secondary','background','text'] as Array<keyof ColorPalette>).map((k) => (
          <label key={k} className="space-y-1 text-sm capitalize">
            <span>{k}</span>
            <input type="color" value={colors[k]} onChange={(e) => change(k, e.target.value)} />
          </label>
        ))}
      </div>
      <div className="border p-4 rounded" style={{background: colors.background, color: colors.text}}>
        <div className="p-2" style={{background: colors.primary}}>Header</div>
        <div className="p-2 mt-2" style={{background: colors.secondary}}>Product Card</div>
      </div>
      <Button onClick={handleSave}>บันทึกสี</Button>
    </div>
  )
}
