import QRCodePlaceholder from '@/components/bills/QRCodePlaceholder'
import BillProgress from '@/components/BillProgress'
import { getBillById, type FakeBill, updateBillAddress } from '@/core/mock/fakeBillDB'
import { useState } from 'react'

const steps = ['กำลังตัดผ้า', 'รอเย็บ', 'กำลังแพ็ค', 'จัดส่งแล้ว']

export default async function BillViewPage({ params }: { params: { billId: string } }) {
  const bill = await getBillById(params.billId)
  if (!bill) {
    return <div className="p-8">ไม่พบบิลนี้</div>
  }
  return <BillClient bill={bill} />
}

function BillClient({ bill }: { bill: FakeBill }) {
  'use client'
  const [address, setAddress] = useState(bill.customerAddress)
  const [question, setQuestion] = useState('')
  const handleSave = async () => {
    await updateBillAddress(bill.id, address)
    alert('บันทึกที่อยู่แล้ว')
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
        <ul className="space-y-1">
          {bill.items.map((it, i) => (
            <li key={i} className="flex justify-between text-sm">
              <span>
                {it.fabricName} {it.sofaType} × {it.quantity}
              </span>
              <span>฿{(it.unitPrice * it.quantity).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="space-y-2">
        <h2 className="font-semibold">สถานะการผลิต</h2>
        <BillProgress steps={steps} current={bill.statusStep} updatedAt={bill.lastUpdated} />
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
        <QRCodePlaceholder />
        {bill.note && <p className="text-sm text-gray-600">{bill.note}</p>}
      </section>
    </div>
  )
}
