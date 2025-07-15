export interface FabricHistoryEntry {
  admin: string
  action: string
  timestamp: string
}

export interface FabricQA {
  slug: string
  qualityScore: number
  lastAdmin: string
  usage: string[]
  timeline: FabricHistoryEntry[]
  flagged: boolean
  previousImage?: string
}

export const mockFabricQA: Record<string, FabricQA> = {
  'soft-linen': {
    slug: 'soft-linen',
    qualityScore: 82,
    lastAdmin: 'admin1',
    usage: ['cozy-earth'],
    timeline: [
      { admin: 'admin1', action: 'initial upload', timestamp: new Date().toISOString() },
    ],
    flagged: false,
    previousImage: '/images/039.jpg',
  },
  'cozy-cotton': {
    slug: 'cozy-cotton',
    qualityScore: 88,
    lastAdmin: 'admin2',
    usage: ['cozy-earth'],
    timeline: [
      { admin: 'admin2', action: 'initial upload', timestamp: new Date().toISOString() },
    ],
    flagged: false,
    previousImage: '/images/041.jpg',
  },
  'velvet-dream': {
    slug: 'velvet-dream',
    qualityScore: 75,
    lastAdmin: 'admin1',
    usage: ['modern-loft'],
    timeline: [
      { admin: 'admin1', action: 'initial upload', timestamp: new Date().toISOString() },
    ],
    flagged: false,
    previousImage: '/images/043.jpg',
  },
}

export function checkImageIssues(_file: File) {
  return {
    blurred: Math.random() < 0.1,
    torn: Math.random() < 0.05,
    edgeDamage: Math.random() < 0.05,
  }
}

export function getFabricQA(slug: string): FabricQA | undefined {
  return mockFabricQA[slug]
}

export function updateFabricImage(slug: string, admin: string, url: string) {
  const record = mockFabricQA[slug] || {
    slug,
    qualityScore: 80,
    lastAdmin: admin,
    usage: [],
    timeline: [],
    flagged: false,
    previousImage: url,
  }
  record.lastAdmin = admin
  record.previousImage = url
  record.timeline.unshift({ admin, action: 'update image', timestamp: new Date().toISOString() })
  mockFabricQA[slug] = record
}

export function logFabricUsage(slug: string, collection: string) {
  const record = mockFabricQA[slug]
  if (!record) return
  if (!record.usage.includes(collection)) record.usage.push(collection)
}

export function flagFabric(slug: string) {
  const record = mockFabricQA[slug]
  if (record) record.flagged = true
}
