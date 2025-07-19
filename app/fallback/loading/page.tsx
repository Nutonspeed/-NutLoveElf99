"use client"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingFallback() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!loaded) {
    return (
      <div className="p-6 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    )
  }

  return <div className="p-6">ข้อมูลโหลดเรียบร้อย</div>
}
