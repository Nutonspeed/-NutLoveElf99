"use client"
import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'soft' | 'neon'
const themes: Theme[] = ['light', 'dark', 'soft', 'neon']

export default function ThemePreviewPage() {
  const [selected, setSelected] = useState<Theme>('light')

  useEffect(() => {
    fetch('/mock/store/theme-preview.json')
      .then(r => r.json())
      .then(data => setSelected(data.theme as Theme))
      .catch(() => {})
  }, [])

  const save = () => {
    const blob = new Blob([JSON.stringify({ theme: selected }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'theme-preview.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Theme Preview</h1>
      <div className="flex gap-2">
        {themes.map(t => (
          <button
            key={t}
            onClick={() => setSelected(t)}
            className={`border px-3 py-1 rounded ${selected === t ? 'bg-primary text-white' : ''}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="border p-4 rounded">Preview: {selected}</div>
      <button className="border px-3 py-1" onClick={save}>Save</button>
    </div>
  )
}
