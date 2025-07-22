"use client"
import { useEffect, useState } from 'react'
import { getConfig } from '@/core/mock/store'
import type { LayoutComponent } from '@/types/storefront'

interface Snapshot {
  id: string
  score: number
  layout: LayoutComponent[]
  date: string
}

export default function SeoAnalyzerPage() {
  const [history, setHistory] = useState<Snapshot[]>([])

  useEffect(() => {
    fetch('/mock/store/layout-history.json')
      .then(r => r.json())
      .then(setHistory)
      .catch(() => setHistory([]))
  }, [])

  const runAudit = () => {
    const score = Math.round(Math.random() * 40 + 60)
    const snapshot: Snapshot = {
      id: Date.now().toString(),
      score,
      layout: getConfig().layout,
      date: new Date().toISOString(),
    }
    const updated = [snapshot, ...history]
    setHistory(updated)
    const blob = new Blob([JSON.stringify(updated, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'layout-history.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">SEO Analyzer</h1>
      <button className="border px-3 py-1" onClick={runAudit}>Run Audit</button>
      <div className="space-y-2">
        {history.map(h => (
          <div key={h.id} className="border p-2 rounded">
            <p>Score: {h.score}</p>
            <p>Date: {new Date(h.date).toLocaleString()}</p>
            <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(h.layout)}</pre>
          </div>
        ))}
      </div>
    </div>
  )
}
