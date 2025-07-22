export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl space-y-4 p-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-20 bg-gray-200 animate-pulse rounded" />
        ))}
      </div>
    </div>
  )
}

