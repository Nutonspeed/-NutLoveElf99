"use client"
import type { Collection } from "@/types/collection"
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import { UseFormReturn } from "react-hook-form"
import { SeoFields } from "@/components/common/SeoFields"
import { Toggle } from "@/components/common/Toggle"

export interface CollectionFormProps {
  form: UseFormReturn<Collection & { tags?: string; seoDescription?: string; featured?: boolean }>
  onSubmit: (values: Collection & { tags?: string; seoDescription?: string; featured?: boolean }) => void
}

export function CollectionForm({ form, onSubmit }: CollectionFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  onChange={(e) => field.onChange(e.target.value.split(','))}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <SeoFields />
        <FormField
          name="featured"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center space-x-2">
                <span>แนะนำ</span>
                <FormControl>
                  <Toggle checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormLabel>
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-4">
          <Button type="submit">บันทึก</Button>
        </div>
      </form>
    </Form>
  )
}
