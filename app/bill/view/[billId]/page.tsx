"use client"
import { useState, useEffect } from 'react'
import { getBillById } from '@/lib/data/bills'
import BillQRSection from '@/components/bill/BillQRSection'
import CustomerPaymentForm from '@/components/bill/CustomerPaymentForm'
import PaymentConfirmationCard from '@/components/bill/PaymentConfirmationCard'
import BillStatusTracker from '@/components/bill/BillStatusTracker'
import BillTimeline from '@/components/bill/BillTimeline'
import ShippingInfoCard from '@/components/bill/ShippingInfoCard'
import ReceiptCard from '@/components/bill/ReceiptCard'
import BillFooterActions from '@/components/bill/BillFooterActions'
import { formatDateThai } from '@/lib/formatDateThai'
import type { StoreProfile } from '@/lib/config'
import { getStoreProfile } from '@/lib/config'
import { useToast } from '@/hooks/use-toast'
import { calculateTotal } from '@/core/modules/bill'

export default function BillViewPage({ params }: { params: { billId: string } }) {
  const [bill, setBill] = useState<any | undefined>(undefined)
  const [editAddr, setEditAddr] = useState(false)
  const [address, setAddress] = useState('')
  const [editPhone, setEditPhone] = useState(false)
  const [phone, setPhone] = useState('')
  const [store, setStore] = useState<StoreProfile | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    getBillById(params.billId).then(b => {
      setBill(b)
      setAddress(b?.address || '')
      setPhone(b?.phone || '')
    })
    getStoreProfile().then(setStore)
  }, [params.billId])

  if (bill === undefined) {
    return <div className="p-4 text-center">Loading...</div>
  }

  if (!bill) {
    return (
      <div className="p-8 text-center text-red-600">ไม่พบบิลนี้</div>
    )
  }

  const { total } = calculateTotal({ items: bill.items, shipping: bill.shipping })

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      toast({ title: 'คัดลอกลิงก์แล้ว' })
    }
  }

  return (
    <div className="p-4 space-y-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold text-center">บิล {bill.id}</h1>
      <BillStatusTracker status={bill.productionStatus || 'waiting'} />
      <BillTimeline status={bill.productionStatus || 'waiting'} />
      {bill.productionTimeline?.length > 0 && (
        <p className="text-xs text-gray-500 text-center">
          อัปเดตล่าสุด:{' '}
          {formatDateThai(
            bill.productionTimeline[bill.productionTimeline.length - 1].timestamp
          )}
        </p>
      )}
      <ShippingInfoCard
        trackingNumber={bill.trackingNumber}
        carrier={bill.carrier}
        shippedAt={bill.shippedAt}
      />
      <div className="space-y-1">
        <p className="font-medium">{bill.customer}</p>
        {editAddr ? (
          <div className="space-y-2">
            <textarea
              className="border p-2 w-full"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
            <button
              className="border px-3 py-1"
              onClick={() => setEditAddr(false)}
            >
              บันทึก
            </button>
          </div>
        ) : (
          <p>{address}</p>
        )}
        <button
          className="text-sm underline text-blue-600"
          onClick={() => setEditAddr(v => !v)}
        >
          แก้ไขที่อยู่
        </button>
        {editPhone ? (
          <div className="space-y-2 mt-2">
            <input
              className="border p-2 w-full"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
            <button
              className="border px-3 py-1"
              onClick={() => setEditPhone(false)}
            >
              บันทึกเบอร์
            </button>
          </div>
        ) : (
          <p>โทร {phone}</p>
        )}
        <button
          className="text-sm underline text-blue-600"
          onClick={() => setEditPhone(v => !v)}
        >
          แก้ไขเบอร์ติดต่อ
        </button>
      </div>
      <ul className="divide-y">
        {bill.items.map((it: any, i: number) => (
          <li key={i} className="flex justify-between py-1 text-sm">
            <span>{it.name} × {it.quantity}</span>
            <span>฿{(it.price * it.quantity).toLocaleString()}</span>
          </li>
        ))}
        <li className="flex justify-between py-1 text-sm">
          <span>ค่าจัดส่ง</span>
          <span>฿{bill.shipping.toLocaleString()}</span>
        </li>
        <li className="flex justify-between font-bold py-1">
          <span>ยอดรวม</span>
          <span>฿{total.toLocaleString()}</span>
        </li>
      </ul>
      {bill.note && <p className="text-sm">หมายเหตุ: {bill.note}</p>}
      <BillQRSection total={total} />
      {store && (
        <div className="text-sm text-center space-y-1">
          <p className="font-semibold">{store.storeName}</p>
          <p>{store.phoneNumber}</p>
        </div>
      )}
      <ReceiptCard url={bill.receiptUrl} note={bill.receiptNote} />
      {bill.confirmation ? (
        <PaymentConfirmationCard confirmation={bill.confirmation} />
      ) : (
        bill.paymentStatus === 'unpaid' && (
          <CustomerPaymentForm billId={bill.id} autofillAmount={total} />
        )
      )}
      <button className="border px-3 py-1" onClick={handleShare}>คัดลอกลิงก์</button>
      <BillFooterActions billId={bill.id} />
    </div>
  )
}
