import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="p-4 space-y-4">
      <Skeleton className="h-8 w-32 mx-auto" />
      <Skeleton className="h-40 w-full" />
    </div>
  )
}
