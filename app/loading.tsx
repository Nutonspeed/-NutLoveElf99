export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center space-y-4">
        {/* Logo */}
        <div className="h-16 w-16 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-8">
          <span className="text-white font-bold text-xl">SC</span>
        </div>

        {/* Loading Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900">กำลังโหลด...</h2>
          <p className="text-gray-600">กรุณารอสักครู่</p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  )
}
