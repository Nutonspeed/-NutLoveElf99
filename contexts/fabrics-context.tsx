"use client"
import { createContext, useContext, type ReactNode } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { mockFabrics, type Fabric } from '@/lib/mock-fabrics'

interface FabricsContextValue {
  fabrics: Fabric[]
  updateFabric: (id: string, data: Partial<Fabric>) => void
}

const FabricsContext = createContext<FabricsContextValue | null>(null)

export function FabricsProvider({ children }: { children: ReactNode }) {
  const [fabrics, setFabrics] = useLocalStorage<Fabric[]>('fabrics-data', mockFabrics)

  const updateFabric = (id: string, data: Partial<Fabric>) => {
    setFabrics(prev => prev.map(f => (f.id === id ? { ...f, ...data } : f)))
  }

  return (
    <FabricsContext.Provider value={{ fabrics, updateFabric }}>
      {children}
    </FabricsContext.Provider>
  )
}

export function useFabrics() {
  const ctx = useContext(FabricsContext)
  if (!ctx) throw new Error('useFabrics must be used within FabricsProvider')
  return ctx
}
