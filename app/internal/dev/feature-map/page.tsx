import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Feature Map'
}

const features = [
  { category: 'Orders', feature: 'List orders' },
  { category: 'Products', feature: 'Manage products' },
  { category: 'Customers', feature: 'Customer profiles' },
]

export default function FeatureMapPage() {
  return (
    <div className="p-4 space-y-2">
      <h1 className="text-2xl font-bold">Feature Map</h1>
      <pre className="bg-muted p-4 rounded-md text-sm">
        {JSON.stringify(features, null, 2)}
      </pre>
    </div>
  )
}
