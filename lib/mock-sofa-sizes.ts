export interface SofaSize {
  value: string
  label: string
}

export let sofaSizes: SofaSize[] = [
  { value: "S (90-140 cm)", label: "S (90-140 cm) - 1 ที่นั่ง" },
  { value: "M (145-185 cm)", label: "M (145-185 cm) - 2 ที่นั่ง" },
  { value: "L (190-230 cm)", label: "L (190-230 cm) - 3 ที่นั่ง" },
  { value: "XL (235-300 cm)", label: "XL (235-300 cm) - 4+ ที่นั่ง" },
]

export function loadSofaSizes() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('sofaSizes')
    if (stored) sofaSizes = JSON.parse(stored)
  }
}

export function saveSofaSizes(items: SofaSize[]) {
  sofaSizes = items
  if (typeof window !== 'undefined') {
    localStorage.setItem('sofaSizes', JSON.stringify(items))
  }
}
