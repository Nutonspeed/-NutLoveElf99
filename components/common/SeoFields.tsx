"use client"
import { Input } from "@/components/ui/inputs/input"
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"

export function SeoFields() {
  return (
    <>
      <FormField
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel>แท็ก</FormLabel>
            <FormControl>
              <Input placeholder="tag1,tag2" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name="seoDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>คำอธิบาย SEO</FormLabel>
            <FormControl>
              <Input placeholder="คำอธิบาย" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )
}
