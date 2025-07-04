export default function NotificationsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
            <div>
              <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="w-64 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-24 h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="w-48 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-40 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
