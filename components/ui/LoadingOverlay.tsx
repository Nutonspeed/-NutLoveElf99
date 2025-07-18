"use client"
import LoadingSpinner from './LoadingSpinner'

export default function LoadingOverlay({ show = true }: { show?: boolean }) {
  if (!show) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <LoadingSpinner className="h-8 w-8 border-4" />
    </div>
  )
}
