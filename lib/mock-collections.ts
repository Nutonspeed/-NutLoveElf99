import { supabase } from './supabase'

export interface Collection {
  id: string
  name: string
  slug: string
  priceRange: string
  description: string
  images: string[]
}

export const mockCollections: Collection[] = [
  {
    id: '1',
    name: 'Cozy Earth',
    slug: 'cozy-earth',
    priceRange: '890–2190',
    description: 'ผ้านุ่มสบาย สไตล์มินิมอล',
    images: ['/images/035.jpg', '/images/036.jpg', '/images/037.jpg', '/images/038.jpg'],
  },
  {
    id: '2',
    name: 'Modern Loft',
    slug: 'modern-loft',
    priceRange: '990–1990',
    description: 'โทนเข้ม มีสไตล์',
    images: ['/images/039.jpg', '/images/040.jpg', '/images/041.jpg', '/images/042.jpg'],
  },
  {
    id: '3',
    name: 'Vintage Vibes',
    slug: 'vintage-vibes',
    priceRange: '890–2590',
    description: 'ลายวินเทจคลาสสิก',
    images: ['/images/043.jpg', '/images/044.jpg', '/images/045.jpg', '/images/046.jpg'],
  },
]

export async function getCollections(): Promise<Collection[]> {
  if (!supabase) {
    return Promise.resolve(mockCollections)
  }
  const { data, error } = await supabase
    .from('collections')
    .select('id, name, slug, price_range, description, all_images')
    .order('created_at', { ascending: false })

  if (error || !data) {
    console.error('Supabase fetch collections error', error)
    return mockCollections
  }

  return data.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    priceRange: c.price_range,
    description: c.description,
    images: c.all_images || [],
  })) as Collection[]
}
