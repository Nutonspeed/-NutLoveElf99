export interface OgImage {
  slug: string
  url: string
}

export let mockOgImages: OgImage[] = [
  { slug: "default", url: "/placeholder.svg?text=og" },
]

export function loadMockOgImages() {
  if (typeof window === "undefined") return
  const stored = localStorage.getItem("mock-og-images")
  if (stored) mockOgImages = JSON.parse(stored)
}

export function saveMockOgImages() {
  if (typeof window === "undefined") return
  localStorage.setItem("mock-og-images", JSON.stringify(mockOgImages))
}

export function setOgImage(slug: string, url: string) {
  const existing = mockOgImages.find((o) => o.slug === slug)
  if (existing) {
    existing.url = url
  } else {
    mockOgImages.push({ slug, url })
  }
  saveMockOgImages()
}
