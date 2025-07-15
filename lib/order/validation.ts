import { z } from "zod"
import type { OrderItem, ShippingStatus } from "@/types/order"

export const orderItemSchema = z.object({
  id: z.string(),
  productName: z.string(),
  quantity: z.number().min(1),
  price: z.number().min(0),
  size: z.string().optional(),
  pattern: z.string().optional(),
  color: z.string().optional(),
  discount: z.number().optional(),
  notes: z.string().optional(),
  image: z.string().optional(),
})

export const orderFormSchema = z.object({
  customerName: z.string().min(1),
  customerPhone: z.string().min(1),
  items: z.array(orderItemSchema),
  discount: z.number(),
  deposit: z.number(),
  total: z.number(),
  totalDue: z.number(),
  note: z.string().optional(),
  shipping_status: z.custom<ShippingStatus>(),
  delivery_method: z.string().optional(),
  tracking_number: z.string().optional(),
  shipping_fee: z.number().optional(),
  shipping_date: z.string().optional(),
  delivery_note: z.string().optional(),
})

export type OrderFormInput = z.infer<typeof orderFormSchema>
