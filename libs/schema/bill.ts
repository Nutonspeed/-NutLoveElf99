import { z } from 'zod'

export const BillItemSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().min(1),
  price: z.number().min(0),
})

export const BillSchema = z.object({
  customerName: z.string(),
  customerPhone: z.string().optional(),
  items: z.array(BillItemSchema),
  note: z.string().optional(),
  paymentMethod: z.enum(['cod', 'bank_transfer', 'promptpay', 'credit_card']),
  total: z.number(),
})

export type Bill = z.infer<typeof BillSchema>
