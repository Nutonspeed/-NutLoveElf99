export interface Collection {
  id: string
  name: string
  slug: string
  description: string
  cover_image_url: string
}

export interface Fabric {
  id: string
  name: string
  collection_id: string
  image_urls: string[]
  price_min: number
  price_max: number
}

export const mockCollections: Collection[] = [
  {
    id: '1',
    name: 'คอลเลกชันฤดูร้อน',
    slug: 'summer',
    description: 'ลายผ้าสดใสเหมาะกับหน้าร้อน',
    cover_image_url: '/placeholder.svg?height=300&width=300',
  },
  {
    id: '2',
    name: 'คอลเลกชันมินิมอล',
    slug: 'minimal',
    description: 'ลายเรียบง่ายสไตล์มินิมอล',
    cover_image_url: '/placeholder.svg?height=300&width=300',
  },
]

export const mockFabrics: Fabric[] = [
  {
    id: 'f1',
    name: 'ลายดอกไม้ A',
    collection_id: '1',
    image_urls: [
      '/placeholder.svg?height=300&width=300',
      '/placeholder.svg?height=300&width=300',
    ],
    price_min: 100,
    price_max: 200,
  },
  {
    id: 'f2',
    name: 'ลายดอกไม้ B',
    collection_id: '1',
    image_urls: [
      '/placeholder.svg?height=300&width=300',
      '/placeholder.svg?height=300&width=300',
    ],
    price_min: 120,
    price_max: 220,
  },
  {
    id: 'f3',
    name: 'ลายกราฟิก A',
    collection_id: '1',
    image_urls: [
      '/placeholder.svg?height=300&width=300',
      '/placeholder.svg?height=300&width=300',
    ],
    price_min: 150,
    price_max: 250,
  },
  {
    id: 'f4',
    name: 'ลายกราฟิก B',
    collection_id: '1',
    image_urls: [
      '/placeholder.svg?height=300&width=300',
      '/placeholder.svg?height=300&width=300',
    ],
    price_min: 180,
    price_max: 280,
  },
  {
    id: 'f5',
    name: 'ลายเรียบ A',
    collection_id: '2',
    image_urls: [
      '/placeholder.svg?height=300&width=300',
      '/placeholder.svg?height=300&width=300',
    ],
    price_min: 200,
    price_max: 300,
  },
  {
    id: 'f6',
    name: 'ลายเรียบ B',
    collection_id: '2',
    image_urls: [
      '/placeholder.svg?height=300&width=300',
      '/placeholder.svg?height=300&width=300',
    ],
    price_min: 220,
    price_max: 320,
  },
  {
    id: 'f7',
    name: 'ลายเส้น A',
    collection_id: '2',
    image_urls: [
      '/placeholder.svg?height=300&width=300',
      '/placeholder.svg?height=300&width=300',
    ],
    price_min: 250,
    price_max: 350,
  },
  {
    id: 'f8',
    name: 'ลายเส้น B',
    collection_id: '2',
    image_urls: [
      '/placeholder.svg?height=300&width=300',
      '/placeholder.svg?height=300&width=300',
    ],
    price_min: 280,
    price_max: 380,
  },
]
