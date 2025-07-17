import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/buttons/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/modals/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/inputs/input"
import type { Collection } from "@/types/collection"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultValues: Collection | null
  onSave: (values: Collection) => void
}

export default function CollectionFormDialog({ open, onOpenChange, defaultValues, onSave }: Props) {
  const form = useForm<Collection>({
    defaultValues: {
      id: "",
      name: "",
      slug: "",
      description: "",
      priceRange: "",
      images: [],
    },
  })

  useEffect(() => {
    if (defaultValues) form.reset(defaultValues)
    else form.reset({ id: "", name: "", slug: "", description: "", priceRange: "", images: [] })
  }, [defaultValues])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{defaultValues ? "แก้ไขคอลเลกชัน" : "เพิ่มคอลเลกชันใหม่"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(v => onSave(v))} className="space-y-4">
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อคอลเลกชัน</FormLabel>
                  <FormControl>
                    <Input placeholder="ชื่อคอลเลกชัน" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="slug" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>คำอธิบาย</FormLabel>
                  <FormControl>
                    <Input placeholder="คำอธิบาย" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="priceRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ช่วงราคา</FormLabel>
                  <FormControl>
                    <Input placeholder="เช่น ฿100 - ฿300" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>รูปทั้งหมด (คั่นด้วย comma)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="url1,url2"
                      value={field.value.join(',')}
                      onChange={e => field.onChange(e.target.value.split(','))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)} type="button">
                ยกเลิก
              </Button>
              <Button type="submit">บันทึก</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
