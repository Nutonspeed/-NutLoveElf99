"use client"

import { usePathname } from 'next/navigation'
import type { BreadcrumbItem, RouteMeta } from '@/lib/route-metadata'
import { routeMeta } from '@/lib/route-metadata'

function matchPath(pattern: string, path: string): [Record<string,string>, boolean] {
  const keys: string[] = []
  const regex = new RegExp('^' + pattern.replace(/:([^/]+)/g, (_, k) => {
    keys.push(k)
    return '([^/]+)'
  }) + '$')
  const m = path.match(regex)
  if (!m) return [{}, false]
  const params: Record<string,string> = {}
  keys.forEach((k,i) => { params[k] = m[i+1] })
  return [params, true]
}

function fill(pattern: string, params: Record<string,string>) {
  return pattern.replace(/:([^/]+)/g, (_, k) => params[k] ?? '')
}

export function useRouteInfo(): { title: string; category: string; breadcrumb: BreadcrumbItem[] } {
  const pathname = usePathname()

  for (const meta of routeMeta) {
    const [params, ok] = matchPath(meta.path, pathname)
    if (ok) {
      const breadcrumb = meta.breadcrumb.map(b => ({
        label: fill(b.label, params),
        href: fill(b.href, params),
      }))
      return { title: meta.title, category: meta.category, breadcrumb }
    }
  }

  return { title: '', category: '', breadcrumb: [] }
}
