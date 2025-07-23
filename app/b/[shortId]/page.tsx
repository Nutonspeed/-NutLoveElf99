import BillViewPage from '@/app/bill/view/[billId]/page'
import { getBillIdByShortCode } from '@/core/mock/fakeBillDB'

export default async function ShortBillPage({ params }: { params: { shortId: string } }) {
  const id = await getBillIdByShortCode(params.shortId)
  if (!id) {
    return <div className="p-8">ไม่พบบิลนี้</div>
  }
  return <BillViewPage params={{ billId: id }} />
}
