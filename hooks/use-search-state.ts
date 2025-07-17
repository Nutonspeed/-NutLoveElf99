"use client"

import { useState } from "react"

export function useSearchState() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return { searchQuery, setSearchQuery, isSearchOpen, setIsSearchOpen }
}
