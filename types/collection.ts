export interface Collection {
  id: string
  name: string
  slug: string
  priceRange: string
  description: string
  banner?: string
  tags?: string[]
  images: string[]
}
