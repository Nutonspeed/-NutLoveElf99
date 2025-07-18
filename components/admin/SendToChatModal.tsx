import { useState, useEffect } from "react"
import { logEvent } from "@/lib/logs"
import { faqItems, loadFaq, type FaqItem } from "@/lib/mock-faq"
import {
  loadChatLastSeen,
  getChatLastSeen,
  setChatLastSeen,
} from "@/lib/mock-read-status"

export function SendToChatModal({ orderId, onClose }: { orderId: string; onClose: () => void }) {
  const [message, setMessage] = useState(`📦 รายการคำสั่งซื้อ #${orderId}\nยอดรวม: 999 บาท`)
  const [customer, setCustomer] = useState("ลูกค้า A (Facebook)")
  const [faqs, setFaqs] = useState<FaqItem[]>([])
  const [highlight, setHighlight] = useState(false)
  const [lastSeen, setLastSeen] = useState<string | undefined>()

  useEffect(() => {
    loadFaq()
    setFaqs([...faqItems])
    loadChatLastSeen()
  }, [])

  useEffect(() => {
    setLastSeen(getChatLastSeen(customer))
  }, [customer])

  const insertReply = (text: string) => {
    setMessage((m) => (m ? m + "\n" + text : text))
    setHighlight(true)
    setTimeout(() => setHighlight(false), 300)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">ส่งบิลเข้าแชท</h2>
        <select
          className="w-full border p-2 rounded"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        >
          <option>ลูกค้า A (Facebook)</option>
          <option>ลูกค้า B (Inbox)</option>
          <option>ลูกค้า C (โทรศัพท์)</option>
        </select>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`w-full h-32 border p-2 rounded ${highlight ? 'border-blue-500' : ''}`}
        />
        <div className="flex flex-wrap gap-2">
          {faqs.map((f) => (
            <button
              key={f.id}
              onClick={() => insertReply(f.answer)}
              className="px-2 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200"
            >
              {f.question}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500">
          {lastSeen
            ? `ลูกค้าอ่านล่าสุดเมื่อ ${new Date(lastSeen).toLocaleString('th-TH')}`
            : 'ไม่พบข้อมูลล่าสุดของลูกค้า'}
        </p>
        <div className="flex justify-end gap-2">
          <button className="text-gray-500" onClick={onClose}>ยกเลิก</button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => {
              logEvent('send_bill_chat', { orderId, customer })
              alert(`✅ ส่งข้อความไปยังแชทแล้ว:\n\n${message}`)
              setChatLastSeen(customer)
              onClose()
            }}
          >
            ส่งบิล
          </button>
        </div>
      </div>
    </div>
  )
}
