export default function DevToolsPage() {
  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Developer Tools</h1>
      <p>Use the floating DevBar for quick actions.</p>
      <ul className="list-disc pl-5 space-y-1">
        <li><a href="/dashboard/devtools/flags" className="text-blue-600 underline">Feature Flags</a></li>
        <li><a href="/dashboard/devtools/env" className="text-blue-600 underline">Environment Mode</a></li>
        <li><a href="/dashboard/devtools/mock-editor" className="text-blue-600 underline">Mock Editor</a></li>
      </ul>
    </div>
  )
}
