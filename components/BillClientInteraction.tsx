'use client'

import { useState } from 'react'
import Image from 'next/image'
import BillStatusStepper from '@/components/BillStatusStepper'
import QRCodePlaceholder from '@/components/bills/QRCodePlaceholder'
import PromptPayQR from '@/components/bill/PromptPayQR'
import type { FakeBill } from '@/core/mock/fakeBillDB'


export default function BillClientInteraction({ bill }: { bill: FakeBill }) {
  const [address, setAddress] = useState(bill.customerAddress)
  const [question, setQuestion] = useState('')

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/bill/${bill.id}/update-address`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      })

      if (res.ok) {
        alert('บันทึกที่อยู่แล้ว')
      } else {
        const err = await res.text()
        console.error('Failed to save address:', err)
        alert('เกิดข้อผิดพลาดในการบันทึกที่อยู่')
      }
    } catch (e) {
      console.error('Network error:', e)
      alert('เกิดข้อผิดพลาดในการบันทึกที่อยู่')
    }
  }

  const handleQuestion = () => {
    alert('ส่งคำถาม: ' + question)
    setQuestion('')
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <section className="space-y-2">
        <h1 className="text-xl font-bold">บิล {bill.id}</h1>
        <p className="font-medium">{bill.customerName}</p>
        <input
          className="border p-2 w-full"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        <button className="border px-3 py-1 text-sm mt-1" onClick={handleSave}>
          บันทึกที่อยู่
        </button>
        <p>
          <a href={`tel:${bill.customerPhone}`} className="text-primary underline">
            {bill.customerPhone}
          </a>
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="font-semibold">รายการสินค้า</h2>
        <ul className="space-y-2">
          {bill.items.map((it, i) => (
            <li
              key={i}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm"
            >
              {it.image && (
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src={it.image}
                    alt={it.fabricName}
                    fill
                    sizes="48px"
                    className="object-cover rounded"
                  />
                </div>
              )}
              <span className="flex-1">
                {it.fabricName} {it.sofaType} × {it.quantity}
              </span>
              <span className="sm:ml-2 whitespace-nowrap">
                ฿{(it.unitPrice * it.quantity).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section className="space-y-2">
        <h2 className="font-semibold">สถานะการผลิต</h2>
        <BillStatusStepper status={bill.status} />
      </section>
      <section className="space-y-2">
        <h2 className="font-semibold">สอบถามเพิ่มเติม</h2>
        <a
          href="https://line.me/ti/p/~sofacover"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          คุยทาง LINE
        </a>
        <div className="flex space-x-2">
          <input
            className="flex-1 border p-2 text-sm"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="คำถามของคุณ"
          />
          <button className="border px-3 py-1" onClick={handleQuestion}>
            ส่งคำถาม
          </button>
        </div>
      </section>
      <section className="space-y-2">
        <h2 className="font-semibold">ชำระเงิน</h2>
        <p>ยอดประมาณการ: ฿{bill.estimatedTotal.toLocaleString()}</p>
        {bill.status !== 'paid' ? (
          <PromptPayQR amount={bill.estimatedTotal} />
        ) : (
          <QRCodePlaceholder />
        )}
        {bill.note && <p className="text-sm text-gray-600">{bill.note}</p>}
      </section>
    </div>
  )
}
