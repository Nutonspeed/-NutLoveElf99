"use client"
import { mockLogs } from "@/lib/mock-logs"

export default function DevTestPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Dev Logs</h1>
      {mockLogs.length === 0 ? (
        <p className="text-gray-500">ไม่มี log</p>
      ) : (
        <ul className="space-y-2">
          {mockLogs.map((l) => (
            <li key={l.id} className="border p-2 rounded">
              <div className="text-xs text-gray-500">
                {new Date(l.timestamp).toLocaleString()}
              </div>
              <div>{l.message}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
