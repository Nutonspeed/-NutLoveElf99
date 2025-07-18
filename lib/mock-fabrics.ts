import { supabase } from './supabase'

export interface Fabric {
  id: string
  name: string
  slug: string
  sku: string
  color: string
  price: number
  images: string[]
  collectionSlug: string
  availability: "available" | "out" | "discontinued"
}

export const mockFabrics: Fabric[] = [
  {
    id: 'f01',
    name: 'Soft Linen',
    slug: 'soft-linen',
    sku: 'FBC-001',
    color: 'ครีม',
    price: 990,
    images: ['/images/039.jpg', '/images/040.jpg'],
    collectionSlug: 'cozy-earth',
    availability: 'available',
  },
  {
    id: 'f02',
    name: 'Cozy Cotton',
    slug: 'cozy-cotton',
    sku: 'FBC-002',
    color: 'เทา',
    price: 1090,
    images: ['/images/041.jpg', '/images/042.jpg'],
    collectionSlug: 'cozy-earth',
    availability: 'out',
  },
  {
    id: 'f03',
    name: 'Velvet Dream',
    slug: 'velvet-dream',
    sku: 'FBC-003',
    color: 'น้ำเงิน',
    price: 1290,
    images: ['/images/043.jpg', '/images/044.jpg'],
    collectionSlug: 'modern-loft',
    availability: 'available',
  },
  {
    id: 'f04',
    name: 'Classic Stripe',
    slug: 'classic-stripe',
    sku: 'FBC-004',
    color: 'กรม',
    price: 1190,
    images: ['/images/045.jpg', '/images/046.jpg'],
    collectionSlug: 'modern-loft',
    availability: 'discontinued',
  },
  {
    id: 'f05',
    name: 'Floral Muse',
    slug: 'floral-muse',
    sku: 'FBC-005',
    color: 'ชมพู',
    price: 1090,
    images: ['/images/047.jpg', '/images/035.jpg'],
    collectionSlug: 'vintage-vibes',
    availability: 'out',
  },
]

export async function getFabrics() {
  if (!supabase) {
    return Promise.resolve(mockFabrics)
  }
  try {
    const { data, error } = await supabase.from('fabrics').select('*')
    if (error || !data) {
      console.error('Supabase fetch fabrics error', error)
      return mockFabrics
    }
    return data as Fabric[]
  } catch (err) {
    console.error('Supabase fetch fabrics unexpected error', err)
    return mockFabrics
  }
}
