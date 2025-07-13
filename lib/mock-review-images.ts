export interface ReviewImage {
  productId: string
  url: string
  active: boolean
}

export const mockReviewImages: ReviewImage[] = [
  { productId: "1", url: "/placeholder.svg?height=300&width=300", active: true },
  { productId: "1", url: "/placeholder.svg?height=300&width=300", active: true },
  { productId: "2", url: "/placeholder.svg?height=300&width=300", active: true },
  { productId: "3", url: "/placeholder.svg?height=300&width=300", active: true },
]
