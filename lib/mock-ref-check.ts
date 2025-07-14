const STORAGE_KEY = 'submittedRefs'
let refs: string[] = []

if (typeof window !== 'undefined') {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    refs = stored ? JSON.parse(stored) : []
  } catch {}
}

export function addRef(ref: string) {
  refs.push(ref)
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(refs))
    } catch {}
  }
}

export function isDuplicateRef(ref: string): boolean {
  const duplicate = refs.includes(ref)
  if (duplicate) {
    console.warn('duplicate ref', ref)
  }
  return duplicate
}
