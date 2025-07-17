"use client"

import { ReactNode } from 'react'
import { useTheme } from '@/contexts/theme-context'

export default function ThemeWrapper({ children }: { children: ReactNode }) {
  const { theme } = useTheme()
  const bg = theme === 'admin' ? 'bg-blue-50' : 'bg-gray-50'
  return <div className={`${bg} min-h-screen`}>{children}</div>
}
