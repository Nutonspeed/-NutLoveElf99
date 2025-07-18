import React from "react"

export default function LoadingSpinner({
  label = "Loading...",
  className = "",
}: {
  label?: string
  className?: string
}) {
  return (
    <div className={"flex flex-col items-center justify-center " + className}>
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-2" />
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  )
}
