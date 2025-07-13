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
import { mockRedirects, addRedirect, deleteRedirect } from "@/lib/mock-redirects"
import { RedirectLinkCard } from "@/components/RedirectLinkCard"

interface RedirectForm { slug: string; url: string }

export default function AdminRedirectsPage() {
  const [redirects, setRedirects] = useState([...mockRedirects])
  const [open, setOpen] = useState(false)
  const form = useForm<RedirectForm>({ defaultValues: { slug: "", url: "" } })

  const handleSubmit = (values: RedirectForm) => {
    addRedirect(values)
    setRedirects([...mockRedirects])
    form.reset()
    setOpen(false)
  }

  const handleDelete = (slug: string) => {
    deleteRedirect(slug)
    setRedirects([...mockRedirects])
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
            <h1 className="text-3xl font-bold">จัดการ Redirects</h1>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { form.reset(); setOpen(true) }}>
                <Plus className="mr-2 h-4 w-4" />เพิ่มลิงก์
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader><DialogTitle>เพิ่ม Redirect</DialogTitle></DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField name="slug" render={({ field }) => (
                    <FormItem><FormLabel>Slug</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                  )} />
                  <FormField name="url" render={({ field }) => (
                    <FormItem><FormLabel>URL</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
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
          <CardHeader><CardTitle>รายการ Redirects</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Slug</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead className="text-right">จัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {redirects.map((r) => (
                  <TableRow key={r.slug}>
                    <TableCell>/{r.slug}</TableCell>
                    <TableCell>{r.url}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="icon" onClick={() => handleDelete(r.slug)} className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 space-y-2">
              {redirects.map((r) => (
                <RedirectLinkCard key={r.slug} slug={r.slug} url={r.url} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
