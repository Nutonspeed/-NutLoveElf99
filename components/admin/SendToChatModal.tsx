import { useState } from "react"
import { logEvent } from "@/lib/logs"
import { quoteBlock } from "@/lib/mock-chat"
import { addChatAttachment } from "@/lib/mock-attachments"

export function SendToChatModal({ orderId, onClose }: { orderId: string; onClose: () => void }) {
  const [message, setMessage] = useState(`📦 รายการคำสั่งซื้อ #${orderId}\nยอดรวม: 999 บาท`)
  const [customer, setCustomer] = useState("ลูกค้า A (Facebook)")
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFile = (f: File) => {
    if (f.size > 2 * 1024 * 1024) {
      alert('ไฟล์ใหญ่เกินไป (2MB)')
      return
    }
    setFile(f)
    setPreview(URL.createObjectURL(f))
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
          className="w-full h-32 border p-2 rounded"
        />
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && handleFile(e.target.files[0])}
          />
          <Button variant="outline" onClick={() => setMessage((m) => m + '\n' + quoteBlock)}>
            แนบใบเสนอราคา
          </Button>
        </div>
        {preview && (
          <img src={preview} alt="preview" className="w-32 h-32 object-cover" />
        )}
        <div className="flex justify-end gap-2">
          <button className="text-gray-500" onClick={onClose}>ยกเลิก</button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={async () => {
              if (file) await addChatAttachment(file)
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
