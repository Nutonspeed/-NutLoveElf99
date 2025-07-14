"use client"
import { logs } from '@/lib/logs'

export default function DebugPanel() {
  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 max-h-60 overflow-y-auto rounded border bg-white p-4 text-xs shadow">
      <p className="font-bold mb-2">Debug Panel</p>
      {logs.length ? (
        <pre className="whitespace-pre-wrap break-all">
          {JSON.stringify(logs.slice(-5), null, 2)}
        </pre>
      ) : (
        <p>No logs</p>
      )}
    </div>
  )
}
