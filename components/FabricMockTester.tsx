'use client'

import { useEffect, useState } from 'react'
import { FabricsList } from './FabricsList'
import { Button } from '@/components/ui/buttons/button'
import { useToast } from '@/hooks/use-toast'
import { validateMockFabrics, resetMockFabrics } from '@/lib/mock-fabrics'

interface Fabric {
  id: string
  slug: string | null
  name: string
  sku?: string | null
  image_url?: string | null
  image_urls?: string[] | null
}

export function FabricMockTester({ fabrics }: { fabrics: Fabric[] }) {
  const { toast } = useToast()
  const [states, setStates] = useState<Record<string, boolean>>({})

  const runTest = () => {
    const { states: s, errors } = validateMockFabrics()
    setStates(s)
    console.log('Fabric mock test:', errors.length === 0 ? 'pass' : 'fail', errors)
    if (errors.length > 0) {
      alert('Fabric mock data error')
      toast({ title: 'Data error: missing fields', variant: 'destructive' })
    } else {
      toast({ title: 'Fabric mock is ready' })
    }
  }

  const handleReset = () => {
    resetMockFabrics()
    runTest()
  }

  useEffect(() => {
    runTest()
  }, [])

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <Button onClick={runTest}>Test fabric mock</Button>
        <Button variant="outline" onClick={handleReset}>
          Reset mock fabric
        </Button>
      </div>
      <FabricsList fabrics={fabrics} testStates={states} />
    </div>
  )
}
