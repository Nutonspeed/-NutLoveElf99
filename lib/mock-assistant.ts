export interface AssistantSuggestion {
  id: string
  text: string
}

const actions: string[] = []

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('assistantActions', JSON.stringify(actions))
  }
}

export function loadAssistantActions() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('assistantActions')
    if (stored) actions.splice(0, actions.length, ...JSON.parse(stored))
  }
}

export function getAssistantActions() {
  return actions
}

export function recordAssistantAction(text: string) {
  actions.unshift(text)
  if (actions.length > 5) actions.pop()
  save()
}

export function getAssistantSuggestions(input: string): AssistantSuggestion[] {
  if (!input.trim()) return []
  return Array.from({ length: 3 }).map((_, i) => ({
    id: `${Date.now()}-${i}`,
    text: `${input} suggestion ${i + 1}`,
  }))
}
