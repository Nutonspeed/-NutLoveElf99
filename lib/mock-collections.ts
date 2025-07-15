import { supabase } from './supabase'

const STORAGE_KEY = 'admin-collections'

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '')
}

function loadCollections(): Collection[] {
  if (typeof window === 'undefined') return mockCollections
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Collection[]) : mockCollections
  } catch {
    return mockCollections
  }
}

function saveCollections(list: Collection[]) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {}
}

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

export const mockCollections: Collection[] = Array.from({ length: 40 }, (_, i) => ({
  id: String(i + 1),
  slug: `col-${i + 1}`,
  name: `คอลเลกชัน #${i + 1}`,
  priceRange: '',
  description: `ลายผ้าในชุด ${i + 1}`,
  banner: '/placeholder.jpg',
  tags: ['tag-a', 'tag-b'],
  images: [
    '/placeholder.jpg',
    '/placeholder.jpg',
    '/placeholder.jpg',
    '/placeholder.jpg',
  ],
}))

export async function getCollections(): Promise<Collection[]> {
  if (!supabase) {
    return Promise.resolve(loadCollections())
  }
  const { data, error } = await supabase
    .from('collections')
    .select('id, name, slug, price_range, description, banner, tags, all_images')
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
    banner: c.banner,
    tags: c.tags || [],
    images: c.all_images || [],
  })) as Collection[]
}

export function addCollection(data: Omit<Collection, 'id'>): Collection {
  const list = loadCollections()
  const base = slugify(data.slug || data.name)
  let slug = base
  let i = 1
  while (list.some((c) => c.slug === slug)) {
    slug = `${base}-${i++}`
  }
  const newCollection: Collection = {
    ...data,
    slug,
    id: Date.now().toString(),
  }
  list.push(newCollection)
  saveCollections(list)
  return newCollection
}
