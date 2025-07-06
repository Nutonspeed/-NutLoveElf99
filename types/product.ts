export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  sizes: string[]
  colors: string[]
  inStock: boolean
  rating: number
  reviews: number
  features: string[]
  material: string
  care: string[]
}
