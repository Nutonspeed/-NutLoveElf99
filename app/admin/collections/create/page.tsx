"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { addCollection } from "@/lib/mock-collections"
import { useForm } from "react-hook-form"
import type { Collection } from "@/types/collection"
import { Form } from "@/components/ui/form"
import { CollectionForm } from "@/components/collection/CollectionForm"

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, "")
}

export default function CreateCollectionPage() {
  const router = useRouter()
  const form = useForm<Collection & { tags?: string; seoDescription?: string; featured?: boolean }>({
    defaultValues: { id: "", name: "", slug: "", description: "", priceRange: "", images: [] }
  })

  const name = form.watch('name')
  const slug = form.watch('slug')
  useEffect(() => {
    if (!name) return
    const auto = slugify(name)
    if (!slug || slug === slugify(slug)) {
      form.setValue('slug', auto)
    }
  }, [name])

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const raw = window.localStorage.getItem("uploaded-fabrics")
      if (raw) {
        const names = JSON.parse(raw) as string[]
        if (names.length > 1) {
          const base = `${names[0]} Collection`
          form.setValue('name', base)
          form.setValue('slug', slugify(base))
        }
      }
    } catch {}
  }, [])


  const handleSubmit = (values: Collection & { tags?: string; seoDescription?: string; featured?: boolean }) => {
    addCollection({
      name: values.name,
      slug: values.slug,
      description: values.description,
      priceRange: "",
      images: values.images,
    })
    router.push("/admin/collections")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin/collections">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">สร้างคอลเลกชันใหม่</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>ข้อมูลคอลเลกชัน</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <CollectionForm form={form} onSubmit={handleSubmit} />
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

