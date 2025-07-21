import BillDetail from '@/components/bill/BillDetail'

export default function ViewPage({ params }: { params: { billId: string } }) {
  return (
    <div className="p-4">
      <BillDetail id={params.billId} />
    </div>
  )
}
