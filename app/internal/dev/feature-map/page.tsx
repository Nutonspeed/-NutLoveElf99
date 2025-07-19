import { scanFeatureRoutes } from '@/lib/featureMap'

export default async function FeatureMapPage() {
  if (process.env.NODE_ENV !== 'development') {
    return <div className="p-4">Available only in development mode.</div>
  }
  const data = await scanFeatureRoutes()
  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Feature Map</h1>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Category</th>
            <th className="p-2 text-left">Routes</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([cat, routes]) => (
            <tr key={cat} className="border-b align-top">
              <td className="p-2 font-medium">{cat}</td>
              <td className="p-2">
                <ul className="list-disc pl-4 space-y-1">
                  {(routes as string[]).map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
