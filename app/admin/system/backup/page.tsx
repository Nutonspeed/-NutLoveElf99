"use client"
import JSZip from 'jszip'
import { useState } from 'react'

function exportZip() {
  const keys = Object.keys(localStorage).filter(k => k.startsWith('mockStore_'))
  const zip = new JSZip()
  keys.forEach(k => {
    const data = localStorage.getItem(k) || '[]'
    zip.file(k.replace('mockStore_', '') + '.json', data)
  })
  zip.generateAsync({ type: 'blob' }).then(blob => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mock-store.zip'
    a.click()
    URL.revokeObjectURL(url)
  })
}

export default function SystemBackupPage() {
  const [file, setFile] = useState<File | null>(null)

  const restore = () => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = async () => {
      const zip = await JSZip.loadAsync(reader.result as ArrayBuffer)
      await Promise.all(
        Object.keys(zip.files).map(async name => {
          const content = await zip.files[name].async('string')
          const key = 'mockStore_' + name.replace('.json','')
          localStorage.setItem(key, content)
        })
      )
      alert('Restored')
    }
    reader.readAsArrayBuffer(file)
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">System Backup</h1>
      <button className="px-3 py-1 border" onClick={exportZip}>Export Store</button>
      <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
      <button className="px-3 py-1 border" onClick={restore}>Restore</button>
    </div>
  )
}
