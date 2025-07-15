"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useMemo } from "react"
import { Input } from "@/components/ui/inputs/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/buttons/button"

interface Fabric {
  color?: string
  category?: string
  collectionSlug?: string
}

export function FabricsFilters({ fabrics }: { fabrics: Fabric[] }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const q = searchParams.get('q') || ''
  const colors = searchParams.get('color')?.split(',').filter(Boolean) || []
  const categories = searchParams.get('category')?.split(',').filter(Boolean) || []
  const collections = searchParams.get('collection')?.split(',').filter(Boolean) || []

  const allColors = useMemo(() => Array.from(new Set(fabrics.map(f => f.color).filter(Boolean))), [fabrics]) as string[]
  const allCategories = useMemo(() => Array.from(new Set(fabrics.map(f => f.category).filter(Boolean))), [fabrics]) as string[]
  const allCollections = useMemo(() => Array.from(new Set(fabrics.map(f => f.collectionSlug).filter(Boolean))), [fabrics]) as string[]

  const update = (key: string, values: string[]) => {
    const params = new URLSearchParams(searchParams.toString())
    if (values.length) {
      params.set(key, values.join(','))
    } else {
      params.delete(key)
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="space-y-4 mb-6">
      <Input
        placeholder="ค้นหา..."
        defaultValue={q}
        onBlur={(e) => {
          const val = e.target.value.trim()
          const params = new URLSearchParams(searchParams.toString())
          if (val) params.set('q', val); else params.delete('q')
          router.push(`${pathname}?${params.toString()}`)
        }}
      />
      <div className="flex flex-wrap gap-4">
        {allColors.map(c => (
          <label key={c} className="flex items-center space-x-2">
            <Checkbox
              checked={colors.includes(c)}
              onCheckedChange={checked => {
                const next = checked ? [...colors, c] : colors.filter(x => x!==c)
                update('color', next)
              }}
            />
            <span>{c}</span>
          </label>
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {allCategories.map(c => (
          <label key={c} className="flex items-center space-x-2">
            <Checkbox
              checked={categories.includes(c)}
              onCheckedChange={checked => {
                const next = checked ? [...categories, c] : categories.filter(x => x!==c)
                update('category', next)
              }}
            />
            <span>{c}</span>
          </label>
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {allCollections.map(c => (
          <label key={c} className="flex items-center space-x-2">
            <Checkbox
              checked={collections.includes(c)}
              onCheckedChange={checked => {
                const next = checked ? [...collections, c] : collections.filter(x => x!==c)
                update('collection', next)
              }}
            />
            <span>{c}</span>
          </label>
        ))}
      </div>
      {(colors.length>0||categories.length>0||collections.length>0||q) && (
        <Button variant="outline" onClick={() => router.push(pathname)}>ล้างตัวกรอง</Button>
      )}
    </div>
  )
}
