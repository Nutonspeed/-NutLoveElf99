import QRCode from "react-qr-code"
import { mockOrders } from "@/lib/mock-orders"

export default function BillPage({ params }: { params: { id: string } }) {
  const order = mockOrders.find(o => o.id === params.id)
  if (!order) return <div className="p-4 text-red-500">ไม่พบคำสั่งซื้อ</div>

  const billUrl = `https://elfcover.vercel.app/b/${order.id}`

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">บิลคำสั่งซื้อ #{order.id}</h1>
      <p>ยอดรวม: <strong>{order.total} บาท</strong></p>
      <QRCode value={billUrl} />
      <p className="text-sm text-gray-400">ลูกค้าสามารถสแกน QR หรือกดลิงก์ด้านล่าง</p>
      <a href={billUrl} className="underline text-blue-600">{billUrl}</a>
    </div>
  )
}
