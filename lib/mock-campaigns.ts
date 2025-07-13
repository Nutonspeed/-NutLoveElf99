export interface Campaign {
  slug: string
  title: string
  subtitle: string
  bannerUrl: string
  productIds: string[]
}

export let mockCampaigns: Campaign[] = [
  {
    slug: "summer-sale",
    title: "Summer Sale",
    subtitle: "ลดพิเศษรับหน้าร้อน",
    bannerUrl: "/placeholder.svg?text=summer",
    productIds: ["1", "2"],
  },
]

export function loadMockCampaigns() {
  if (typeof window === "undefined") return
  const stored = localStorage.getItem("mock-campaigns")
  if (stored) mockCampaigns = JSON.parse(stored)
}

export function saveMockCampaigns() {
  if (typeof window === "undefined") return
  localStorage.setItem("mock-campaigns", JSON.stringify(mockCampaigns))
}

export function addCampaign(data: Campaign) {
  mockCampaigns.push(data)
  saveMockCampaigns()
}

export function updateCampaign(slug: string, data: Partial<Campaign>) {
  mockCampaigns = mockCampaigns.map((c) =>
    c.slug === slug ? { ...c, ...data } : c,
  )
  saveMockCampaigns()
}

export function deleteCampaign(slug: string) {
  mockCampaigns = mockCampaigns.filter((c) => c.slug !== slug)
  saveMockCampaigns()
}
