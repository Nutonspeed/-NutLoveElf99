import { cn } from '@/lib/utils'

export interface ShippingLabelProps {
  name: string
  address: string
  phone: string
  orderId: string
  className?: string
}

export default function ShippingLabel({
  name,
  address,
  phone,
  orderId,
  className,
}: ShippingLabelProps) {
  return (
    <div
      className={cn(
        'border p-4 w-80 print:w-[100mm] print:h-[150mm] flex flex-col justify-between',
        className,
      )}
    >
      <div className="space-y-1 text-sm">
        <p className="font-bold text-lg">{name}</p>
        <p className="whitespace-pre-line">{address}</p>
        <p>โทร {phone}</p>
      </div>
      <p className="text-sm pt-2">Order ID: {orderId}</p>
    </div>
  )
}
