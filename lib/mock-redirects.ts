export interface RedirectEntry {
  slug: string
  url: string
}

export let mockRedirects: RedirectEntry[] = [
  { slug: "home", url: "/" },
]

export function loadMockRedirects() {
  if (typeof window === "undefined") return
  const stored = localStorage.getItem("mock-redirects")
  if (stored) mockRedirects = JSON.parse(stored)
}

export function saveMockRedirects() {
  if (typeof window === "undefined") return
  localStorage.setItem("mock-redirects", JSON.stringify(mockRedirects))
}

export function addRedirect(entry: RedirectEntry) {
  mockRedirects.push(entry)
  saveMockRedirects()
}

export function deleteRedirect(slug: string) {
  mockRedirects = mockRedirects.filter((r) => r.slug !== slug)
  saveMockRedirects()
}
