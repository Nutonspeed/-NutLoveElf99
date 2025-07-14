export interface SofaSize {
  id: string
  customerId: string
  width: number
  depth: number
  height: number
  note?: string
  createdAt: string
}

export let sofaSizes: SofaSize[] = []

export function loadSofaSizes() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('sofaSizes')
    if (stored) {
      try {
        sofaSizes = JSON.parse(stored)
      } catch {
        sofaSizes = []
      }
    }
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('sofaSizes', JSON.stringify(sofaSizes))
  }
}

export function addSofaSize(customerId: string, data: Omit<SofaSize, 'id' | 'customerId' | 'createdAt'>): SofaSize {
  const entry: SofaSize = {
    id: Date.now().toString(),
    customerId,
    createdAt: new Date().toISOString(),
    ...data,
  }
  sofaSizes = [entry, ...sofaSizes]
  save()
  return entry
}

export function listSofaSizes(customerId: string): SofaSize[] {
  return sofaSizes.filter((s) => s.customerId === customerId)
}

export function updateSofaSize(id: string, data: Partial<Omit<SofaSize, 'id' | 'customerId' | 'createdAt'>>) {
  const idx = sofaSizes.findIndex((s) => s.id === id)
  if (idx !== -1) {
    sofaSizes[idx] = { ...sofaSizes[idx], ...data }
    save()
  }
}

export function removeSofaSize(id: string) {
  sofaSizes = sofaSizes.filter((s) => s.id !== id)
  save()
}
