export type TooltipSeenState = Record<string, boolean>

const STORAGE_KEY = 'tooltipSeenState'

export let tooltipSeenState: TooltipSeenState = {}

export function loadTooltipSeenState() {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) tooltipSeenState = JSON.parse(raw) as TooltipSeenState
  }
}

export function markTooltipSeen(id: string) {
  tooltipSeenState[id] = true
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tooltipSeenState))
  }
}

export function hasSeenTooltip(id: string): boolean {
  return !!tooltipSeenState[id]
}
