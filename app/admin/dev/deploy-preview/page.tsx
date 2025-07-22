'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/buttons/button'

export default function DeployPreviewPage() {
  if (process.env.NODE_ENV !== 'development') {
    return <div className="p-4">Available only in development mode.</div>
  }
  const [loading, setLoading] = useState(false)
  const [last, setLast] = useState<string | null>(null)

  const build = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/dev/deploy-preview', { method: 'POST' })
    const data = await res.json()
    setLast(data.timestamp)
    setLoading(false)
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Deploy Preview</h1>
      <Button size="lg" onClick={build} disabled={loading}>
        {loading ? 'Building...' : 'Build Preview'}
      </Button>
      {last && <p>Last build: {new Date(last).toLocaleString()}</p>}
    </div>
  )
}
