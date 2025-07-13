"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { mockRedirects } from "@/lib/mock-redirects"

export default function GoPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  useEffect(() => {
    const entry = mockRedirects.find((r) => r.slug === params.slug)
    if (entry) {
      router.push(entry.url)
    } else {
      router.replace("/not-found")
    }
  }, [params.slug, router])
  return null
}
