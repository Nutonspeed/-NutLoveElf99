"use client"
import { useEffect, useState } from 'react'
import versionData from '@/config/version.json'

export default function VersionPage() {
  const [version, setVersion] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('app_version')
    setVersion(stored || versionData.version)
    fetch('/SYSTEM_NOTES_MERGED_001-400.md')
      .then(r => r.text())
      .then(setNotes)
  }, [])

  const tagNew = () => {
    const parts = version.split('.')
    const v = [parts[0], parts[1], Number(parts[2] || 0) + 1].join('.')
    setVersion(v)
    localStorage.setItem('app_version', v)
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">App Version</h1>
      <p>Current version: {version}</p>
      <button className="px-2 py-1 border" onClick={tagNew}>Tag new version</button>
      <h2 className="text-xl font-semibold">Changelog</h2>
      <pre className="whitespace-pre-wrap text-sm border p-2 max-h-64 overflow-y-auto">{notes}</pre>
    </div>
  )
}
