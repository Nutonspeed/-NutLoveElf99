"use client"
import { Printer } from 'lucide-react'
import { Button, type ButtonProps } from '@/components/ui/buttons/button'
import { triggerPrint } from '@/lib/pdf/print'

export default function PrintButton({
  className,
  variant = 'outline',
  size = 'sm',
  label = 'Print Bill',
  ...props
}: Omit<ButtonProps, 'variant' | 'size' | 'children'> & {
  label?: string
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
}) {
  return (
    <Button
      onClick={triggerPrint}
      variant={variant}
      size={size}
      className={className}
      {...props}
    >
      <Printer className="h-4 w-4 mr-2" />
      {label}
    </Button>
  )
}
