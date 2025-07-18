export interface Campaign {
  id: string
  name: string
  type: 'banner' | 'flash-sale'
  start: string
  end: string
}

const STORAGE_KEY = 'campaignConditions'
export let campaigns: Campaign[] = []

export function loadCampaigns() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) campaigns = JSON.parse(stored)
  }
}

export function addCampaign(c: Campaign) {
  campaigns.push(c)
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns))
  }
}

export function removeCampaign(id: string) {
  campaigns = campaigns.filter(c => c.id !== id)
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns))
  }
}
