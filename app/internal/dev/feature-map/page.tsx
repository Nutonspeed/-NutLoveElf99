import { getFeatureMap } from '@/lib/feature-map'

export default function FeatureMapPage() {
  if (process.env.NODE_ENV !== 'development') {
    return <div className="p-4">Available only in development mode.</div>
  }

  const data = getFeatureMap()

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Feature Map</h1>
      <a href="/api/internal/dev/feature-map" className="text-blue-600 underline">
        JSON
      </a>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-2 py-1 text-left">Path</th>
            <th className="border px-2 py-1 text-left">Label</th>
            <th className="border px-2 py-1 text-left">Feature</th>
            <th className="border px-2 py-1 text-left">Source</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.path}>
              <td className="border px-2 py-1 font-mono">{entry.path}</td>
              <td className="border px-2 py-1">{entry.label}</td>
              <td className="border px-2 py-1">{entry.feature}</td>
              <td className="border px-2 py-1">{entry.source}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
