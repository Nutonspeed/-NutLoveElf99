'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { loadDarkMode, darkMode, setDarkMode } from '@/lib/mock-settings'

export default function DarkModeToggle() {
  const { setTheme } = useTheme()
  const [enabled, setEnabled] = useState(darkMode)

  useEffect(() => {
    loadDarkMode()
    setEnabled(darkMode)
  }, [])

  const toggle = () => {
    const next = !enabled
    setEnabled(next)
    setDarkMode(next)
    setTheme(next ? 'dark' : 'light')
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggle}
      aria-label="toggle dark mode"
    >
      {enabled ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
}
