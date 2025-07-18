"use client"
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type FeatureFlag = 'review' | 'newSystem'

interface FeatureFlagState {
  isEnabled: (flag: FeatureFlag) => boolean
  toggle: (flag: FeatureFlag) => void
}

const FeatureFlagContext = createContext<FeatureFlagState | null>(null)

export function FeatureFlagProvider({ children }: { children: ReactNode }) {
  const [flags, setFlags] = useState<Record<FeatureFlag, boolean>>({
    review: false,
    newSystem: false,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const stored = localStorage.getItem('feature_flags')
      if (stored) setFlags(JSON.parse(stored))
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem('feature_flags', JSON.stringify(flags))
  }, [flags])

  const isEnabled = (flag: FeatureFlag) => !!flags[flag]

  const toggle = (flag: FeatureFlag) =>
    setFlags((f) => ({ ...f, [flag]: !f[flag] }))

  return (
    <FeatureFlagContext.Provider value={{ isEnabled, toggle }}>
      {children}
    </FeatureFlagContext.Provider>
  )
}

export function useFeatureFlags() {
  const ctx = useContext(FeatureFlagContext)
  if (!ctx) throw new Error('useFeatureFlags must be used within FeatureFlagProvider')
  return ctx
}
