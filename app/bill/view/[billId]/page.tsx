import { getBillById } from '@/core/fake/fakeBillStore'
import EditAddressForm from '@/components/public/bill/EditAddressForm'
import BillTimeline from '@/components/public/bill/BillTimeline'
import BillCommentBox from '@/components/public/bill/BillCommentBox'
import ContactAdminButton from '@/components/public/bill/ContactAdminButton'
import CopyLinkButton from '@/components/public/bill/CopyLinkButton'

export default async function BillViewPage({ params }: { params: { billId: string } }) {
  const bill = await getBillById(params.billId)
  if (!bill) {
    return <div className="p-8">ไม่พบบิลนี้</div>
  }
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-xl font-bold">บิล {bill.id}</h1>
      <EditAddressForm
        billId={bill.id}
        name={bill.customerName}
        phone={bill.customerPhone}
        address={bill.customerAddress}
      />
      <BillTimeline status={bill.status} />
      <BillCommentBox billId={bill.id} initialComments={bill.comments || []} />
      <div className="flex space-x-2">
        <CopyLinkButton />
        <ContactAdminButton billId={bill.id} />
      </div>
    </div>
  )
}
