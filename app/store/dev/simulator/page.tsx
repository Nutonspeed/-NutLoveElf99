"use client"

export default function MobileSimulatorPage() {
  if (process.env.NODE_ENV !== "development") {
    return <div className="p-4">Available only in development mode.</div>
  }
  return (
    <div className="flex justify-center p-4">
      <div className="border-8 rounded-[2rem] border-gray-800 w-[600px] h-[800px] overflow-hidden">
        <iframe src="/" className="w-full h-full" />
      </div>
    </div>
  )
}
