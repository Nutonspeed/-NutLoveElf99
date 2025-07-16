const tokens = new Set<string>()

export function generatePrivateSlug(): string {
  const slug = `pv-${Math.random().toString(36).slice(2, 8)}`
  tokens.add(slug)
  return slug
}

export function isValidPrivateSlug(slug: string): boolean {
  return tokens.has(slug)
}
