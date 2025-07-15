import { supabase } from './supabase'
import type { Collection, CollectionData } from '@/types/collection'

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

export function loadCollections(): Collection[] {
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
  version: 1,
  guide: [],
  history: [],
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
    version: 1,
    guide: [],
    history: [],
  })) as Collection[]
}

export function addCollection(
  data: Omit<CollectionData, 'id' | 'version' | 'guide' | 'guideAddedBy'>,
  admin = 'admin@mock',
): Collection {
  const list = loadCollections()
  const base = slugify(data.slug || data.name)
  let slug = base
  let i = 1
  while (list.some((c) => c.slug === slug)) {
    slug = `${base}-${i++}`
  }
  const newData: CollectionData = {
    ...data,
    slug,
    id: Date.now().toString(),
    version: 1,
    guide: [],
  }
  const newCollection: Collection = {
    ...newData,
    history: [
      { version: 1, admin, timestamp: new Date().toISOString(), data: newData },
    ],
  }
  list.push(newCollection)
  saveCollections(list)
  return newCollection
}

export function updateCollection(
  id: string,
  data: Partial<CollectionData>,
  admin = 'admin@mock',
): Collection | undefined {
  const list = loadCollections()
  const idx = list.findIndex((c) => c.id === id)
  if (idx === -1) return undefined
  const current = list[idx]
  const snapshot: CollectionData = { ...current }
  current.history.push({
    version: current.version,
    admin,
    timestamp: new Date().toISOString(),
    data: snapshot,
  })
  Object.assign(current, data)
  current.version += 1
  if (data.guide) current.guideAddedBy = admin
  list[idx] = current
  saveCollections(list)
  return current
}

export function revertCollection(id: string, admin = 'admin@mock'): Collection | undefined {
  const list = loadCollections()
  const idx = list.findIndex((c) => c.id === id)
  if (idx === -1) return undefined
  const current = list[idx]
  const prev = current.history.pop()
  if (!prev) return current
  const snapshot: CollectionData = { ...current }
  current.history.push({
    version: current.version,
    admin,
    timestamp: new Date().toISOString(),
    data: snapshot,
  })
  Object.assign(current, prev.data)
  current.version = prev.version
  list[idx] = current
  saveCollections(list)
  return current
}
