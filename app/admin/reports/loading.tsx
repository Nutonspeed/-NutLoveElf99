export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
            <div>
              <div className="w-64 h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="w-48 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-24 h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-24 h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Key Metrics Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="w-24 h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="w-32 h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="w-16 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs Skeleton */}
        <div className="space-y-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-20 h-10 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>

          {/* Chart Skeleton */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="w-48 h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="w-full h-80 bg-gray-100 rounded animate-pulse"></div>
          </div>

          {/* Cards Grid Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <div className="w-32 h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                        <div>
                          <div className="w-32 h-4 bg-gray-200 rounded mb-1 animate-pulse"></div>
                          <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="w-20 h-4 bg-gray-200 rounded mb-1 animate-pulse"></div>
                        <div className="w-12 h-3 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
