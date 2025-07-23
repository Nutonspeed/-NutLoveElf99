import BillClientInteraction from '@/components/BillClientInteraction'
import { CopyPageLinkButton } from '@/components/CopyPageLinkButton'
import { getBillById } from '@/core/mock/fakeBillDB'

export default async function BillViewPage({ params }: { params: { billId: string } }) {
  const bill = await getBillById(params.billId)
  if (!bill) {
    return <div className="p-8">ไม่พบบิลนี้</div>
  }
  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-end">
        <CopyPageLinkButton />
      </div>
      <BillClientInteraction bill={bill} />
    </div>
  )
}
