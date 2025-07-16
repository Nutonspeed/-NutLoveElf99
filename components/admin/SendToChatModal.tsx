import { useEffect, useState } from 'react'
import { logEvent } from '@/lib/logs'
import { chatTemplates, loadChatTemplates } from '@/lib/mock-chat-templates'
import { EmojiPicker } from '@/components/EmojiPicker'

export function SendToChatModal({ orderId, onClose }: { orderId: string; onClose: () => void }) {
  const [message, setMessage] = useState(`📦 รายการคำสั่งซื้อ #${orderId}\nยอดรวม: 999 บาท`)
  const [customer, setCustomer] = useState("ลูกค้า A (Facebook)")
  useEffect(() => {
    loadChatTemplates()
  }, [])

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
          className="w-full h-32 border p-2 rounded"
        />
        <EmojiPicker onSelect={(e) => setMessage((m) => m + e)} />
        <div className="flex flex-wrap gap-2">
          {chatTemplates.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setMessage(t.text)}
              className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
            >
              {t.name}
            </button>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button className="text-gray-500" onClick={onClose}>ยกเลิก</button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => {
              logEvent('send_bill_chat', { orderId, customer })
              alert(`✅ ส่งข้อความไปยังแชทแล้ว:\n\n${message}`)
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
