"use client"
import type React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/inputs/input"

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (value: string) => void
  handleSearch: (e: React.FormEvent) => void
  className?: string
  autoFocus?: boolean
}

export function SearchBar({
  searchQuery,
  setSearchQuery,
  handleSearch,
  className,
  autoFocus,
}: SearchBarProps) {
  return (
    <form onSubmit={handleSearch} className={`relative${className ? ` ${className}` : ""}`}> 
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="ค้นหาสินค้า..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-8"
        autoFocus={autoFocus}
      />
    </form>
  )
}
