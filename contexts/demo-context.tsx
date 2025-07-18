"use client"
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface DemoState {
  enabled: boolean
  toggle: () => void
}

const DemoContext = createContext<DemoState | null>(null)

export function DemoProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = localStorage.getItem('demo_mode')
    if (stored) setEnabled(stored === '1')
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem('demo_mode', enabled ? '1' : '0')
  }, [enabled])

  const toggle = () => setEnabled((e) => !e)

  return (
    <DemoContext.Provider value={{ enabled, toggle }}>
      {children}
    </DemoContext.Provider>
  )
}

export function useDemo() {
  const ctx = useContext(DemoContext)
  if (!ctx) throw new Error('useDemo must be used within DemoProvider')
  return ctx
}
