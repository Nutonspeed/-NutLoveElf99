"use client"
import { createContext, useContext, type ReactNode } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"

interface Ctx {
  showImages: boolean
  toggle: () => void
}

const ReviewImagesContext = createContext<Ctx | null>(null)

export function ReviewImagesProvider({ children }: { children: ReactNode }) {
  const [showImages, setShowImages] = useLocalStorage<boolean>("showReviewImages", true)
  const toggle = () => setShowImages((v) => !v)
  return (
    <ReviewImagesContext.Provider value={{ showImages, toggle }}>
      {children}
    </ReviewImagesContext.Provider>
  )
}

export function useReviewImagesSetting() {
  const ctx = useContext(ReviewImagesContext)
  if (!ctx) throw new Error("useReviewImagesSetting must be used within provider")
  return ctx
}
