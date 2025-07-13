"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { mockOgImages, setOgImage } from "@/lib/mock-og-images"

interface OgForm { slug: string; url: string }

export default function AdminOgImagePage() {
  const [items, setItems] = useState([...mockOgImages])
  const [open, setOpen] = useState(false)
  const form = useForm<OgForm>({ defaultValues: { slug: "", url: "" } })

  const handleSubmit = (values: OgForm) => {
    setOgImage(values.slug, values.url)
    setItems([...mockOgImages])
    setOpen(false)
    form.reset()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Link href="/admin/dashboard">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">ตั้งค่าภาพ OG</h1>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { form.reset(); setOpen(true) }}>
                <Plus className="mr-2 h-4 w-4" />ตั้งค่า
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader><DialogTitle>ตั้งค่าภาพ OG</DialogTitle></DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField name="slug" render={({ field }) => (
                    <FormItem><FormLabel>Slug</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                  )} />
                  <FormField name="url" render={({ field }) => (
                    <FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                  )} />
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" type="button" onClick={() => setOpen(false)}>ยกเลิก</Button>
                    <Button type="submit">บันทึก</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader><CardTitle>รายการภาพ OG</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Slug</TableHead>
                  <TableHead>URL</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((i) => (
                  <TableRow key={i.slug}>
                    <TableCell>{i.slug}</TableCell>
                    <TableCell>{i.url}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
