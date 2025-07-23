import { getEnv } from '@/lib/system-config'
import { countOrders, sumOrderTotal, countChats, averageFeedback } from '@/mock/mock-db'
import { accessLogs } from '@/lib/mock-access-logs'
import { logs } from '@/lib/logs'

export default function OverviewPage() {
  const env = getEnv()
  const metrics = [
    { label: 'Orders', value: countOrders().toString() },
    { label: 'Total Revenue', value: sumOrderTotal().toLocaleString('th-TH') },
    { label: 'Chats', value: countChats().toString() },
    { label: 'Avg Feedback', value: averageFeedback().toFixed(1) },
    { label: 'Access Logs', value: accessLogs.length.toString() },
    { label: 'App Logs', value: logs.length.toString() },
  ]

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">System Overview</h1>
      <p className="text-sm text-muted-foreground">Environment: {env}</p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map(m => (
          <li key={m.label} className="rounded-md border p-4">
            <p className="text-sm text-muted-foreground">{m.label}</p>
            <p className="text-xl font-semibold">{m.value}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
