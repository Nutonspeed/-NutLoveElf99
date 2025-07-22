"use client"
import { useEffect, useState } from "react"
import { getConfig } from "@/core/mock/store"
import type { LayoutComponent, ThemeName } from "@/types/storefront"
import { HeroBannerSection } from "@/components/HeroBannerSection"
import { Footer } from "@/components/footer"

function renderItem(item: LayoutComponent) {
  switch (item.type) {
    case "banner":
      return <HeroBannerSection key={item.id} />
    case "product":
      return (
        <section key={item.id} className="p-8 text-center bg-gray-50">
          Product List (mock)
        </section>
      )
    case "cta":
      return (
        <section key={item.id} className="p-8 text-center bg-blue-600 text-white">
          CTA Section (mock)
        </section>
      )
    case "review":
      return (
        <section key={item.id} className="p-8 text-center bg-gray-100">
          Review Section (mock)
        </section>
      )
    default:
      return null
  }
}

export default function ThemePreviewPage() {
  const [layout, setLayout] = useState<LayoutComponent[]>([])
  const [themes, setThemes] = useState<ThemeName[]>([])
  const [selected, setSelected] = useState<ThemeName>("light")

  useEffect(() => {
    const cfg = getConfig()
    setLayout(cfg.layout)
  }, [])

  useEffect(() => {
    fetch("/mock/store/theme-preview.json")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setThemes(data as ThemeName[])
          setSelected((data[0] || "light") as ThemeName)
        } else if (data.theme) {
          setThemes(["light", "dark", "soft", "neon"])
          setSelected(data.theme as ThemeName)
        }
      })
      .catch(() => setThemes(["light", "dark", "soft", "neon"]))
  }, [])

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Theme Preview</h1>
      <select
        className="border p-1 rounded"
        value={selected}
        onChange={(e) => setSelected(e.target.value as ThemeName)}
      >
        {(themes.length ? themes : ["light", "dark", "soft", "neon"]).map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <div className="border rounded p-4 space-y-4">
        {layout.map(renderItem)}
        <Footer />
      </div>
    </div>
  )
}
