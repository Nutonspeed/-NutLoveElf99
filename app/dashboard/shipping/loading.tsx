export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-xl space-y-3 p-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 bg-gray-200 animate-pulse rounded" />
        ))}
      </div>
    </div>
  )
}

