"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2, Edit, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { mockCampaigns, addCampaign, updateCampaign, deleteCampaign } from "@/lib/mock-campaigns"
import { mockProducts } from "@/lib/mock-products"

interface CampaignForm {
  slug: string
  title: string
  subtitle: string
  bannerUrl: string
  productIds: string
}

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState([...mockCampaigns])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<string | null>(null)
  const form = useForm<CampaignForm>({
    defaultValues: { slug: "", title: "", subtitle: "", bannerUrl: "", productIds: "" },
  })

  const handleSubmit = (values: CampaignForm) => {
    const data = {
      slug: values.slug,
      title: values.title,
      subtitle: values.subtitle,
      bannerUrl: values.bannerUrl,
      productIds: values.productIds.split(",").map((v) => v.trim()),
    }
    if (editing) {
      updateCampaign(editing, data)
      setCampaigns(mockCampaigns)
    } else {
      addCampaign(data)
      setCampaigns(mockCampaigns)
    }
    setOpen(false)
    setEditing(null)
    form.reset()
  }

  const handleEdit = (slug: string) => {
    const c = campaigns.find((c) => c.slug === slug)
    if (!c) return
    form.reset({
      slug: c.slug,
      title: c.title,
      subtitle: c.subtitle,
      bannerUrl: c.bannerUrl,
      productIds: c.productIds.join(","),
    })
    setEditing(slug)
    setOpen(true)
  }

  const handleDelete = (slug: string) => {
    deleteCampaign(slug)
    setCampaigns([...mockCampaigns])
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
            <h1 className="text-3xl font-bold">จัดการแคมเปญ</h1>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { form.reset(); setEditing(null); setOpen(true) }}>
                <Plus className="mr-2 h-4 w-4" />เพิ่มแคมเปญ
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader><DialogTitle>{editing ? "แก้ไข" : "เพิ่ม"} แคมเปญ</DialogTitle></DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField name="slug" render={({ field }) => (
                    <FormItem><FormLabel>Slug</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                  )} />
                  <FormField name="title" render={({ field }) => (
                    <FormItem><FormLabel>ชื่อ</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                  )} />
                  <FormField name="subtitle" render={({ field }) => (
                    <FormItem><FormLabel>คำโปรย</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                  )} />
                  <FormField name="bannerUrl" render={({ field }) => (
                    <FormItem><FormLabel>รูป Banner</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                  )} />
                  <FormField name="productIds" render={({ field }) => (
                    <FormItem><FormLabel>รหัสสินค้า (คั่นด้วย comma)</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
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
          <CardHeader><CardTitle>รายการแคมเปญ</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Slug</TableHead>
                  <TableHead>ชื่อ</TableHead>
                  <TableHead>คำโปรย</TableHead>
                  <TableHead className="text-right">จัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((c) => (
                  <TableRow key={c.slug}>
                    <TableCell>{c.slug}</TableCell>
                    <TableCell>{c.title}</TableCell>
                    <TableCell>{c.subtitle}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(c.slug)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(c.slug)} className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
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
