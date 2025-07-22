export default function AdminDevToolsPage() {
  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Admin DevTools</h1>
      <ul className="list-disc pl-5 space-y-1">
        <li><a href="/admin/dev/switch-user" className="text-blue-600 underline">Switch User</a></li>
        <li><a href="/admin/dev/flags" className="text-blue-600 underline">Hidden Flags</a></li>
        <li><a href="/admin/wife" className="text-blue-600 underline">WifeMode Dashboard</a></li>
        <li><a href="/admin/checkin" className="text-blue-600 underline">Daily Check-in</a></li>
      </ul>
    </div>
  )
}
