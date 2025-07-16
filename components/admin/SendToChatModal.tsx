import { useRef, useState } from "react"
import { logEvent } from "@/lib/logs"
import { getLastCustomerName } from "@/lib/mock-customers"

export function SendToChatModal({ orderId, onClose }: { orderId: string; onClose: () => void }) {
  const base = `📦 รายการคำสั่งซื้อ #${orderId}\nยอดรวม: 999 บาท`
  const [message, setMessage] = useState(base)
  const [customer, setCustomer] = useState("ลูกค้า A (Facebook)")
  const [tone, setTone] = useState("สุภาพ")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function applyTone(t: string) {
    const prefix =
      t === "สุภาพ" ? "เรียนลูกค้า" : t === "เป็นกันเอง" ? "สวัสดีจ้า" : "ด่วน!"
    setMessage(`${prefix} ${base}`)
  }

  function prependLastCustomer() {
    const name = getLastCustomerName()
    if (name) setMessage((msg) => `${name} ${msg}`)
  }

  function insertEmoji(emoji: string) {
    if (!textareaRef.current) return
    const el = textareaRef.current
    const start = el.selectionStart
    const end = el.selectionEnd
    const newText = message.slice(0, start) + emoji + message.slice(end)
    setMessage(newText)
    requestAnimationFrame(() => {
      el.selectionStart = el.selectionEnd = start + emoji.length
      el.focus()
    })
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
        <select
          className="w-full border p-2 rounded"
          value={tone}
          onChange={(e) => {
            setTone(e.target.value)
            applyTone(e.target.value)
          }}
        >
          <option>สุภาพ</option>
          <option>เป็นกันเอง</option>
          <option>เร่งยอด</option>
        </select>
        <button
          className="text-sm underline text-left"
          onClick={prependLastCustomer}
        >
          ใส่ชื่ออัตโนมัติ
        </button>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          ref={textareaRef}
          className="w-full h-32 border p-2 rounded"
        />
        <div className="flex gap-2 md:hidden">
          {['❤️', '✅', '🙏', '🧵'].map((e) => (
            <button key={e} onClick={() => insertEmoji(e)} className="text-xl">
              {e}
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
