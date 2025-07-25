"use client"
import { Card, CardContent } from "@/components/ui/cards/card"
import clsx from "clsx"
import { LucideIcon } from "lucide-react"
import { HTMLAttributes, ReactNode } from "react"

interface DashboardCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  value?: ReactNode
  icon?: LucideIcon
  href?: string
  children?: ReactNode
}

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  href,
  children,
  className,
  ...props
}: DashboardCardProps) {
  const content = (
    <Card className={clsx("min-w-0", className)} {...props}>
      <CardContent className="p-4 flex items-center justify-between gap-2">
        <div className="space-y-1">
          <p className="text-sm font-medium">{title}</p>
          {value !== undefined && (
            <p className="text-xl font-bold">{value}</p>
          )}
          {children}
        </div>
        {Icon && <Icon className="h-6 w-6 text-muted-foreground" />}
      </CardContent>
    </Card>
  )
  if (href) return <a href={href}>{content}</a>
  return content
}
