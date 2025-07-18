"use client"
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'
import { Textarea } from '@/components/ui/textarea'
import { heroBanner, loadHeroBanner, setHeroBanner } from '@/lib/mock-hero-banner'
import { HeroBannerSection } from '@/components/HeroBannerSection'

export default function BannerEditorPage() {
  const [banner, setBannerState] = useState(heroBanner)

  useEffect(() => {
    loadHeroBanner()
    setBannerState(heroBanner)
  }, [])

  const save = () => {
    setHeroBanner(banner)
    setBannerState({ ...banner })
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold">Promotion Banner Editor</h1>
      <Card>
        <CardHeader>
          <CardTitle>Edit Banner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Title" value={banner.title} onChange={e=>setBannerState({ ...banner, title:e.target.value })} />
          <Textarea placeholder="Subtitle" value={banner.subtitle} onChange={e=>setBannerState({ ...banner, subtitle:e.target.value })} />
          <Input placeholder="Image URL" value={banner.image} onChange={e=>setBannerState({ ...banner, image:e.target.value })} />
          <Button onClick={save}>Save</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <HeroBannerSection />
        </CardContent>
      </Card>
    </div>
  )
}
