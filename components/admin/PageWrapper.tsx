"use client"

import type { ReactNode } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export interface BreadcrumbEntry {
  title: string
  href?: string
}

interface PageWrapperProps {
  title: string
  description?: string
  breadcrumb?: BreadcrumbEntry[]
  children: ReactNode
}

export default function PageWrapper({
  title,
  description,
  breadcrumb,
  children,
}: PageWrapperProps) {
  return (
    <div className="space-y-4">
      {breadcrumb && breadcrumb.length > 0 && (
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumb.map((b, idx) => (
              <>
                <BreadcrumbItem key={idx}>
                  {b.href ? (
                    <BreadcrumbLink href={b.href}>{b.title}</BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{b.title}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {idx < breadcrumb.length - 1 && <BreadcrumbSeparator key={`s-${idx}`} />}
              </>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </header>
      {children}
    </div>
  )
}
