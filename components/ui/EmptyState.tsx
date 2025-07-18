import { ReactNode } from "react"
import { cn } from "@/lib/utils"

export interface EmptyStateProps {
  icon?: ReactNode
  title?: ReactNode
  description?: ReactNode
  action?: ReactNode
  className?: string
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center text-center space-y-4 py-8", className)}>
      {icon && <div className="text-5xl">{icon}</div>}
      {title && <h2 className="text-lg font-semibold">{title}</h2>}
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {action}
    </div>
  )
}
