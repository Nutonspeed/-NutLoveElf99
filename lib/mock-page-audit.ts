export interface PageAuditResult {
  url: string
  total: number
  assets: number
  render: number
  delay: number
}

export function simulatePageAudit(url: string): PageAuditResult | null {
  if (!url) return null
  // 20% chance to fail
  if (Math.random() < 0.2) return null
  const assets = Math.random() * 2000 + 500
  const render = Math.random() * 1000 + 300
  const delay = Math.random() * 500
  return {
    url,
    total: assets + render + delay,
    assets,
    render,
    delay,
  }
}
