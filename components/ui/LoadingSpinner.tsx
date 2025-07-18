import { cn } from "@/lib/utils"

export default function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent",
        className,
      )}
    />
  )
}
