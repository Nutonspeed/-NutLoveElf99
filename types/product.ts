export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  collectionId: string
  sizes: string[]
  colors: string[]
  inStock: boolean
  /** จำนวนคงเหลือ */
  stock: number
  rating: number
  reviews: number
  features: string[]
  material: string
  care: string[]
  status?: "active" | "draft"
  tags?: string[]
  curated?: boolean
}
