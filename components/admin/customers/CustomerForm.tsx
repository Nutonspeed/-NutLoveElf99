"use client"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/inputs/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/buttons/button'

const schema = z.object({
  name: z.string().min(1, 'กรุณากรอกชื่อ'),
  phone: z.string().min(1, 'กรุณากรอกเบอร์โทร'),
  tags: z.string().optional(),
  note: z.string().optional(),
})

export type CustomerFormValues = z.infer<typeof schema>

export default function CustomerForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues?: Partial<CustomerFormValues>
  onSubmit: (values: CustomerFormValues & { tags: string[] }) => void
}) {
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      phone: defaultValues?.phone ?? '',
      tags: defaultValues?.tags ?? '',
      note: defaultValues?.note ?? '',
    },
  })

  const handleSubmit = (values: CustomerFormValues) => {
    onSubmit({ ...values, tags: values.tags ? values.tags.split(',').map(t => t.trim()).filter(Boolean) : [] })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ชื่อ</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>เบอร์โทร</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>แท็ก (คั่นด้วย comma)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>หมายเหตุ</FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-2 flex justify-end">
          <Button type="submit">บันทึก</Button>
        </div>
      </form>
    </Form>
  )
}
