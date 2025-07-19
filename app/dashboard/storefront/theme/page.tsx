"use client"
import { useState, useEffect } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/buttons/button'
import { getConfig, setTheme } from '@/core/mock/store'
import type { ThemeName, ThemeConfig } from '@/types/storefront'

const themes: ThemeName[] = ['light', 'dark', 'soft', 'neon']

export default function ThemeSelectorPage() {
  const [current, setCurrent] = useState<ThemeName>('light')

  useEffect(() => {
    const cfg = getConfig()
    setCurrent(cfg.theme.theme)
  }, [])

  const handleSave = () => {
    const cfg = getConfig()
    const newTheme: ThemeConfig = { ...cfg.theme, theme: current }
    setTheme(newTheme)
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <SectionHeader title="เลือกธีมหลัก" />
      <div className="flex gap-4">
        {themes.map((t) => (
          <button
            key={t}
            onClick={() => setCurrent(t)}
            className={`border px-4 py-2 rounded ${current === t ? 'bg-primary text-white' : ''}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="border p-4 rounded">Preview: {current}</div>
      <Button onClick={handleSave}>บันทึกธีม</Button>
    </div>
  )
}
