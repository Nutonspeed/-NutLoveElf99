"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/buttons/button'
import { Badge } from '@/components/ui/badge'
import { FileText, Gift, Check, Eye, Edit, Printer, Copy } from 'lucide-react'
import { toast } from 'sonner'
import type { AdminBill } from '@/mock/bills'

interface BillItemActionsProps {
  bill: AdminBill
  onEdit: () => void
}

export default function BillItemActions({ bill, onEdit }: BillItemActionsProps) {
  const handlePrint = () => {
    console.log('print invoice', bill.id)
    toast.success('พิมพ์ใบแจ้งหนี้ (mock)')
  }

  const handleConfirm = () => {
    console.log('confirm bill', bill.id)
    toast.success('ยืนยันบิลแล้ว (mock)')
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link href={`/bill/${bill.id}`} className="no-underline">
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4" /> ดูบิล
        </Button>
      </Link>
      <Link href={`/receipt/${bill.id}/print`} className="no-underline" title="พิมพ์ใบเสร็จ">
        <Button variant="outline" size="sm">
          <Printer className="h-4 w-4" />
        </Button>
      </Link>
      <Link href={`/admin/bill/create?from=${bill.id}`} className="no-underline" title="ทำซ้ำบิล">
        <Button variant="outline" size="sm">
          <Copy className="h-4 w-4" />
        </Button>
      </Link>
      <Button variant="outline" size="sm" onClick={onEdit}>
        <Edit className="h-4 w-4" /> แก้ไข
      </Button>
      {bill.status === 'pending' && (
        <Button variant="outline" size="sm" onClick={handleConfirm}>
          <Check className="h-4 w-4" /> ✅ ยืนยันบิล
        </Button>
      )}
      {bill.status === 'shipped' && bill.tags.includes('COD') && (
        <Button variant="outline" size="sm" onClick={handlePrint}>
          <FileText className="h-4 w-4" /> 📄 พิมพ์ใบแจ้งหนี้
        </Button>
      )}
      {bill.tags.includes('VIP') && (
        <Badge variant="secondary" className="flex items-center">
          <Gift className="h-3 w-3 mr-1" /> 🎁 ลูกค้า VIP
        </Badge>
      )}
    </div>
  )
}
