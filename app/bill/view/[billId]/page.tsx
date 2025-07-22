import BillClientInteraction from '@/components/BillClientInteraction'
import { getBillById } from '@/core/mock/fakeBillDB'

export default async function BillViewPage({ params }: { params: { billId: string } }) {
  const bill = await getBillById(params.billId)
  if (!bill) {
    return <div className="p-8">ไม่พบบิลนี้</div>
  }
  return <BillClientInteraction bill={bill} />
}
