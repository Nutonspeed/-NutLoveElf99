"use client"

import { Card, CardContent } from "@/components/ui/cards/card"
import { LucideIcon } from "lucide-react"
import clsx from "clsx"
import { HTMLAttributes } from "react"
import Link from "next/link"

interface DashboardCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  value: React.ReactNode
  icon: LucideIcon
  iconClassName?: string
  titleClassName?: string
  valueClassName?: string
  cardClassName?: string
  href?: string
}

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  iconClassName,
  titleClassName,
  valueClassName,
  cardClassName,
  href,
  ...divProps
}: DashboardCardProps) {
  const card = (
    <Card className={cardClassName} {...divProps}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className={clsx("text-sm font-medium", titleClassName)}>{title}</p>
            <p className={clsx("text-2xl font-bold", valueClassName)}>
              {value ?? "-"}
            </p>
          </div>
          <Icon className={clsx("h-8 w-8", iconClassName)} />
        </div>
      </CardContent>
    </Card>
  )

  return href ? <Link href={href}>{card}</Link> : card
}
