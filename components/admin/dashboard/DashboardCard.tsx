"use client"

import { Card, CardContent } from "@/components/ui/cards/card"
import { LucideIcon } from "lucide-react"
import clsx from "clsx"
import { HTMLAttributes, ReactNode } from "react"
import Link from "next/link"

interface DashboardCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  subtext?: string
  value?: ReactNode
  icon?: LucideIcon
  iconClassName?: string
  titleClassName?: string
  valueClassName?: string
  cardClassName?: string
  href?: string
  children?: ReactNode
}

export default function DashboardCard({
  title,
  subtext,
  value,
  icon: Icon,
  iconClassName,
  titleClassName,
  valueClassName,
  cardClassName,
  href,
  children,
  ...divProps
}: DashboardCardProps) {
  const card = (
    <Card className={cardClassName} {...divProps}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className={clsx("text-sm font-medium", titleClassName)}>{title}</p>
            {subtext && (
              <p className="text-xs text-muted-foreground mb-1">{subtext}</p>
            )}
            {value !== undefined && (
              <p className={clsx("text-2xl font-bold", valueClassName)}>
                {value}
              </p>
            )}
            {value === undefined && !children && (
              <p className={clsx("text-2xl font-bold", valueClassName)}>-</p>
            )}
          </div>
          {Icon && <Icon className={clsx("h-8 w-8", iconClassName)} />}
        </div>
        {children && <div className="mt-4">{children}</div>}
      </CardContent>
    </Card>
  )

  return href ? <Link href={href}>{card}</Link> : card
}
