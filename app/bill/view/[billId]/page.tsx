"use client"

import { useEffect, useRef, useState } from 'react'
import BillClientInteraction from '@/components/BillClientInteraction'
import BillTimeline from '@/components/bill/BillTimeline'
import EditAddressForm from '@/components/bill/EditAddressForm'
import MarkAsPaidButton from '@/components/bill/MarkAsPaidButton'
import QRDisplay from '@/components/bill/QRDisplay'
import { formatDateThai } from '@/lib/formatDateThai'
import Link from 'next/link'
import { Button } from '@/components/ui/buttons/button'
import { useBillStore } from '@/app/store/useBillStore'
import { getCustomerById } from '@/core/mock/fakeCustomerDB'
import type { Customer } from '@/types/customer'


export default function BillViewPage({ params }: { params: { billId: string } }) {
  const { billId } = params
  const { bill, setBill, fetch, updateStatus, addCustomerNote } = useBillStore()
  const [customer, setCustomer] = useState<Customer | undefined>()
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState<{ message: string; createdAt: string; from: string }[]>([])
  const [message, setMessage] = useState('')
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!bill) {
      fetch(billId).then(() => {
        const b = useBillStore.getState().bill
        if (b) {
          setNotes(b.customerNotes || [])
          getCustomerById(b.customerId).then(c => setCustomer(c))
        }
        setLoading(false)
      })
    } else {
      setNotes(bill.customerNotes || [])
      getCustomerById(bill.customerId).then(c => setCustomer(c))
      setLoading(false)
    }
  }, [billId, bill, fetch])

  if (loading) {
    return <div className="p-8">Loading…</div>
  }

  if (!bill) {
    return (
      <div className="text-center p-8 space-y-4 text-destructive">
        <h2 className="text-xl font-semibold">ไม่พบบิลนี้</h2>
        <p>กรุณาตรวจสอบลิงก์ หรือติดต่อแอดมินเพื่อขอความช่วยเหลือ</p>
        <Link href="/" className="text-blue-500 underline">
          กลับหน้าแรก
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 print:p-6 print:w-[210mm] print:mx-auto">
      <div className="print:hidden">
        <Link href={`/bill/print/${bill.id}`} target="_blank" rel="noreferrer">
          <Button variant="outline" size="sm">Print</Button>
        </Link>
      </div>
      <BillClientInteraction bill={bill} />
      <EditAddressForm
        billId={bill.id}
        name={customer?.name || bill.customerName}
        phone={customer?.phone || bill.customerPhone}
        address={customer?.address || bill.customerAddress}
        delivered={bill.delivered}
        status={bill.status}
      />
      <BillTimeline status={bill.productionStatus} />
      <QRDisplay total={bill.total} qrImage={bill.qrImage} />
      <MarkAsPaidButton billId={bill.id} status={bill.status} onPaid={() => updateStatus('paid')} />
      <div className="space-y-2">
        <h2 className="font-semibold">ฝากข้อความถึงแอดมิน</h2>
        <ul ref={listRef} className="space-y-1 text-sm max-h-60 overflow-auto">
          {notes.filter(n => n.from === 'customer').map((n, i) => (
            <li key={i} className="border p-2 rounded">
              {n.message}{' '}
              <span className="text-xs text-gray-500">
                {new Date(n.createdAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-2">
          <textarea
            className="border p-2 w-full"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <button
            className="border px-3 py-1 mt-2"
            type="button"
            onClick={() => {
              const msg = message.trim()
              if (!msg) return
              if (notes.some(n => n.message === msg)) return
              const note = { message: msg, createdAt: new Date().toISOString(), from: 'customer' }
              setNotes([...notes, note])
              addCustomerNote(note)
              setMessage('')
              requestAnimationFrame(() => {
                listRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' })
              })
            }}
          >
            ส่งข้อความ
          </button>
        </div>
      </div>
      {bill.note && <p className="text-sm">Note: {bill.note}</p>}
      {(bill.trackingNo || bill.deliveryDate) && (
        <div className="text-sm space-y-1">
          {bill.carrier && (
            <p>
              📦 ขนส่ง: {bill.carrier}
              {bill.trackingNo && (
                <>
                  {' '}
                  <a
                    href={
                      bill.carrier === 'Kerry'
                        ? `https://th.kerryexpress.com/th/track/?track=${bill.trackingNo}`
                        : undefined
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="ml-2 underline"
                  >
                    เช็คสถานะพัสดุ
                  </a>
                </>
              )}
            </p>
          )}
          {bill.trackingNo && <p>🔢 เลขพัสดุ: {bill.trackingNo}</p>}
          {bill.deliveryDate && <p>Delivered: {formatDateThai(bill.deliveryDate)}</p>}
          {bill.deliveredAt && <p>🗓 จัดส่งเมื่อ: {formatDateThai(bill.deliveredAt)}</p>}
        </div>
      )}
      {bill.productionStatus && bill.productionStatus !== 'done' && (
        <p className="text-sm">
          {bill.productionStatus === 'waiting' && '⌛ รอคิวผลิต'}
          {bill.productionStatus === 'cutting' && '🧵 กำลังตัดผ้า'}
          {bill.productionStatus === 'sewing' && '🪡 กำลังเย็บ'}
          {bill.productionStatus === 'packing' && '📦 กำลังแพ็ค'}
          {bill.productionStatus === 'shipped' && '🚚 จัดส่งแล้ว'}
        </p>
      )}
    </div>
  )
}
