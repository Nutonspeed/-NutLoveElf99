export interface CuratedGroup {
  slug: string
  title: string
  coverUrl: string
  productIds: string[]
}

export let mockCurated: CuratedGroup[] = [
  {
    slug: "best",
    title: "สินค้าขายดี",
    coverUrl: "/placeholder.svg?text=best",
    productIds: ["1", "3"],
  },
]

export function loadMockCurated() {
  if (typeof window === "undefined") return
  const stored = localStorage.getItem("mock-curated")
  if (stored) mockCurated = JSON.parse(stored)
}

export function saveMockCurated() {
  if (typeof window === "undefined") return
  localStorage.setItem("mock-curated", JSON.stringify(mockCurated))
}

export function addCurated(data: CuratedGroup) {
  mockCurated.push(data)
  saveMockCurated()
}

export function updateCurated(slug: string, data: Partial<CuratedGroup>) {
  mockCurated = mockCurated.map((c) => (c.slug === slug ? { ...c, ...data } : c))
  saveMockCurated()
}

export function deleteCurated(slug: string) {
  mockCurated = mockCurated.filter((c) => c.slug !== slug)
  saveMockCurated()
}
