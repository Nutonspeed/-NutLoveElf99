"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { getDashboardMeta } from '@/lib/dashboardRoutes'

export default function DashboardBreadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  let path = ''
  const crumbs = segments.map((segment) => {
    path += `/${segment}`
    return { path, segment, meta: getDashboardMeta(path) }
  })

  if (!pathname.startsWith('/dashboard')) return null

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        {crumbs.map((c, i) => (
          <BreadcrumbItem key={c.path}>
            {i < crumbs.length - 1 ? (
              <>
                <BreadcrumbLink asChild>
                  <Link href={c.path}>{c.meta?.title ?? c.segment}</Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            ) : (
              <BreadcrumbPage>{c.meta?.title ?? c.segment}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
