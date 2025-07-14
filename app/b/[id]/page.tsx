import { mockBills } from "@/lib/mock-bills"
export default function BillPage({ params }: { params: { id: string } }) {
  const bill = mockBills.find(b => b.id === params.id)
  if (!bill) return <div>ไม่พบบิลนี้</div>
  return (
    <div>
      <h1>บิล #{bill.id}</h1>
      <p>ยอดรวม: {bill.total} บาท</p>
      <p>สถานะ: {bill.status}</p>
      <a href={`/b/${bill.id}/payment`}>แจ้งโอน</a>
    </div>
  )
}
