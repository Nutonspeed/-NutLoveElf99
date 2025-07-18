"use client"
import { Suspense, ReactNode } from "react"
import Fallback, { FallbackType } from "./Fallback"

export default function WithSuspense({
  children,
  fallbackType = "loading",
}: {
  children: ReactNode
  fallbackType?: FallbackType
}) {
  return (
    <Suspense fallback={<Fallback type={fallbackType} />}>{children}</Suspense>
  )
}
