"use client"
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/modals/dialog'
import { Badge } from '@/components/ui/badge'
import type { Customer } from '@/lib/mock-customers'
import { useCustomerInsights } from '@/hooks/useCustomerInsights'

export default function CustomerPopup({ customer, children }:{ customer: Customer; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const insight = useCustomerInsights(customer.name)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{customer.name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            {customer.phone && <p>📞 {customer.phone}</p>}
            {customer.email && <p>📧 {customer.email}</p>}
            {customer.tags?.length && (
              <div className="flex flex-wrap gap-1">
                {customer.tags.map(t => (
                  <Badge key={t} variant="secondary">{t}</Badge>
                ))}
              </div>
            )}
            {customer.note && <p className="text-muted-foreground">{customer.note}</p>}
          </div>
          <div className="space-y-1">
            <p>บิลทั้งหมด <Badge variant="secondary">{insight.billCount}</Badge></p>
            {insight.lastPurchase && (
              <p>ล่าสุด {new Date(insight.lastPurchase).toLocaleDateString('th-TH')}</p>
            )}
            {insight.commonTags.length > 0 && (
              <p className="flex flex-wrap gap-1">{insight.commonTags.map(t => (
                <Badge key={t} variant="outline">{t}</Badge>
              ))}</p>
            )}
            {insight.commonStatus && (
              <p>สถานะบ่อยสุด <Badge variant="secondary">{insight.commonStatus}</Badge></p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
