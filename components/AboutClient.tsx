'use client'

import { useTheme } from '@/contexts/theme-context'

export default function AboutClient() {
  const { theme } = useTheme()
  return <div>Current Theme: {theme === 'admin' ? 'Admin' : 'Customer'}</div>
}
