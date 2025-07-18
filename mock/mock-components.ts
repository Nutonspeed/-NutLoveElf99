import type { ComponentType } from "react"
import { Button } from "@/components/ui/buttons/button"
import { Badge } from "@/components/ui/badge"
import BillPreview from "@/components/BillPreview"
import { mockOrders } from "@/lib/mock-orders"

export interface MockComponent {
  name: string
  Component: ComponentType<any>
  props?: Record<string, any>
}

export const mockComponents: MockComponent[] = [
  {
    name: "Button",
    Component: Button,
    props: { children: "ตัวอย่างปุ่ม" },
  },
  {
    name: "Badge",
    Component: Badge,
    props: { children: "ตัวอย่าง Badge" },
  },
  {
    name: "BillPreview",
    Component: BillPreview,
    props: { order: mockOrders[0] },
  },
]
