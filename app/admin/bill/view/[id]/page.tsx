import BillDetail from '@/components/bill/BillDetail'

export default function ViewPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-4">
      <BillDetail id={params.id} />
    </div>
  )
}
