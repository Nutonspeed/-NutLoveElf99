export default function AutomationIndexPage() {
  return (
    <div className="container mx-auto py-8 space-y-2">
      <h1 className="text-2xl font-bold">Automation (mock)</h1>
      <ul className="list-disc pl-5">
        <li><a href="/dashboard/automation/rules" className="text-blue-600 underline">Rules</a></li>
        <li><a href="/dashboard/automation/actions" className="text-blue-600 underline">Actions</a></li>
        <li><a href="/dashboard/automation/log" className="text-blue-600 underline">Logs</a></li>
      </ul>
    </div>
  )
}
