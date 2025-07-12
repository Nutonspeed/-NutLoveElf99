import { supabase } from './supabase'

export interface Fabric {
  id: string
  name: string
  slug: string
  color: string
  price: number
  images: string[]
}

export const mockFabrics: Fabric[] = [
  {
    id: 'f01',
    name: 'Soft Linen',
    slug: 'soft-linen',
    color: 'ครีม',
    price: 990,
    images: ['/images/039.jpg', '/images/040.jpg'],
  },
  {
    id: 'f02',
    name: 'Cozy Cotton',
    slug: 'cozy-cotton',
    color: 'เทา',
    price: 1090,
    images: ['/images/041.jpg', '/images/042.jpg'],
  },
  {
    id: 'f03',
    name: 'Velvet Dream',
    slug: 'velvet-dream',
    color: 'น้ำเงิน',
    price: 1290,
    images: ['/images/043.jpg', '/images/044.jpg'],
  },
  {
    id: 'f04',
    name: 'Classic Stripe',
    slug: 'classic-stripe',
    color: 'กรม',
    price: 1190,
    images: ['/images/045.jpg', '/images/046.jpg'],
  },
  {
    id: 'f05',
    name: 'Floral Muse',
    slug: 'floral-muse',
    color: 'ชมพู',
    price: 1090,
    images: ['/images/047.jpg', '/images/035.jpg'],
  },
]

export async function getFabrics() {
  if (!supabase) {
    return Promise.resolve(mockFabrics)
  }
  const { data, error } = await supabase.from('fabrics').select('*')
  if (error || !data) {
    console.error('Supabase fetch fabrics error', error)
    return mockFabrics
  }
  return data as Fabric[]
}
