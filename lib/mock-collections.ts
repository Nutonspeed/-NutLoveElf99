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
    const parsed = raw ? (JSON.parse(raw) as Collection[]) : mockCollections
    return parsed.map((c) => ({ ...c, tags: c.tags || [] }))
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
  images: string[]
  tags?: string[]
}

export const mockCollections: Collection[] = Array.from({ length: 40 }, (_, i) => ({
  id: String(i + 1),
  slug: `col-${i + 1}`,
  name: `คอลเลกชัน #${i + 1}`,
  priceRange: '',
  description: `ลายผ้าในชุด ${i + 1}`,
  images: [
    '/placeholder.jpg',
    '/placeholder.jpg',
    '/placeholder.jpg',
    '/placeholder.jpg',
  ],
  tags: [],
}))

export async function getCollections(): Promise<Collection[]> {
  if (!supabase) {
    return Promise.resolve(loadCollections())
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
    tags: data.tags || [],
  }
  list.push(newCollection)
  saveCollections(list)
  return newCollection
}

export function addCollectionTag(slug: string, tag: string) {
  const list = loadCollections()
  const col = list.find((c) => c.slug === slug)
  if (!col) return
  col.tags = Array.from(new Set([...(col.tags || []), tag]))
  saveCollections(list)
}

export function removeCollectionTag(slug: string, tag: string) {
  const list = loadCollections()
  const col = list.find((c) => c.slug === slug)
  if (!col || !col.tags) return
  col.tags = col.tags.filter((t) => t !== tag)
  saveCollections(list)
}
