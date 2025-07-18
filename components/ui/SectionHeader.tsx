import { cn } from "@/lib/utils"

interface Props {
  title: string
  description?: string
  className?: string
}

export default function SectionHeader({ title, description, className }: Props) {
  return (
    <div className={cn("space-y-1", className)}>
      <h2 className="text-xl font-semibold">{title}</h2>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  )
}
