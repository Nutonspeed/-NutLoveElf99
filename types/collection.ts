export interface CollectionData {
  id: string
  name: string
  slug: string
  priceRange: string
  description: string
  images: string[]
  version: number
  guide: string[]
  guideAddedBy?: string
}

export interface CollectionHistory {
  version: number
  admin: string
  timestamp: string
  data: CollectionData
}

export interface Collection extends CollectionData {
  history: CollectionHistory[]
}
