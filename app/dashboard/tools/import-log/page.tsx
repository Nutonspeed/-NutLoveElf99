"use client"
import { useEffect, useState } from 'react'
import { importExportLog, loadImportExportLog } from '@/lib/mock-import-log'

export default function ImportLogPage() {
  const [logs, setLogs] = useState(importExportLog)
  useEffect(() => {
    loadImportExportLog()
    setLogs([...importExportLog])
  }, [])
  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Import/Export History</h1>
      {logs.length > 0 ? (
        <table className="table-auto w-full border">
          <thead>
            <tr><th>File</th><th>Count</th><th>Time</th></tr>
          </thead>
          <tbody>
            {logs.map(l => (
              <tr key={l.id}>
                <td>{l.file}</td>
                <td>{l.count}</td>
                <td>{new Date(l.time).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-sm">No history</p>
      )}
    </div>
  )
}
