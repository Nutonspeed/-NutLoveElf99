import { useState } from 'react'
import { logEvent } from '@/lib/logs'
import { markChatSent } from '@/lib/mock/chat'

export function SendQuoteModal({ quoteId, onClose }: { quoteId: string; onClose: () => void }) {
  const [message, setMessage] = useState(
    `📄 ใบเสนอราคา #${quoteId}\n${window.location.origin}/quote/mock-${quoteId}`,
  )
  const [customer, setCustomer] = useState('ลูกค้า A (Facebook)')
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">ส่งใบเสนอราคาเข้าแชท</h2>
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
        <div className="flex justify-end gap-2">
          <button className="text-gray-500" onClick={onClose}>ยกเลิก</button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => {
              logEvent('send_quote_chat', { quoteId, customer })
              markChatSent(quoteId)
              alert(`✅ ส่งข้อความไปยังแชทแล้ว:\n\n${message}`)
              onClose()
            }}
          >
            ส่งใบเสนอราคา
          </button>
        </div>
      </div>
    </div>
  )
}
